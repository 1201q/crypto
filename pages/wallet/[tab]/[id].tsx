import PageRender from "@/components/shared/PageRender";
import DetailPage from "@/components/wallet/myTrade/Detail";
import { useAuth } from "@/utils/firebase/provider";
import { RedirectProps, ServerSideProps } from "@/types/types";
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
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  const { id, access }: { id: string; access: string } = ctx.query;
  const coinList = await fetcher("/api/markets");

  if (!access) {
    return { redirect: { destination: "/wallet/trade", permanent: false } };
  }

  return {
    props: {
      tradeItemId: id,
      fallback: { "/api/markets": coinList },
    },
  };
};
