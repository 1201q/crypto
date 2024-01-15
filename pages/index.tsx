import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import getMarketList from "@/utils/common/getMarketList";
import { ServerSideProps, CoinListResponseType } from "@/utils/types/types";

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<{ props: ServerSideProps } | { redirect: Redirect }> => {
  const cookies = nookies.get(ctx);
  let isLogin = false;
  let uid = null;
  let coinList: CoinListResponseType = { code: [], data: [] };

  try {
    const token = await admin.auth().verifyIdToken(cookies.token);

    try {
      coinList = await getMarketList("KRW");
    } catch (error) {
      console.error("Error in getMarketList fetch:", error);
    }

    if (token) {
      uid = token.uid;
      isLogin = true;
    }

    return {
      // props: { coinList },
      redirect: { destination: "/exchange/KRW-BTC" },
    } as {
      props: ServerSideProps;
      redirect: Redirect;
    };
  } catch (error) {
    console.log(error);
    return { redirect: { destination: "/auth/login" } } as {
      redirect: Redirect;
    };
  }
};

export default function Home({ coinList }: ServerSideProps) {
  const router = useRouter();
  const ref = useRef(null);
  const [code, setCode] = useState("KRW-BTC");
  // const { data, open, close } = useUpbit("trade", code, ref, allTickerDataAtom);

  return (
    <Container>
      <button
        onClick={() => {
          signOut(authService);
          router.reload();
        }}
      >
        로그아웃
      </button>
      <button
        onClick={() => {
          open();
        }}
      >
        열기
      </button>
      <button
        onClick={() => {
          close();
        }}
      >
        닫기
      </button>
      <button
        onClick={() => {
          setCode("KRW-ETH");
        }}
      >
        변경
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
