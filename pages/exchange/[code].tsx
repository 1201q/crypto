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
} from "@/utils/types/types";
import createWebsocket from "@/utils/common/createWebsocket";
import { allTickerDataAtom } from "@/utils/atoms/atoms";
import { useAtom, atom } from "jotai";
import { SetStateAction } from "jotai/vanilla";

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

  const tickerWebsocketRef = useRef<WebSocket | null>(null);
  const tradeWebsocketRef = useRef<WebSocket | null>(null);
  const orderbookWebsocketRef = useRef<WebSocket | null>(null);

  const selectCodeAtom = useMemo(() => atom(queryCode), []);
  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [allTickerData, setAllTickerData] = useAtom(allTickerDataAtom);

  useEffect(() => {
    openWebsocket(
      "ticker",
      coinList.code,
      tickerWebsocketRef,
      setAllTickerData
    );

    return () => {
      if (tickerWebsocketRef.current) {
        tickerWebsocketRef.current.close();

        setAllTickerData([]);
        console.log("닫아");
      }
    };
  }, []);

  const openWebsocket = async (
    type: WebsocketType,
    code: string[],
    websocketRef: MutableRefObject<WebSocket | null>,
    setState: SetAtom<[SetStateAction<TickerDataType[]>], void>
  ) => {
    const ws = await createWebsocket(type, code);

    if (ws) {
      websocketRef.current = ws;
      handleTickerDataUpdate(websocketRef.current, setState);
    }
  };

  const handleTickerDataUpdate = (
    ws: WebSocket,
    setState: SetAtom<[SetStateAction<TickerDataType[]>], void>
  ) => {
    ws.onmessage = async (event: any) => {
      const { data } = event;
      const blobToJson = await new Response(data).json();

      if (blobToJson.stream_type === "SNAPSHOT") {
        setState((prev) => [...prev, blobToJson]);
      } else {
        setState((prev) => {
          const updatedArr = prev.map((coin) => {
            if (coin.code === blobToJson.code) {
              return { ...blobToJson };
            }
            return coin;
          });
          return updatedArr;
        });
      }
    };
  };

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
          if (websocketRef.current) {
            websocketRef.current.close();
          }
        }}
      >
        웹소켓종료
      </button>
      {allTickerData.map((coin) => (
        <div
          style={{ display: "flex" }}
          onClick={() => {
            console.log(coin);
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
