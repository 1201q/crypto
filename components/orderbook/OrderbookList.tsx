import { orderbookUnitsAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import OrderbookRow from "./pageComponent/OrderbookRow";
import { orderbookListHeightAtom } from "@/context/styles";

const OrderbookList = () => {
  const [units] = useAtom(orderbookUnitsAtom);
  const [height] = useAtom(orderbookListHeightAtom);

  return (
    <Container height={height}>
      {units.map((data, index) => (
        <OrderbookRow
          index={index}
          length={units.length}
          size={data.size}
          price={data.price}
          key={data.price}
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
  padding: 15px 20px 20px 20px;
`;

export default React.memo(OrderbookList);
