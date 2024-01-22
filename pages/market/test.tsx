import nookies from "nookies";

import { useEffect, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import getServersideAuth from "@/utils/common/getServersideAuth";
import { useUpbit } from "@/utils/websocket/useUpbit";

import { useHydrateAtoms } from "jotai/utils";
import { allTickerDataAtom, coinListAtom, pathnameAtom } from "@/context/atoms";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";

export default function Home({ coinList, pathname }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);

  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);
  useHydrateAtoms([[coinListAtom, coinList?.data]] as ServerSideInitialValues);

  const { open: openTickerWebsocket, close: closeTickerWebsocket } = useUpbit(
    "ticker",
    coinList ? coinList.code : [],
    tickerWsRef,
    allTickerDataAtom
  );

  useEffect(() => {
    if (coinList) {
      openTickerWebsocket();

      return () => {
        closeTickerWebsocket();
      };
    }
  }, []);

  return <PageRender Render={MarketPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;

  const coinList = await getMarketList("KRW");
  const { isLogin, uid } = await getServersideAuth(cookies.token);

  return {
    props: { coinList, isLogin, uid, pathname },
  };
};
