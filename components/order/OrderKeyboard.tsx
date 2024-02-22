import { usePrice } from "@/context/hooks";
import {
  getKeyboardAmountOptions,
  getKeyboardKeys,
} from "@/utils/common/keyboard";
import { motion } from "framer-motion";
import styled from "styled-components";
import Back from "@/public/back.svg";
import { useAtom, useAtomValue } from "jotai";
import {
  isOrderKeyboardVisibleAtom,
  orderKeyboardTypeAtom,
} from "@/context/atoms";
import { useEffect, useRef, useState } from "react";
import useOutSideClick from "@/utils/hooks/useOutSideClick";
import X from "@/public/x.svg";

const OrderKeyboard = () => {
  const defaultKeys = [
    { name: "+1000만", value: 100000000 },
    { name: "+100만", value: 10000000 },
    { name: "+10만", value: 100000 },
    { name: "+1만", value: 10000 },
  ];

  const price = usePrice("tp");
  const type = useAtomValue(orderKeyboardTypeAtom);
  const [keyboard, setKeyboard] = useState(getKeyboardKeys(type));
  const [shortCutKeyboard, setShortCutKeyboard] = useState(() => {
    if (type === "amount") {
      return price && getKeyboardAmountOptions(price);
    } else {
      return defaultKeys;
    }
  });
  const [, setVisible] = useAtom(isOrderKeyboardVisibleAtom);

  const KeyboardComponent: React.FC<{ name: string | number }> = ({ name }) => {
    return (
      <Keyboard
        whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
        transition={{ duration: 0.1 }}
      >
        {name === "back" ? <Back width={20} height={20} /> : name}
      </Keyboard>
    );
  };

  const keyboardRef = useRef(null);

  useOutSideClick([keyboardRef], () => {
    setVisible(false);
  });

  useEffect(() => {
    setKeyboard(getKeyboardKeys(type));
    setShortCutKeyboard(() => {
      if (type === "amount") {
        return price && getKeyboardAmountOptions(price);
      } else {
        return defaultKeys;
      }
    });
  }, [type]);

  return (
    <Container ref={keyboardRef}>
      <MotionContainer
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
        exit={{ y: 300 }}
      >
        <HeaderContainer>
          <HeaderText>{type === "amount" ? "수량" : "총액"}</HeaderText>
          <CloseBtn
            onClick={() => {
              setVisible(false);
            }}
          >
            <X width={23} height={23} />
          </CloseBtn>
        </HeaderContainer>
        <KeyboardContainer>
          <ShortCutBtnContainer>
            {shortCutKeyboard &&
              shortCutKeyboard?.map((option) => (
                <KeyboardComponent key={option.value} name={option.name} />
              ))}
          </ShortCutBtnContainer>
          <NormalKeyboardContainer type={type}>
            {keyboard.map((option) => (
              <KeyboardComponent name={option} key={option} />
            ))}
          </NormalKeyboardContainer>
        </KeyboardContainer>
      </MotionContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  height: 40dvh;
  max-height: 350px;
  width: 100%;
  overflow-y: hidden;
  z-index: 100;
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: white;

  border-top: 1.5px solid #f1f2f2;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;

  padding: 0px 10px;
  background-color: ${(props) => props.theme.bg.lightBlue};
`;
const KeyboardContainer = styled.div`
  height: calc(100% - 35px);
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 5px;
`;

const ShortCutBtnContainer = styled.div`
  display: grid;

  grid-template-rows: repeat(4, 1fr);
`;

const NormalKeyboardContainer = styled.div<{ type: "amount" | "sum" }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  direction: ${(props) => (props.type === "sum" ? "rtl" : "ltl")};
`;

const Keyboard = styled(motion.button)`
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 15px;
  background-color: white;
  color: ${(props) => props.theme.font.black};
  text-overflow: ellipsis;
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 50%;

  cursor: pointer;

  svg {
    fill: ${(props) => props.theme.font.blue};
  }
`;

const HeaderText = styled.p`
  font-size: 16px;
  font-weight: 600;

  color: ${(props) => props.theme.font.blue};
  margin-left: 3px;
`;

export default OrderKeyboard;
