import { usePrice } from "@/context/hooks";
import { selectOrderbookPriceAtom } from "@/context/orderbook";
import f from "@/utils/common/formatting";
import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import styled from "styled-components";

const RowLeft: React.FC<any> = ({ index }) => {
  const [price] = useAtom(
    useMemo(() => selectOrderbookPriceAtom(index), [index])
  );
  const openingPrice = usePrice("pcp") || 0;
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
    <Container>
      <Price color={getTextColor(percent)}>{f("price", price)}</Price>
      <Percent color={getTextColor(percent)}>{f("change", percent)}%</Percent>
    </Container>
  );
};

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
`;

const Price = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
  padding-left: 21px;
`;
const Percent = styled.p<{ color: string }>`
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
  padding-left: 21px;
`;

export default React.memo(RowLeft);
