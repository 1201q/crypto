import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useAtom } from "jotai";
import {
  allTickerDataAtom,
  isTickerWebsocketOpenAtom,
  isOrderbookWebsocketOpenAtom,
  isTradeWebsocketOpenAtom,
  orderbookDataAtom,
  selectCodeAtom,
  tradeDataAtom,
} from "@/context/atoms";
import { useUpbit } from "@/utils/websocket/useUpbit";

import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";
import { useHydrateAtoms } from "jotai/utils";

import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";

export default function Home({ queryCode }: ServerSideProps) {
  const { coinList } = useList();

  useHydrateAtoms([[selectCodeAtom, queryCode]] as ServerSideInitialValues);

  const [, setSelectCode] = useAtom(selectCodeAtom);

  const {
    open: openTickerWs,
    close: closeTickerWs,
    isOpen,
  } = useUpbit(
    "ticker",
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  const { open: openTradeWs, close: closeTradeWs } = useUpbit(
    "trade",
    queryCode || "",
    tradeDataAtom,
    isTradeWebsocketOpenAtom
  );

  const { open: openOrderbookWs, close: closeOrderbookWs } = useUpbit(
    "orderbook",
    queryCode || "",
    orderbookDataAtom,
    isOrderbookWebsocketOpenAtom
  );

  useEffect(() => {
    if (queryCode) {
      setSelectCode(queryCode);
      if (!isOpen) {
        openTickerWs();
      }

      openTradeWs();
      openOrderbookWs();

      return () => {
        closeTradeWs();
        closeOrderbookWs();
      };
    }
  }, []);

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
