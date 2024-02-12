import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect } from "react";
import { ServerSideProps } from "@/types/types";
import { useAtom } from "jotai";
import {
  allTickerDataAtom,
  isTickerWebsocketOpenAtom,
  queryCodeAtom,
} from "@/context/atoms";

import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";

import getServersideAuth from "@/utils/common/getServersideAuth";
import fetcher from "@/utils/common/fetcher";
import { useList } from "@/utils/hooks/useList";
import { useTicker } from "@/utils/websocket/websocketHooks";
import { useHydrateAtoms } from "jotai/utils";

export default function Home({ queryCode }: ServerSideProps) {
  useHydrateAtoms([[queryCodeAtom, queryCode]]);
  const { coinList } = useList();
  const [selectCode, setSelectCode] = useAtom(queryCodeAtom);

  const { ticker } = useTicker(
    coinList.code || [],
    allTickerDataAtom,
    isTickerWebsocketOpenAtom
  );

  useEffect(() => {
    setSelectCode(queryCode);
    if (!ticker.isOpen) {
      ticker.open();
    }
  }, []);

  return (
    <>
      {queryCode === selectCode && (
        <PageRender Render={ExchangePage} title={`${queryCode} | ALL UP!`} />
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