import styled from "styled-components";
import DefaultInput from "./DefaultInput";
import OrderSideSelector from "./OrderSideSelector";
import AmountSelector from "./AmountSelector";
import OrderTypeSelector from "./OrderTypeSelector";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { orderSideAtom, isOrderKeyboardVisibleAtom } from "@/context/atoms";
import AccountDisplay from "./AccountDisplay";

const OrderSection = () => {
  const [side] = useAtom(orderSideAtom);
  const [, setVisible] = useAtom(isOrderKeyboardVisibleAtom);

  console.log(1);

  return (
    <Container>
      <OrderSideSelector />
      <OrderTypeSelector />
      <AccountDisplay />
      <DefaultInput placeholder="수량" />
      <AmountSelector />
      <DefaultInput placeholder="총액" />
      <OrderBtn
        bgcolor={side === "buy" ? "#df5068" : "#448aef"}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {side === "buy" ? "매수" : "매도"}
      </OrderBtn>
      <button
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        버튼
      </button>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 15px;
  position: relative;
`;

const OrderBtn = styled(motion.button)<{ bgcolor: string }>`
  position: absolute;
  bottom: 40px;
  background-color: ${(props) => props.bgcolor};
  width: calc(100% - 30px);
  height: 45px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
`;

export default OrderSection;
