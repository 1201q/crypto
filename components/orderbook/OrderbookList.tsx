import { orderbookUnitsAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import OrderbookRow from "./pageComponent/OrderbookRow";
import { orderbookListHeightAtom } from "@/context/styles";
import { Virtuoso } from "react-virtuoso";

const OrderbookList = () => {
  const [units] = useAtom(orderbookUnitsAtom);
  const [height] = useAtom(orderbookListHeightAtom);

  return (
    <Container height={height}>
      <Virtuoso
        data={units}
        useWindowScroll
        style={{ height: "100%" }}
        itemContent={(index, data) => (
          <OrderbookRow
            index={index}
            length={units.length}
            size={data.size}
            price={data.price}
            key={index}
          />
        )}
        totalCount={units.length}
      />
    </Container>
  );
};

const Container = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  padding-top: 15px;
  padding-bottom: 20px;
`;

export default React.memo(OrderbookList);
