import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect } from "react";
import { ServerSideProps, RedirectProps } from "@/types/types";
import { useAtom } from "jotai";
import { queryCodeAtom } from "@/context/atoms";

import PageRender from "@/components/shared/PageRender";

import getAuth from "@/utils/common/getAuth";
import { fetcher } from "@/utils/common/fetch";

import { useHydrateAtoms } from "jotai/utils";
import OrderPage from "@/components/order/index";
import { useUpbitSingle } from "@/utils/ws/control";

export default function Home({ queryCode }: ServerSideProps) {
  useHydrateAtoms([[queryCodeAtom, queryCode]]);

  const [selectCode, setSelectCode] = useAtom(queryCodeAtom);
  const { single } = useUpbitSingle(queryCode || "");

  useEffect(() => {
    setSelectCode(queryCode);
    single.open();
  }, []);

  return (
    <>
      {queryCode === selectCode && (
        <PageRender Render={OrderPage} title={`${queryCode} | 주문`} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: RedirectProps }> => {
  const queryCode = ctx.query.code;
  const access = ctx.query.access ? true : false;
  const cookies = nookies.get(ctx);
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getAuth(cookies.token);

  // if (!access) {
  //   return {
  //     redirect: {
  //       destination: `/market/${queryCode}`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      queryCode: queryCode,
      access,
    } as ServerSideProps,
  };
};
