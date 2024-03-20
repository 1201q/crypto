import { GetServerSideProps, Redirect } from "next";

export default function Home({}) {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  redirect: Redirect;
}> => {
  return {
    redirect: { destination: "/wallet/asset", permanent: false },
  };
};
