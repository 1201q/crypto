import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import getMarketList from "@/utils/common/getMarketList";
import {
  TickerDataType,
  ServerSideProps,
  CoinListResponseType,
  WebsocketType,
  SetAtom,
  OrderBookDataType,
  TradeDataType,
} from "@/utils/types/types";
import createWebsocket from "@/utils/websocket/createWebsocket";
import { useAtom, atom } from "jotai";
import { SetStateAction } from "jotai/vanilla";

import {
  allTickerDataAtom,
  orderbookDataAtom,
  selectTickerDataAtom,
  tradeDataAtom,
} from "@/utils/atoms/atoms";
import {
  closeWebsocket,
  openWebsocket,
} from "@/utils/websocket/websocketUtils";

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: Redirect }> => {
  const cookies = nookies.get(ctx);
  let isLogin = false;
  let uid = null;
  let coinList: CoinListResponseType = { code: [], data: [] };
  let queryCode = ctx.query.code;
  let isCodeCorrect = false;

  try {
    const token = await admin.auth().verifyIdToken(cookies.token);

    try {
      coinList = await getMarketList("KRW");
      isCodeCorrect = coinList.code.includes(queryCode) ? true : false;
    } catch (error) {
      console.error("Error in getMarketList fetch:", error);
    }

    if (token) {
      uid = token.uid;
      isLogin = true;
    }

    if (isCodeCorrect) {
      return {
        props: { isLogin, uid, coinList, queryCode },
      } as {
        props: ServerSideProps;
        redirect: Redirect;
      };
    } else {
      queryCode = "KRW-BTC";
      return {
        props: { isLogin, uid, coinList, queryCode },
        redirect: { destination: `/exchange/${queryCode}` },
      } as {
        props: ServerSideProps;
        redirect: Redirect;
      };
    }
  } catch (error) {
    console.log(error);
    return { redirect: { destination: "/auth/login" } } as {
      redirect: Redirect;
    };
  }
};

export default function Home({ uid, coinList, queryCode }: ServerSideProps) {
  const router = useRouter();

  const tickerWsRef = useRef<WebSocket | null>(null);
  const tradeWsRef = useRef<WebSocket | null>(null);
  const orderbookWsRef = useRef<WebSocket | null>(null);

  const selectCodeAtom = useMemo(() => atom(queryCode), []);
  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);

  const [allTickerData, setAllTickerData] = useAtom(allTickerDataAtom);
  const [selectTickerData] = useAtom(selectTickerDataAtom(selectCode));
  const [tradeData, setTradeData] = useAtom(tradeDataAtom);
  const [orderbookData, setOrderbookData] = useAtom(orderbookDataAtom);

  useEffect(() => {
    openWebsocket("ticker", coinList.code, tickerWsRef, setAllTickerData);

    return () => {
      closeWebsocket(tickerWsRef, setAllTickerData);
    };
  }, []);

  useEffect(() => {
    openWebsocket("trade", selectCode, tradeWsRef, setTradeData);
    openWebsocket("orderbook", selectCode, orderbookWsRef, setOrderbookData);

    return () => {
      closeWebsocket(tradeWsRef, setTradeData);
      closeWebsocket(orderbookWsRef, setOrderbookData);
    };
  }, [selectCode]);

  return (
    <Container>
      {uid}
      <button
        onClick={() => {
          signOut(authService);
          router.reload();
        }}
      >
        로그아웃
      </button>
      {queryCode}
      <button
        onClick={() => {
          if (tickerWsRef.current) {
            tickerWsRef.current.close();
          }
        }}
      >
        웹소켓종료
      </button>
      <div>
        {selectTickerData.map((c) => (
          <>
            <div>{c.code}</div>
            <div>{c.trade_price}</div>
          </>
        ))}
      </div>
      {allTickerData.map((coin) => (
        <div
          style={{ display: "flex" }}
          onClick={() => {
            console.log(coin);
            setSelectCode(coin.code);
            router.push(`/exchange/${coin.code}`);
          }}
          key={coin.code}
        >
          <div>{coin.code} / </div>
          <div>{coin.trade_price}</div>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
  background-color: white;
`;
