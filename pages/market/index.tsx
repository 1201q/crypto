import nookies from "nookies";
import useSWR from "swr";
import { useEffect, useRef } from "react";
import getServersideAuth from "@/utils/common/getServersideAuth";
import { useUpbit } from "@/utils/websocket/useUpbit";

import { useHydrateAtoms } from "jotai/utils";
import { allTickerDataAtom, pathnameAtom } from "@/context/atoms";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";
import fetcher from "@/utils/common/fetcher";

export default function Home({ pathname }: ServerSideProps) {
  const tickerWsRef = useRef<WebSocket | null>(null);

  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);
  const { data: coinList } = useSWR("/api/markets");
  const { open: openTickerWebsocket, close: closeTickerWebsocket } = useUpbit(
    "ticker",
    coinList ? coinList.code : [],
    tickerWsRef,
    allTickerDataAtom
  );

  useEffect(() => {
    if (coinList) {
      openTickerWebsocket();

      return () => {
        closeTickerWebsocket();
      };
    }
  }, []);

  return <PageRender Render={MarketPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getServersideAuth(cookies.token);

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      pathname,
    },
  };
};
