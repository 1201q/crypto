import {
  isOrderKeyboardVisibleAtom,
  orderKeyboardTypeAtom,
  orderSideAtom,
} from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import X from "@/public/x.svg";

const KeyboardHeader = () => {
  const [type] = useAtom(orderKeyboardTypeAtom);
  const [side] = useAtom(orderSideAtom);
  const [, setVisible] = useAtom(isOrderKeyboardVisibleAtom);

  return (
    <Container side={side}>
      <HeaderText side={side}>{type === "amount" ? "수량" : "총액"}</HeaderText>
      <ButtonContainer>
        <ResetBtn side={side}>초기화</ResetBtn>
        <CloseBtn
          onClick={() => {
            setVisible(false);
          }}
          side={side}
        >
          <X width={21} height={21} />
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

export default KeyboardHeader;
