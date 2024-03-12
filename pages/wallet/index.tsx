import { GetServerSideProps } from "next";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import WalletPage from "@/components/wallet/index";
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

  return <PageRender Render={WalletPage} bgColor={"#f2f4f6"} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;
  const coinList = await fetcher("/api/markets");

  return {
    props: {
      pathname,
      fallback: { "/api/markets": coinList },
    },
  };
};
