import { GetServerSideProps } from "next";
import {
  ServerSideProps,
  ServerSideInitialValues,
  RedirectProps,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import MainPage from "@/components/auth/MainPage";

import nookies from "nookies";
import getAuth from "@/utils/common/getAuth";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues, {
    dangerouslyForceHydrate: true,
  });

  return <PageRender Render={MainPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  let pathname = ctx?.resolvedUrl;

  const cookies = nookies.get(ctx);
  const { isLogin } = await getAuth(cookies.token);

  if (isLogin) {
    return {
      redirect: {
        destination: `/market`,
        permanent: false,
      },
    };
  }

  return { props: { pathname } };
};
