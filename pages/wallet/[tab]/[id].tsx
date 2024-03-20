import PageRender from "@/components/shared/PageRender";
import DetailPage from "@/components/wallet/myTrade/Detail";
import { useAuth } from "@/utils/firebase/provider";
import { ServerSideProps } from "@/types/types";
import { GetServerSideProps } from "next/types";
import { fetcher } from "@/utils/common/fetch";

export default function Home({ tradeItemId }: { tradeItemId: string }) {
  const user = useAuth();
  return (
    <>
      {user && <PageRender Render={DetailPage} props={{ id: tradeItemId }} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const { id }: { id: string } = ctx.query;
  const coinList = await fetcher("/api/markets");

  return {
    props: {
      tradeItemId: id,
      fallback: { "/api/markets": coinList },
    },
  };
};
