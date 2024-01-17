import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, CoinListResponseType } from "@/utils/types/types";
import { useAtom } from "jotai";
import { allTickerDataAtom, coinListAtom } from "@/utils/atoms/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";

import MarketListPage from "@/components/page/MarketListPage";
import PageRender from "@/components/page/PageRender";

export default function Home({ coinList }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);
  const [, setCoinListData] = useAtom(coinListAtom);

  const {
    data: allTickerData,
    open: openTickerWebsocket,
    close: closeTickerWebsocket,
  } = useUpbit("ticker", coinList.code, tickerWsRef, allTickerDataAtom);

  useEffect(() => {
    setCoinListData(coinList.data);
    openTickerWebsocket();

    return () => {
      closeTickerWebsocket();
    };
  }, []);

  return <PageRender Render={MarketListPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: Redirect }> => {
  const cookies = nookies.get(ctx);
  let isLogin = false;
  let uid = null;
  let coinList: CoinListResponseType = { code: [], data: [] };

  try {
    const token = await admin.auth().verifyIdToken(cookies.token);

    try {
      coinList = await getMarketList("KRW");
    } catch (error) {
      console.error("Error in getMarketList fetch:", error);
    }

    if (token) {
      uid = token.uid;
      isLogin = true;
    }

    return {
      props: { isLogin, uid, coinList },
    } as {
      props: ServerSideProps;
      redirect: Redirect;
    };
  } catch (error) {
    return {
      props: { isLogin, uid, coinList },
    } as {
      props: ServerSideProps;
      redirect: Redirect;
    };
  }
};
