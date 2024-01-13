import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { MarketListDataType, TickerDataType } from "@/utils/types/types";
import createWebsocket from "@/utils/common/createWebsocket";

interface ServerSideProps {
  isLogin?: boolean;
  uid?: string | null;
  coinList: CoinListResponseType;
}

interface CoinListResponseType {
  code: string[];
  data: MarketListDataType[];
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

    return { props: { isLogin, uid, coinList } };
  } catch (error) {
    console.log(error);
    return { redirect: { destination: "/auth/login" } } as {
      redirect: Redirect;
    };
  }
};

export default function Home({ uid, coinList }: ServerSideProps) {
  const router = useRouter();
  const websocketRef = useRef<WebSocket | null>(null);
  const [render, setRender] = useState<TickerDataType[]>([]);

  useEffect(() => {
    websocket();
  }, []);

  const websocket = async () => {
    const ws = await createWebsocket("ticker", coinList.code);

    if (ws) {
      websocketRef.current = ws;
      getTickerPriceData(websocketRef.current);
    }
  };

  const getTickerPriceData = (ws: WebSocket) => {
    ws.onmessage = async (event: any) => {
      const { data } = event;
      const blobToJson = await new Response(data).json();

      if (blobToJson.stream_type === "SNAPSHOT") {
        setRender((prev) => [...prev, blobToJson]);
      } else {
        setRender((prev) => {
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

      <button
        onClick={() => {
          if (websocketRef.current) {
            websocketRef.current.close();
          }
        }}
      >
        웹소켓종료
      </button>
      {render.map((coin) => (
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
