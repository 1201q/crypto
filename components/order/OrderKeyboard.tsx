import { motion } from "framer-motion";
import styled from "styled-components";
import X from "@/public/x.svg";
import { useSetAtom } from "jotai";
import { isOrderKeyboardVisibleAtom } from "@/context/atoms";

const OrderKeyboard = () => {
  const setVisible = useSetAtom(isOrderKeyboardVisibleAtom);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "back"];

  const KeyboardComponent: React.FC<any> = ({ name }) => {
    return (
      <Keyboard
        whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
        transition={{ duration: 0.1 }}
      >
        {name}
      </Keyboard>
    );
  };

  return (
    <Container>
      {/* <Header>
        <CloseBtn
          onClick={() => {
            setVisible(false);
          }}
        >
          <X width={16} height={16} fill={"#565656"} />
        </CloseBtn>
      </Header> */}
      <KeyboardContainer>
        {array.map((option) => (
          <KeyboardComponent name={option} key={option} />
        ))}
      </KeyboardContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 370px;
  bottom: 0;
  background-color: white;
  z-index: 100;
  border-top: 1px solid #f1f2f2;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  position: relative;
`;

const KeyboardContainer = styled.div`
  height: calc(100%);
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 7px;
  padding: 5px 5px;
`;

const Keyboard = styled(motion.button)`
  font-size: 22px;
  cursor: pointer;
  border-radius: 15px;
  background-color: white;
`;

const CloseBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: ${(props) => props.theme.bg.default};
`;

export default OrderKeyboard;
