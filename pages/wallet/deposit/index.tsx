import { GetServerSideProps } from "next";
import {
  ServerSideProps,
  ServerSideInitialValues,
  RedirectProps,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import DepositPage from "@/components/wallet/deposit/index";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { fetcher } from "@/utils/common/fetch";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });

  const [, setPathName] = useAtom(pathnameAtom);

  useEffect(() => {
    pathname !== undefined && setPathName(pathname);
  }, []);

  return <PageRender Render={DepositPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  let pathname = ctx?.resolvedUrl;
  const { access } = ctx?.query;
  const coinList = await fetcher("/api/markets");

  if (!access) {
    return { redirect: { destination: "/wallet/asset", permanent: false } };
  }

  return {
    props: {
      pathname,
      fallback: { "/api/markets": coinList },
    },
  };
};
