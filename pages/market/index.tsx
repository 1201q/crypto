import nookies from "nookies";

import { useEffect } from "react";
import getServersideAuth from "@/utils/common/getServersideAuth";

import { useHydrateAtoms } from "jotai/utils";
import {
  allTickerDataAtom,
  isTickerWebsocketOpenAtom,
  pathnameAtom,
} from "@/context/atoms";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";
import { useTicker } from "@/utils/websocket/websocketHooks";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);
  const { coinList } = useList();

  const { open: openTickerWs, isWsOpen: isTickerWsOpen } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  useEffect(() => {
    if (!isTickerWsOpen) {
      openTickerWs();
    }
  }, []);

  return <PageRender Render={MarketPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getServersideAuth(cookies.token);

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
