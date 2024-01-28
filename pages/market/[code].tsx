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
import useSyncAtom from "@/utils/hooks/useSyncAtom";

export default function Home({ queryCode }: ServerSideProps) {
  useSyncAtom(queryCodeAtom, queryCode);
  const { coinList } = useList();
  const [selectCode] = useAtom(queryCodeAtom);

  const { open: openTickerWs, isWsOpen: isTickerWsOpen } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  const { open: openTradeWs, close: closeTradeWs } = useTrade(
    queryCode || "",
    tradeDataAtom,
    isTradeWebsocketOpenAtom
  );

  const { open: openOrderbookWs, close: closeOrderbookWs } = useOrderbook(
    queryCode || "",
    orderbookDataAtom,
    isOrderbookWebsocketOpenAtom
  );

  useEffect(() => {
    if (queryCode === selectCode) {
      if (!isTickerWsOpen) {
        openTickerWs();
      }

      openTradeWs();
      openOrderbookWs();

      return () => {
        closeTradeWs();
        closeOrderbookWs();
      };
    }
  }, [selectCode]);

  return (
    <>
      {queryCode === selectCode && (
        <PageRender Render={ExchangePage} title={`${selectCode} | ALL UP!`} />
      )}
    </>
  );
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
