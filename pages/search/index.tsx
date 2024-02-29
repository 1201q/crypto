import PageRender from "@/components/shared/PageRender";
import SearchPage from "@/components/search/index";
import { ServerSideProps } from "@/types/types";
import { fetcher } from "@/utils/common/fetch";

export default function Home() {
  return <PageRender Render={SearchPage} title={`ALL UP! | 검색`} />;
}

export const getStaticProps = async (): Promise<{
  props: ServerSideProps;
}> => {
  const coinList = await fetcher("/api/markets");

  return {
    props: {
      fallback: { "/api/markets": coinList },
    },
  };
};
