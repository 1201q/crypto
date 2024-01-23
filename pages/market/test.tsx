import nookies from "nookies";

import getMarketList from "@/utils/common/getMarketList";
import getServersideAuth from "@/utils/common/getServersideAuth";

import { useHydrateAtoms } from "jotai/utils";
import { coinListAtom, pathnameAtom } from "@/context/atoms";

import MarketPage from "@/components/page/MarketPage";
import PageRender from "@/components/page/PageRender";

import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { GetServerSideProps } from "next";

export default function Home({ coinList, pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);
  useHydrateAtoms([[coinListAtom, coinList?.data]] as ServerSideInitialValues);

  return <PageRender Render={MarketPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const pathname = ctx.resolvedUrl;

  const coinList = await getMarketList("KRW");
  const { isLogin, uid } = await getServersideAuth(cookies.token);

  return {
    props: { coinList, isLogin, uid, pathname },
  };
};
