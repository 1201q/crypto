import { GetServerSideProps, Redirect } from "next";

export default function Home({}) {
  return <div>1</div>;
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  redirect: Redirect;
}> => {
  return {
    redirect: { destination: "/exchange", permanent: false },
  };
};
