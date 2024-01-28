import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect, useRef } from "react";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import {
  PrimitiveAtom,
  Provider,
  WritableAtom,
  atom,
  createStore,
  useAtom,
  useSetAtom,
} from "jotai";
import {
  allTickerDataAtom,
  isTickerWebsocketOpenAtom,
  isTradeWebsocketOpenAtom,
  isOrderbookWebsocketOpenAtom,
  orderbookDataAtom,
  selectCodeAtom,
  tradeDataAtom,
  queryCodeAtom,
} from "@/context/atoms";

import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";
import { useHydrateAtoms } from "jotai/utils";

import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";
import {
  useTicker,
  useTrade,
  useOrderbook,
} from "@/utils/websocket/websocketHooks";

export default function Home({ queryCode }: ServerSideProps) {
  const { coinList } = useList();

  // useHydrateAtoms([[selectCodeAtom, queryCode]] as ServerSideInitialValues);
  useSyncAtom(queryCodeAtom, queryCode);

  // const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
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
    if (queryCode) {
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
  }, []);

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

export const useSyncAtom = (
  atom: PrimitiveAtom<string | undefined>,
  value: string | undefined
) => {
  useHydrateAtoms([[atom, value]]);
  const setAtom = useSetAtom(atom);
  useEffect(() => {
    setAtom(value);
  }, [setAtom, value]);
};
