import nookies from "nookies";
import { GetServerSideProps } from "next";
import { admin } from "@/utils/firebase/admin";
import { useEffect } from "react";
import { ServerSideProps } from "@/types/types";
import { useAtom } from "jotai";
import { queryCodeAtom } from "@/context/atoms";

import PageRender from "@/components/page/PageRender";
import ExchangePage from "@/components/page/ExchangePage";

import getAuth from "@/utils/common/getAuth";
import { fetcher } from "@/utils/common/fetch";

import { useHydrateAtoms } from "jotai/utils";
import { useUpbitAll, useUpbitSingle } from "@/utils/ws/control";

export default function Home({ queryCode }: ServerSideProps) {
  useHydrateAtoms([[queryCodeAtom, queryCode]]);

  const [selectCode, setSelectCode] = useAtom(queryCodeAtom);

  const { single } = useUpbitSingle(queryCode || "");
  const { all } = useUpbitAll([]);

  useEffect(() => {
    setSelectCode(queryCode);

    single.open();
    all.close();
  }, []);

  return (
    <>
      {queryCode === selectCode && (
        <PageRender
          Render={ExchangePage}
          title={`${queryCode} | ALL UP!`}
          bgColor={"#f2f4f6"}
        />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  const queryCode = ctx.query.code;

  const cookies = nookies.get(ctx);
  const coinList = await fetcher("/api/markets");

  const { isLogin, uid } = await getAuth(cookies.token);

  return {
    props: {
      fallback: { "/api/markets": coinList },
      coinList,
      isLogin,
      uid,
      queryCode: queryCode,
    },
  };
};
