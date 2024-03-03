import { GetServerSideProps } from "next";
import {
  ServerSideProps,
  ServerSideInitialValues,
  RedirectProps,
} from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import SignUpPage from "@/components/auth/SignupPage";
import nookies from "nookies";
import getAuth from "@/utils/common/getAuth";
import { Provider } from "jotai";
import { authStore } from "@/context/user";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  return (
    <Provider store={authStore}>
      <PageRender Render={SignUpPage} />
    </Provider>
  );
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
