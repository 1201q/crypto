import nookies from "nookies";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { allTickerDataAtom, coinListAtom } from "@/context/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";
import { pathnameAtom } from "@/context/atoms";
import getServersideAuth from "@/utils/common/getServersideAuth";

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
