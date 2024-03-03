import nookies from "nookies";
import { useEffect } from "react";
import getAuth from "@/utils/common/getAuth";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";

import MarketPage from "@/components/market/index";
import PageRender from "@/components/shared/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";
import { fetcher } from "@/utils/common/fetch";
import { useList } from "@/utils/hooks/useList";

import { useUpbitAll, useUpbitSingle } from "@/utils/ws/control";
import { isLoginAtom } from "@/context/user";

export default function Home({ pathname, isLogin }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });
  useHydrateAtoms([[isLoginAtom, isLogin]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });

  const { coinList } = useList();
  const { all } = useUpbitAll(coinList.code);
  const { single } = useUpbitSingle("");

  useEffect(() => {
    all.open();
    single.close();
    console.log(isLogin);
  }, []);

  return (
    <>
      <PageRender Render={MarketPage} title={"ALL UP! | 마켓"} />
    </>
  );
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
