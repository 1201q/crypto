import { GetServerSideProps } from "next";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import { useEffect } from "react";
import { getRoundedDecimal } from "@/utils/common/decimalUtils";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  useEffect(() => {
    const value = 100 - 2.21844645454848;
    const ss = performance.now();
    for (let i = 0; i < 1000000; i++) {
      const w = Number(value.toFixed(2)) || 0;
    }
    const ss2 = performance.now();
    console.log(`1: ${ss2 - ss}`);

    const s = performance.now();
    for (let i = 0; i < 1000000; i++) {
      const t1 = getRoundedDecimal(value, 2);
    }
    const s2 = performance.now();

    console.log(`1: ${s2 - s}`);
  }, []);

  return <div>{pathname}</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;

  return { props: { pathname } };
};
