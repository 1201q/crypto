import { queryCodeAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const ExchangeMenu = () => {
  const router = useRouter();
  const [queryCode] = useAtom(queryCodeAtom);

  return (
    <Container layoutId="menu">
      <MenuContainer>
        <ExchangeBtn
          whileTap={{ backgroundColor: "#D9DBDD" }}
          onClick={() => {
            router.push(
              {
                pathname: `/market/${queryCode}/orderbook`,
                query: { access: true },
              },
              `/market/${queryCode}/orderbook`
            );
          }}
        >
          호가
        </ExchangeBtn>
        <Line />
        <ExchangeBtn
          whileTap={{ backgroundColor: "#D9DBDD" }}
          onClick={() => {
            router.push(
              {
                pathname: `/market/${queryCode}/trade`,
                query: { access: true },
              },
              `/market/${queryCode}/trade`
            );
          }}
        >
          체결내역
        </ExchangeBtn>
      </MenuContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  border-radius: 6px;
  padding: 0px 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f4f6;
  height: 45px;
  border-radius: 10px;
`;

const Line = styled.div`
  background-color: lightgray;
  width: 1px;
  height: 25px;
`;

const ExchangeBtn = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #6b7684;
  height: 100%;
  border-radius: 10px;
`;

export default React.memo(ExchangeMenu);
