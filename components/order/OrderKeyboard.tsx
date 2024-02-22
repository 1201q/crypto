import { usePrice } from "@/context/hooks";
import { getKeyboardAmountOptions } from "@/utils/common/keyboard";
import { motion } from "framer-motion";
import styled from "styled-components";
import Back from "@/public/back.svg";

const OrderKeyboard = () => {
  const price = usePrice("tp");
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "back"];

  const shortcutOptions = price && getKeyboardAmountOptions(price);

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

  return (
    <Container>
      <MotionContainer
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "just" }}
      >
        <ShortCutBtnContainer>
          {typeof price === "number" &&
            shortcutOptions &&
            shortcutOptions?.map((option) => (
              <KeyboardComponent key={option.value} name={option.name} />
            ))}
        </ShortCutBtnContainer>
        <KeyboardContainer>
          {array.map((option) => (
            <KeyboardComponent name={option} key={option} />
          ))}
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
  border-top: 1px solid #f1f2f2;
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: white;
  padding: 5px;
  gap: 5px;
`;

const ShortCutBtnContainer = styled.div`
  display: grid;
  gap: 5px;
  grid-template-rows: repeat(4, 1fr);
`;

const KeyboardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
`;

const Keyboard = styled(motion.button)`
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 15px;
  background-color: white;
  color: ${(props) => props.theme.font.black};
  text-overflow: ellipsis;
`;

export default OrderKeyboard;
