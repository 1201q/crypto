import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, CoinListResponseType } from "@/utils/types/types";
import { useAtom } from "jotai";
import { allTickerDataAtom, coinListAtom } from "@/utils/atoms/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";
import CoinList from "@/components/coinlist/CoinList";
import Header from "@/components/header/Header";
import RankingHeader from "@/components/header/RankingHeader";
import ListController from "@/components/coinlist/ListController";

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

  return (
    <Container>
      <Mobile>
        <Header />

        <ListController />
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
