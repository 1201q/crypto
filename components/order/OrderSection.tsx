import styled from "styled-components";

import QuantityInput from "./AskBid/QuantityInput";
import DefaultInput from "./AskBid/DefaultInput";
import OrderTypeSelector from "./AskBid/OrderTypeSelector";
import f from "@/utils/common/formatting";
import AmountSelector from "./AskBid/AmountSelector";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { orderTypeAtom } from "@/context/atoms";

const OrderSection = () => {
  const [type] = useAtom(orderTypeAtom);
  return (
    <Container>
      <OrderTypeSelector />
      <OrderableContainer>
        <Header>주문가능</Header>
        <OrderablePrice>{f("fixedPrice", 1002312312300)}원</OrderablePrice>
      </OrderableContainer>
      <QuantityInput placeholder="개수" />
      <AmountSelector />
      <QuantityInput placeholder="가격" />
      <DefaultInput placeholder="총액" />
      <OrderBtn
        bgcolor={type === "bid" ? "#df5068" : "#448aef"}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {type === "bid" ? "매수" : "매도"}
      </OrderBtn>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  position: relative;
`;

const OrderableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Header = styled.p`
  width: 60px;
  font-size: 15px;
  color: gray;
  letter-spacing: -0.3px;
  text-overflow: ellipsis;
`;
const OrderablePrice = styled.p`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -1px;
`;

const OrderBtn = styled(motion.button)<{ bgcolor: string }>`
  position: absolute;
  bottom: 40px;
  background-color: ${(props) => props.bgcolor};
  width: calc(100% - 40px);
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
