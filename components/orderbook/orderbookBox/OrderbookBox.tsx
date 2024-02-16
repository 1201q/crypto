import f from "@/utils/common/formatting";
import React from "react";
import styled from "styled-components";
import Bar from "./Bar";
import { useAtom } from "jotai";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";

interface BoxPropsType {
  type: "sell" | "buy";
  size: number;
  price: number;
  index: number;
}

const OrderbookBox: React.FC<BoxPropsType> = ({ type, size, price, index }) => {
  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const getTextColor = (type: string) => {
    if (type === "buy") {
      return "#df5068";
    } else {
      return "#448aef";
    }
  };

  return (
    <Container type={type}>
      <Size type={type} $color={getTextColor(type)}>
        {displayMode
          ? f("orderbookSize", price, size)
          : f("fixedPrice", price * size)}
      </Size>

      <Bar type={type} index={index} />
    </Container>
  );
};

const Container = styled.div<{ type: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) =>
    props.type === "sell" ? "flex-end" : "flex-start"};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  height: 32px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Size = styled.p<{ $color: string; type: string }>`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.$color};
  text-overflow: ellipsis;
  z-index: 20;
  padding: ${(props) => (props.type === "sell" ? "0 7px 0 0" : "0 0 0 7px")};
`;

export default React.memo(OrderbookBox);
