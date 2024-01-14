import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, CoinListResponseType } from "@/utils/types/types";
import { useAtom, atom } from "jotai";
import {
  allTickerDataAtom,
  orderbookDataAtom,
  selectTickerDataAtom,
  tradeDataAtom,
} from "@/utils/atoms/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";
import List from "@/components/list/List";

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
  const [selectTickerData] = useAtom(selectTickerDataAtom(selectCode));

  const {
    data: allTickerData,
    open: openTickerWebsocket,
    close: closeTickerWebsocket,
  } = useUpbit("ticker", coinList.code, tickerWsRef, allTickerDataAtom);
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
    openTickerWebsocket();

    return () => {
      closeTickerWebsocket();
    };
  }, []);

  useEffect(() => {
    openTradeWebsocket();
    openOrderbookWebsocket();

    return () => {
      closeTradeWebsocket();
      closeOrderbookWebsocket();
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
          <div key={"@"}>{c.trade_price}</div>
        ))}
      </div>
      <List selectCode={selectCode} setSelectCode={setSelectCode} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
  background-color: white;
`;
