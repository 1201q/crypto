import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useMemo, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, CoinListResponseType } from "@/types/types";
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
import CoinList from "@/components/coinlist/CoinList";
import Header from "@/components/coinlist/MarketHeader";
import getServersideAuth from "@/utils/common/getServersideAuth";

export default function Home({ coinList, queryCode }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);
  const tradeWsRef = useRef<WebSocket | null>(null);
  const orderbookWsRef = useRef<WebSocket | null>(null);

  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [, setCoinListData] = useAtom(coinListAtom);
  const [selectTickerData] = useAtom(selectTickerDataAtom(selectCode));

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
    if (coinList) {
      setCoinListData(coinList?.data);
    }

    openTickerWebsocket();

    return () => {
      closeTickerWebsocket();
    };
  }, []);

  useEffect(() => {
    if (queryCode) {
      setSelectCode(queryCode);
    }

    openTradeWebsocket();
    openOrderbookWebsocket();

    return () => {
      closeTradeWebsocket();
      closeOrderbookWebsocket();
    };
  }, [queryCode]);

  return (
    <Container>
      <Mobile>
        <Header />
        <CoinList />
      </Mobile>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #f2f4f6;
  display: flex;
  justify-content: center;
`;

const Mobile = styled.div`
  width: 840px;
  height: 100%;
  border-right: 1px solid #d1d6db;
  border-left: 1px solid #d1d6db;
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const queryCode = ctx.query.code;

  const coinList = await getMarketList("KRW");

  return {
    props: { coinList, queryCode },
  };
};
