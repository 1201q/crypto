import { isLoginPlzPopupDisplayAtom } from "@/context/user";
import { IconX } from "@/public/svgs";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import styled from "styled-components";

const LoginPlzPopup = () => {
  const close = useSetAtom(isLoginPlzPopupDisplayAtom);
  return (
    <Container
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      transition={{ duration: 0.1, type: "just" }}
    >
      <WelcomeText>거래 기능은 로그인 후 사용 가능해요!</WelcomeText>
      <CloseBtn
        onClick={() => {
          close(false);
        }}
      >
        <IconX width={20} height={20} fill={"white"} />
      </CloseBtn>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  bottom: ${(props) => `${props.theme.height.bottomTab}px`};
  width: 100%;
  height: 30px;
  max-width: 838px;
  background-color: rgba(86, 86, 86, 0.85);
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const WelcomeText = styled.p`
  padding-left: 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 5px;
  margin-top: 3px;
  padding: 5px;
  background: none;
  cursor: pointer;
`;

export default LoginPlzPopup;
