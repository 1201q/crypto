import { GetServerSideProps } from "next";
import {
  ServerSideProps,
  ServerSideInitialValues,
  WalletTradeDataType,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import WalletPage from "@/components/wallet/index";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { fetcher } from "@/utils/common/fetch";
import { observeDataChanges } from "@/utils/common/db";
import { useAuth } from "@/utils/firebase/provider";

import { Unsubscribe } from "firebase/firestore";
import { walletTradeDataAtom } from "@/context/wallet";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });
  const user = useAuth();
  const [, setPathName] = useAtom(pathnameAtom);
  const [, setTradeData] = useAtom(walletTradeDataAtom);

  useEffect(() => {
    pathname !== undefined && setPathName(pathname);
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    if (user) {
      const unsubscribePromise = observeDataChanges<WalletTradeDataType>(
        "trade",
        user.uid,
        (data) => {
          if (data) {
            setTradeData(data);
          }
        }
      );

      unsubscribePromise.then((fn) => {
        unsubscribe = fn;
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return <>{user && <PageRender Render={WalletPage} bgColor={"#f2f4f6"} />}</>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;
  let currentTab = ctx?.query.tab;

  const coinList = await fetcher("/api/markets");

  return {
    props: {
      pathname,
      currentTab,
      fallback: { "/api/markets": coinList },
    },
  };
};
