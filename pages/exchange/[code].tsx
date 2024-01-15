import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import getMarketList from "@/utils/common/getMarketList";
import {
  ServerSideProps,
  CoinListResponseType,
  MarketListDataType,
} from "@/utils/types/types";
import { useAtom, atom } from "jotai";
import {
  allTickerDataAtom,
  coinListAtom,
  orderbookDataAtom,
  selectCodeAtom,
  selectTickerDataAtom,
  tradeDataAtom,
} from "@/utils/atoms/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";
import CoinList from "@/components/coinlist/CoinList";

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

  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [, setCoinListData] = useAtom(coinListAtom);
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
    setSelectCode(queryCode);
    setCoinListData(coinList.data);
    openTickerWebsocket();

    return () => {
      closeTickerWebsocket();
    };
  }, []);

  useEffect(() => {
    setSelectCode(queryCode);
    openTradeWebsocket();
    openOrderbookWebsocket();

    return () => {
      closeTradeWebsocket();
      closeOrderbookWebsocket();
    };
  }, [queryCode]);

  return (
    <Container>
      <Padding>
        <Side>
          <MyInfo>1</MyInfo>
          <Div>
            <CoinList count={coinList.code.length} />
          </Div>
        </Side>
        <Main>{selectTickerData[0]?.trade_price}</Main>
      </Padding>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 1400px;
  max-width: 100vw;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Padding = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
  }

  @media screen and (max-width: 979px) {
    padding: 0;
  }
`;

const Main = styled.div`
  width: calc(100% - 350px);
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 10px;
  background-color: white;

  @media screen and (max-width: 1200px) {
    /* width: 100%; */
  }

  @media screen and (max-width: 979px) {
    /* background-color: lightcoral; */
  }

  @media screen and (max-width: 768px) {
    /* background-color: lightpink; */
  }
`;

const Side = styled.div`
  width: 330px;
  height: 100vh;

  @media screen and (max-width: 1200px) {
    /* display: none;
    width: 0px; */
  }
`;

const Div = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MyInfo = styled(Div)`
  height: 120px;
`;
