import React from "react";
import styled from "styled-components";
import Center from "./Center";
import BlankBox from "./blankBox";
import Box from "./Box";

interface PropsType {
  size: number;
  price: number;
  length: number;
  index: number;
}

const OrderbookRow: React.FC<PropsType> = ({ index, length, size, price }) => {
  const renderType = length / 2 - 1;
  return (
    <Row>
      {index <= renderType ? (
        <Box type={"ask"} size={size} price={price} />
      ) : (
        <BlankBox />
      )}
      <Center price={price} />
      {index > renderType ? (
        <Box type={"bid"} size={size} price={price} />
      ) : (
        <BlankBox />
      )}
    </Row>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 42px;
  gap: 10px;
`;

export default React.memo(OrderbookRow);
