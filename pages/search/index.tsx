import PageRender from "@/components/page/PageRender";
import SearchPage from "@/components/page/SearchPage";
import HeadMeta from "@/components/shared/Meta/HeadMeta";
import { ServerSideProps } from "@/types/types";
import fetcher from "@/utils/common/fetcher";

export default function Home() {
  return (
    <>
      <HeadMeta title={`ALL UP! | 검색`} />
      <PageRender Render={SearchPage} />
    </>
  );
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
