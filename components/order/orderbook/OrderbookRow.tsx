import { useOrderbook, usePrice } from "@/context/hooks";
import React from "react";
import styled from "styled-components";
import LeftRow from "./LeftRow";
import RightRow from "./RightRow";

const OrderbookRow: React.FC<any> = ({ index }) => {
  const price = useOrderbook("price", index);
  const tradePrice = usePrice("tp") || 0;

  return (
    <Container $currentprice={price === tradePrice}>
      <LeftRow index={index} />
      <RightRow index={index} />
    </Container>
  );
};

const Container = styled.div<{ $currentprice: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  border: ${(props) =>
    props.$currentprice ? "1px solid #777777" : "1px solid white"};
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
`;

export default React.memo(OrderbookRow);
