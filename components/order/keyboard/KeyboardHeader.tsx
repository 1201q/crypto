import {
  orderAmountAtom,
  orderKeyboardTypeAtom,
  orderSideAtom,
  orderTotalAtom,
} from "@/context/order";
import { useAtom } from "jotai";
import styled from "styled-components";

import { IconX } from "@/public/svgs";
import React from "react";
import { useRouter } from "next/router";

const KeyboardHeader = () => {
  const router = useRouter();
  const [type] = useAtom(orderKeyboardTypeAtom);
  const [side] = useAtom(orderSideAtom);
  const [, setAmount] = useAtom(orderAmountAtom);
  const [, setTotal] = useAtom(orderTotalAtom);

  return (
    <Container side={side}>
      <HeaderText side={side}>{type === "amount" ? "수량" : "총액"}</HeaderText>
      <ButtonContainer>
        <ResetBtn
          side={side}
          onClick={() => {
            if (type === "amount") {
              setAmount("0");
            } else if (type === "total") {
              setTotal("0");
            }
          }}
        >
          초기화
        </ResetBtn>
        <CloseBtn
          onClick={() => {
            router.back();
          }}
          side={side}
        >
          <IconX width={21} height={21} />
        </CloseBtn>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ side: "buy" | "sell" }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;

  padding: 0px 10px;
  background-color: ${(props) =>
    props.side === "sell" ? props.theme.bg.lightBlue : props.theme.bg.lightRed};
`;

const HeaderText = styled.p<{ side: "buy" | "sell" }>`
  font-size: 16px;
  font-weight: 600;

  color: ${(props) =>
    props.side === "sell" ? props.theme.font.blue : props.theme.font.red};
  margin-left: 3px;
`;

const CloseBtn = styled.button<{ side: "buy" | "sell" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 50%;

  cursor: pointer;

  svg {
    fill: ${(props) =>
      props.side === "sell" ? props.theme.font.blue : props.theme.font.red};
  }
`;

const ResetBtn = styled.button<{ side: "buy" | "sell" }>`
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) =>
    props.side === "sell" ? props.theme.font.blue : props.theme.font.red};
  background: none;
  margin-right: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default React.memo(KeyboardHeader);
