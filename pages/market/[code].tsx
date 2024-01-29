import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect } from "react";
import { ServerSideProps } from "@/types/types";
import { useAtom } from "jotai";
import {
  allTickerDataAtom,
  isTickerWebsocketOpenAtom,
  isTradeWebsocketOpenAtom,
  isOrderbookWebsocketOpenAtom,
  orderbookDataAtom,
  tradeDataAtom,
  queryCodeAtom,
} from "@/context/atoms";

import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";

import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";
import {
  useTicker,
  useTrade,
  useOrderbook,
} from "@/utils/websocket/websocketHooks";
import { useHydrateAtoms } from "jotai/utils";

export default function Home({ queryCode }: ServerSideProps) {
  useHydrateAtoms([[queryCodeAtom, queryCode]]);
  const { coinList } = useList();
  const [selectCode] = useAtom(queryCodeAtom);

  const { ticker } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  const { trade } = useTrade(
    queryCode || "",
    tradeDataAtom,
    isTradeWebsocketOpenAtom
  );

  const { orderbook } = useOrderbook(
    queryCode || "",
    orderbookDataAtom,
    isOrderbookWebsocketOpenAtom
  );

  useEffect(() => {
    if (!ticker.isOpen) {
      ticker.open();
    }

    trade.open();
    orderbook.open();

    return () => {
      trade.close();
      orderbook.close();
    };
  }, []);

  return <PageRender Render={ExchangePage} title={`${selectCode} | ALL UP!`} />;
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
