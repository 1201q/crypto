import {
  orderbookPriceModeAtom,
  orderbookSizeAtom,
} from "@/context/deriveredAtoms";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import f from "@/utils/common/formatting";
import { usePrice } from "@/context/hooks";

interface PropsType {
  align: "left" | "right";
  headerText: string;
  type: "ask" | "bid";
}

const ValueDisplay: React.FC<PropsType> = ({ align, headerText, type }) => {
  const price = usePrice("tp") || 0;
  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const [priceSum] = useAtom(orderbookPriceModeAtom);
  const [sizeData] = useAtom(orderbookSizeAtom);

  return (
    <Container align={align}>
      <Header>{headerText}</Header>
      <Value color={type === "ask" ? "#448aef" : "#df5068"}>
        {displayMode
          ? f("orderbookSize", price, sizeData[type])
          : f("fixedPrice", priceSum[type])}
      </Value>
    </Container>
  );
};

const Container = styled.div<{ align: string }>`
  text-align: ${(props) => props.align};
`;

const Header = styled.p`
  font-size: 12px;
  margin-bottom: 2px;
  color: #808080;
`;

const Value = styled.p<{ color: string }>`
  min-height: 14px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

export default React.memo(ValueDisplay);
