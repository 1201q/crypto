import { usePrice } from "@/context/hooks";
import f from "@/utils/common/formatting";
import React from "react";
import styled from "styled-components";

interface PropsType {
  price: number;
}

const CenterBox: React.FC<PropsType> = ({ price }) => {
  const openingPrice = usePrice("prev_closing_price") || 0;
  const tradePrice = usePrice("trade_price") || 0;
  const percent = (price - openingPrice) / openingPrice;

  const getTextColor = (percent: number) => {
    if (percent > 0) {
      return "#df5068";
    } else if (percent < 0) {
      return "#448aef";
    }
    return "#6b7684";
  };

  return (
    <Box currentPrice={price === tradePrice}>
      <Price color={getTextColor(percent)}>{f("price", price)}</Price>
      <Percent>{f("change", percent)}%</Percent>
    </Box>
  );
};

const Box = styled.div<{ currentPrice: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  cursor: pointer;
  background-color: ${(props) => (props.currentPrice ? "#f2f4f6" : "white")};
  height: 42px;
`;

const Price = styled.p<{ color: string }>`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
`;
const Percent = styled.p`
  margin-top: 3px;
  font-size: 13px;
  letter-spacing: -0.5px;
  color: gray;
`;

export default React.memo(CenterBox);
