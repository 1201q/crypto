import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useMemo, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import {
  ServerSideProps,
  CoinListResponseType,
  ServerSideInitialValues,
} from "@/types/types";
import { useAtom, atom } from "jotai";
import {
  allTickerDataAtom,
  coinListAtom,
  orderbookDataAtom,
  selectCodeAtom,
  selectTickerDataAtom,
  tradeDataAtom,
} from "@/context/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";
import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";
import { useHydrateAtoms } from "jotai/utils";

export default function Home({ coinList, queryCode }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);
  const tradeWsRef = useRef<WebSocket | null>(null);
  const orderbookWsRef = useRef<WebSocket | null>(null);

  useHydrateAtoms([[coinListAtom, coinList?.data]] as ServerSideInitialValues);

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
    if (queryCode) {
      setSelectCode(queryCode);
    }
  }, []);

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
    }
  }, [selectCode]);

  return <PageRender Render={ExchangePage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const queryCode = ctx.query.code;
  const coinList = await getMarketList("KRW");

  return {
    props: { coinList, queryCode },
  };
};
