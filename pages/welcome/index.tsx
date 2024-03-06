import nookies from "nookies";
import { getIsFirstLogin } from "@/utils/common/db";
import getAuth from "@/utils/common/getAuth";
import { GetServerSideProps } from "next";
import { RedirectProps, ServerSideProps } from "@/types/types";

export default function Home() {
  return <div>1</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ redirect: RedirectProps } | { props: ServerSideProps }> => {
  const cookies = nookies.get(ctx);
  const { isLogin, uid } = await getAuth(cookies.token);
  const isFirstLogin = uid ? await getIsFirstLogin(uid) : false;

  if (!isFirstLogin) {
    return { redirect: { destination: "/market", permanent: false } };
  }

  return { props: { uid: uid } };
};
