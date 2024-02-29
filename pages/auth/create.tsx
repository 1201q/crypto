import { GetServerSideProps } from "next";
import { ServerSideProps, ServerSideInitialValues } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { pathnameAtom } from "@/context/atoms";
import PageRender from "@/components/shared/PageRender";
import SignUpPage from "@/components/auth/Test";

export default function Home({ pathname }: ServerSideProps) {
  useHydrateAtoms([[pathnameAtom, pathname]] as ServerSideInitialValues);

  return <PageRender Render={SignUpPage} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps }> => {
  let pathname = ctx?.resolvedUrl;

  return { props: { pathname } };
};
