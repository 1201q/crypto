import {
  ServerSideProps,
  ServerSideInitialValues,
  CoinListResponseType,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { coinListAtom } from "@/context/atoms";
import PageRender from "@/components/page/PageRender";
import SearchPage from "@/components/page/SearchPage";
import getMarketList from "@/utils/common/getMarketList";

export default function Home({ coinList }: ServerSideProps) {
  useHydrateAtoms([[coinListAtom, coinList?.data]] as ServerSideInitialValues);

  return <PageRender Render={SearchPage} />;
}

export const getStaticProps = async (): Promise<{
  props: ServerSideProps;
}> => {
  try {
    const coinList: CoinListResponseType = await getMarketList("KRW");
    return { props: { coinList } };
  } catch (error) {
    console.error("Error in getMarketList fetch:", error);
    return { props: { coinList: { code: [], data: [] } } };
  }
};
