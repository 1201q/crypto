import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useAtom } from "jotai";
import {
  allTickerDataAtom,
  orderbookDataAtom,
  selectCodeAtom,
  tradeDataAtom,
} from "@/context/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";
import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";
import { useHydrateAtoms } from "jotai/utils";
import useSWR from "swr";
import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";

export default function Home({ queryCode }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);
  const tradeWsRef = useRef<WebSocket | null>(null);
  const orderbookWsRef = useRef<WebSocket | null>(null);

  const { data: coinList } = useSWR("/api/markets");

  useHydrateAtoms([[selectCodeAtom, queryCode]] as ServerSideInitialValues);

  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);

  const {
    data: allTickerData,
    open: openTickerWebsocket,
    close: closeTickerWebsocket,
  } = useUpbit(
    "ticker",
    coinList ? coinList.code : [],
    tickerWsRef,
    allTickerDataAtom
  );
  const {
    data: tradeData,
    open: openTradeWebsocket,
    close: closeTradeWebsocket,
  } = useUpbit("trade", selectCode, tradeWsRef, tradeDataAtom);
  const {
    data: orderbookData,
    open: openOrderbookWebsocket,
    close: closeOrderbookWebsocket,
  } = useUpbit("orderbook", selectCode, orderbookWsRef, orderbookDataAtom);

  useEffect(() => {
    if (queryCode === selectCode) {
      openTickerWebsocket();
      openTradeWebsocket();
      openOrderbookWebsocket();

      return () => {
        closeTickerWebsocket();
        closeTradeWebsocket();
        closeOrderbookWebsocket();
      };
    } else if (queryCode && queryCode !== selectCode) {
      setSelectCode(queryCode);
    }
  }, [selectCode, queryCode]);

  return <PageRender Render={ExchangePage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const queryCode = ctx.query.code;
  const cookies = nookies.get(ctx);
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getServersideAuth(cookies.token);

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      queryCode: queryCode,
    },
  };
};
