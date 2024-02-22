import nookies from "nookies";
import { useEffect } from "react";
import getAuth from "@/utils/common/getAuth";
import { useHydrateAtoms } from "jotai/utils";
import { isTickerWebsocketOpenAtom, pathnameAtom } from "@/context/atoms";
import { allTickerDataAtom } from "@/context/fetch";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";
import { fetcher } from "@/utils/common/fetch";
import { useList } from "@/utils/hooks/useList";
import { useTicker } from "@/utils/websocket/websocketHooks";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  const { coinList } = useList();
  const { ticker } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  useEffect(() => {
    if (!ticker.isOpen) {
      ticker.open();
    }
  }, []);

  return <PageRender Render={MarketPage} title={"ALL UP! | 마켓"} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getAuth(cookies.token);

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      pathname,
    },
  };
};
