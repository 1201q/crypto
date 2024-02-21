import { usePrice } from "@/context/hooks";
import { selectOrderbookPriceAtom } from "@/context/orderbook";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import LeftRow from "./LeftRow";
import RightRow from "./RightRow";

const OrderbookRow: React.FC<any> = ({ index }) => {
  const [price] = useAtom(
    useMemo(() => selectOrderbookPriceAtom(index), [index])
  );
  const tradePrice = usePrice("tp") || 0;

  return (
    <Container
      initial={{ backgroundColor: "white" }}
      whileTap={{ backgroundColor: "#f2f4f6", scale: 0.95 }}
      currentPrice={price === tradePrice}
    >
      <LeftRow index={index} />
      <RightRow index={index} />
    </Container>
  );
};

const Container = styled(motion.div)<{ currentPrice: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border: ${(props) =>
    props.currentPrice ? "1px solid #777777" : "1px solid white"};
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 5px;
`;

export default React.memo(OrderbookRow);
