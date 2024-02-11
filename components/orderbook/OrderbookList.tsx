import { orderbookUnitsAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import OrderbookRow from "./pageComponent/OrderbookRow";

const OrderbookList = () => {
  const [units] = useAtom(orderbookUnitsAtom);

  return (
    <Container>
      {units?.map((d, index) => (
        <OrderbookRow
          index={index}
          length={units.length}
          size={d.size}
          price={d.price}
          key={index}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 0px 20px;
`;

export default React.memo(OrderbookList);
