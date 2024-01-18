import PageRender from "@/components/page/PageRender";
import TestPage from "@/components/page/TestPage";
import { GetServerSideProps } from "next";
import { ServerSideProps, ServerSideInitialValues } from "@/utils/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/components/bottomTab/atom/atom";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  return <div>{pathname}</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;

  return { props: { pathname } };
};
