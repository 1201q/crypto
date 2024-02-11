import f from "@/utils/common/formatting";
import React from "react";
import styled from "styled-components";
import Bar from "./Bar";

interface BoxPropsType {
  type: "ask" | "bid";
  size: number;
  price: number;
}

const Box: React.FC<BoxPropsType> = ({ type, size, price }) => {
  const getTextColor = (type: string) => {
    if (type === "bid") {
      return "#df5068";
    } else {
      return "#448aef";
    }
  };

  return (
    <Container type={type}>
      <Size type={type} $color={getTextColor(type)}>
        {f("orderbookSize", price, size)}
      </Size>
      <Bar type={type} size={size} />
    </Container>
  );
};

const Container = styled.div<{ type: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.type === "ask" ? "flex-end" : "flex-start")};
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const Size = styled.p<{ $color: string; type: string }>`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.$color};
  text-overflow: ellipsis;
  z-index: 20;
  padding: ${(props) => (props.type === "ask" ? "0 7px 0 0" : "0 0 0 7px")};
`;

export default React.memo(Box);
