import { GetServerSideProps } from "next";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import { atom, useAtom } from "jotai";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  return (
    <div>
      <button onClick={() => {}}>클릭</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;

  return { props: { pathname } };
};
