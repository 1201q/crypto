import styled from "styled-components";
import nookies from "nookies";
import { GetServerSideProps, Redirect } from "next";
import { admin } from "@/utils/firebase/admin";
import { signOut } from "firebase/auth";
import { authService } from "@/utils/firebase/client";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import getMarketList from "@/utils/common/getMarketList";
import {
  TickerDataType,
  ServerSideProps,
  CoinListResponseType,
  WebsocketType,
  SetAtom,
} from "@/utils/types/types";
import createWebsocket from "@/utils/websocket/createWebsocket";
import { allTickerDataAtom } from "@/utils/atoms/atoms";
import { useAtom, atom } from "jotai";
import { SetStateAction } from "jotai/vanilla";

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

export default function Home({ uid }: ServerSideProps) {
  const router = useRouter();

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
      {code}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
  background-color: white;
`;
