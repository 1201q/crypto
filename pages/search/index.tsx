import { GetServerSideProps } from "next";
import {
  ServerSideProps,
  ServerSideInitialValues,
  CoinListResponseType,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { coinListAtom, pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/page/PageRender";
import SearchPage from "@/components/page/SearchPage";
import getMarketList from "@/utils/common/getMarketList";

export default function Home({ coinList, pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);
  useHydrateAtoms([[coinListAtom, coinList?.data]] as ServerSideInitialValues);

  return <PageRender Render={SearchPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;
  let coinList: CoinListResponseType = { code: [], data: [] };
  try {
    coinList = await getMarketList("KRW");
  } catch (error) {
    console.error("Error in getMarketList fetch:", error);
  }
  return { props: { coinList, pathname } };
};
