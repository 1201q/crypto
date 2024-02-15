import React from "react";
import styled from "styled-components";
import Center from "./Center";
import BlankBox from "./Blank";
import Box from "./Box";

interface PropsType {
  size: number;
  price: number;

  index: number;
  type: "ask" | "bid";
}

const OrderbookRow: React.FC<PropsType> = ({ index, type, size, price }) => {
  return (
    <Row>
      {type === "ask" ? (
        <Box type={"ask"} size={size} price={price} index={index} />
      ) : (
        <BlankBox />
      )}
      <Center price={price} />
      {type === "bid" ? (
        <Box type={"bid"} size={size} price={price} index={index} />
      ) : (
        <BlankBox />
      )}
    </Row>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  height: 42px;
  gap: 10px;
`;

export default React.memo(OrderbookRow);
