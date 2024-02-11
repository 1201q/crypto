import f from "@/utils/common/formatting";
import React from "react";
import styled from "styled-components";

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
      <Size $color={getTextColor(type)}>{f("orderbookSize", price, size)}</Size>
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
`;

const Size = styled.p<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: ${(props) => props.$color};
  text-overflow: ellipsis;
`;

export default React.memo(Box);
