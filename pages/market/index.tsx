import nookies from "nookies";
import { useEffect } from "react";
import getUser from "@/utils/common/getUser";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";

import MarketPage from "@/components/market/index";
import PageRender from "@/components/shared/PageRender";

import {
  ServerSideProps,
  ServerSideInitialValues,
  RedirectProps,
} from "@/types/types";
import { GetServerSideProps } from "next";
import { fetcher } from "@/utils/common/fetch";
import { useList } from "@/utils/hooks/useList";

import { useUpbitAll, useUpbitSingle } from "@/utils/ws/control";
import { isLoginAtom } from "@/context/user";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export default function Home({ pathname, isLogin }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });
  useHydrateAtoms([[isLoginAtom, isLogin]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });
  const router = useRouter();

  const { coinList } = useList();
  const { all } = useUpbitAll(coinList.code);
  const { single } = useUpbitSingle("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoginAtom);
  const [, setPathName] = useAtom(pathnameAtom);

  useEffect(() => {
    all.open();
    single.close();

    isLogin !== undefined && setIsLoggedIn(isLogin);
    isLogin !== undefined && reload(isLogin);
    pathname !== undefined && setPathName(pathname);

    return () => {
      isLogin !== undefined && reload(isLogin);
    };
  }, []);

  const reload = (isLogin: boolean) => {
    getAuth().onAuthStateChanged((user) => {
      if ((!isLogin && user) || (isLogin && !user)) {
        router.reload();
        console.log(user);
      }
    });
  };

  return (
    <>
      {isLoggedIn === isLogin && (
        <PageRender Render={MarketPage} title={"ALL UP! | 마켓"} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;
  const coinList = await fetcher("/api/markets");

  const { isLogin } = await getUser(cookies.token);

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      pathname,
    },
  };
};
