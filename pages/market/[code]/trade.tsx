import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect } from "react";
import { RedirectProps, ServerSideProps } from "@/types/types";
import { useAtom } from "jotai";
import {
  isTickerWebsocketOpenAtom,
  isOrderbookWebsocketOpenAtom,
  queryCodeAtom,
} from "@/context/atoms";
import { tradeDataAtom } from "@/context/fetch";
import { allTickerDataAtom } from "@/context/fetch";

import PageRender from "@/components/page/PageRender";

import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";
import { useTicker, useTrade } from "@/utils/websocket/websocketHooks";
import { useHydrateAtoms } from "jotai/utils";
import TradePage from "@/components/page/TradePage";

export default function Home({ queryCode }: ServerSideProps) {
  useHydrateAtoms([[queryCodeAtom, queryCode]]);
  const { coinList } = useList();
  const [selectCode, setSelectCode] = useAtom(queryCodeAtom);

  const { ticker } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  const { trade } = useTrade(
    queryCode || "",
    tradeDataAtom,
    isOrderbookWebsocketOpenAtom
  );

  useEffect(() => {
    setSelectCode(queryCode);
    if (!ticker.isOpen) {
      ticker.open();
    }

    trade.open();

    return () => {
      trade.close();
    };
  }, []);

  return (
    <>
      {queryCode === selectCode && (
        <PageRender Render={TradePage} title={`${queryCode} | 체결`} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  const queryCode = ctx.query.code;
  const access = ctx.query.access ? true : false;
  const cookies = nookies.get(ctx);
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getServersideAuth(cookies.token);

  // if (!access) {
  //   return {
  //     redirect: { destination: `/market/${queryCode}`, permanent: false },
  //   };
  // }

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      queryCode: queryCode,
      access,
    } as ServerSideProps,
  };
};
