import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import {
  ServerSideProps,
  CoinListResponseType,
  ServerSideInitialValues,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { allTickerDataAtom, coinListAtom } from "@/context/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";
import { pathnameAtom } from "@/context/atoms";
import getServersideAuth from "@/utils/common/getServersideAuth";

export default function Home({ uid, coinList, pathname }: ServerSideProps) {
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
  let isLogin = false;
  let uid = null;
  let coinList: CoinListResponseType = { code: [], data: [] };
  let pathname = ctx.resolvedUrl;

  try {
    coinList = await getMarketList("KRW");
  } catch (error) {
    console.error("Error in getMarketList fetch:", error);
  }

  try {
    const { myuid } = await getServersideAuth(cookies.token);
    if (myuid) {
      uid = myuid;
      isLogin = true;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: { isLogin, uid, coinList, pathname },
  };
};
