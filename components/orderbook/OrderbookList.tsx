import { orderbookUnitsAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import OrderbookRow from "./pageComponent/OrderbookRow";
import { orderbookListHeightAtom } from "@/context/styles";

const OrderbookList = () => {
  const [units] = useAtom(orderbookUnitsAtom);
  const [height] = useAtom(orderbookListHeightAtom);
  const renderTypeDivide = units.length / 2 - 1;

  return (
    <Container height={height}>
      {units.map((data, index) => (
        <OrderbookRow
          key={data.price}
          index={index}
          size={data.size}
          price={data.price}
          type={index <= renderTypeDivide ? "ask" : "bid"}
        />
      ))}
    </Container>
  );
};

const Container = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  min-height: calc(100dvh - 100px);
  padding-top: 15px;
  padding-bottom: 20px;
  padding: 15px 21px 20px 21px;
`;

export default React.memo(OrderbookList);
