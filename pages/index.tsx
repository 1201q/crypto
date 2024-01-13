import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";

import { useEffect } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { MarketListDataType } from "@/utils/types/types";
import axios from "axios";

export interface ServerSideProps {
  isLogin?: boolean;
  uid?: string | null;
  coinList: MarketListDataType[] | null;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: Redirect }> => {
  const cookies = nookies.get(ctx);
  let isLogin = false;
  let uid = null;

  try {
    const token = await admin.auth().verifyIdToken(cookies.token);
    const coinList = await getMarketList("USDT");

    if (token) {
      uid = token.uid;
      isLogin = true;
    }

    return { props: { isLogin, uid, coinList: coinList } };
  } catch (error) {
    console.log(error);
    return { redirect: { destination: "/auth/login" } } as {
      redirect: Redirect;
    };
  }
};

export default function Home({ uid, coinList }: ServerSideProps) {
  const router = useRouter();

  console.log(coinList);
  useEffect(() => {
    getCoinList();
  }, []);

  const getCoinList = async () => {
    const coinList = await getMarketList("KRW");
    console.log(coinList);
  };

  return (
    <Container>
      {uid}
      <button
        onClick={() => {
          signOut(authService);
          router.reload();
        }}
      >
        로그아웃
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
  background-color: white;
`;
