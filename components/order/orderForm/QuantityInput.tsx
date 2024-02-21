import styled from "styled-components";
import Plus from "@/public/plus.svg";
import Minus from "@/public/minus.svg";
import { motion } from "framer-motion";
import { useRef } from "react";
import useOutSideClick from "@/utils/hooks/useOutSideClick";

interface PropsType {
  placeholder: string;
}

const QuantityInput: React.FC<PropsType> = ({ placeholder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocus = useOutSideClick(inputRef);

  return (
    <Container isFocus={isFocus} ref={inputRef}>
      <Input type="text" placeholder={placeholder} />
      <ButtonContainer>
        <Center>
          <Btn
            initial={{ background: "none" }}
            whileTap={{ backgroundColor: "#D9DBDD", scale: 0.9 }}
          >
            <Minus width={25} height={25} fill={"#565656"} />
          </Btn>
        </Center>
        <Center>
          <Btn
            initial={{ background: "none" }}
            whileTap={{ backgroundColor: "#D9DBDD", scale: 0.9 }}
          >
            <Plus width={25} height={25} fill={"#565656"} />
          </Btn>
        </Center>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ isFocus: boolean }>`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: #f2f4f6;
  border-radius: 7px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(100% - 88px);
  padding: 0px 0px 0px 15px;
  height: 100%;
  background: none;
  border-radius: 7px;
  font-size: 16px;
  letter-spacing: -0.5px;

  ::placeholder {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 65px;
  height: 100%;
  gap: 0px;
  margin-right: 5px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(motion.button)`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  cursor: pointer;
`;

export default QuantityInput;
