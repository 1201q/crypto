import { motion } from "framer-motion";
import styled from "styled-components";
import { useAtom } from "jotai";
import { isOrderKeyboardVisibleAtom } from "@/context/order";
import { useRef } from "react";
import useOutSideClick from "@/utils/hooks/useOutSideClick";
import OrderKeyboardHeader from "./KeyboardHeader";
import KeyboardContainer from "./Keyboard";
import { useRouter } from "next/router";

const KeyboardModal = () => {
  const router = useRouter();
  const keyboardRef = useRef(null);
  const [, setVisible] = useAtom(isOrderKeyboardVisibleAtom);
  useOutSideClick([keyboardRef], () => {
    setVisible(false);
    router.back();
  });

  return (
    <Container ref={keyboardRef}>
      <MotionContainer
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
        exit={{ y: 300 }}
      >
        <OrderKeyboardHeader />
        <KeyboardContainer />
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
`;

export default KeyboardModal;
