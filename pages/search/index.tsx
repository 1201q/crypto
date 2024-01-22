import { ServerSideProps } from "@/types/types";

import PageRender from "@/components/page/PageRender";
import SearchPage from "@/components/page/SearchPage";
import fetcher from "@/utils/common/fetcher";
import { GetServerSideProps } from "next/types";
import useSWR from "swr";

export default function Home() {
  return <PageRender Render={SearchPage} />;
}

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: any
// ): Promise<{ props: ServerSideProps }> => {
//   const coinList = await fetcher("/api/markets");

//   return {
//     props: {
//       fallback: { "/api/markets": coinList },
//     },
//   };
// };
