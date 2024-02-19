import { selectOrderbookPriceAtom } from "@/context/deriveredAtoms";
import { usePrice } from "@/context/hooks";
import f from "@/utils/common/formatting";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import styled from "styled-components";

interface PropsType {
  index: number;
}

const CenterBox: React.FC<PropsType> = ({ index }) => {
  const openingPrice = usePrice("pcp") || 0;
  const tradePrice = usePrice("tp") || 0;

  const [price] = useAtom(
    useMemo(() => selectOrderbookPriceAtom(index), [index])
  );

  const percent = useMemo(() => (price - openingPrice) / openingPrice, [price]);

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
  border-radius: ${(props) => (props.currentPrice ? "7px" : "0px")};
  background-color: ${(props) => (props.currentPrice ? "#f2f4f6" : "white")};
  height: 42px;
  user-select: none;
`;

const Price = styled.p<{ color: string }>`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
`;
const Percent = styled.p`
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: -0.5px;
  color: gray;
`;

export default React.memo(CenterBox);
