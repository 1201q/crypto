import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React from "react";
import { useAtom } from "jotai";
import { orderContentsHeightAtom } from "@/context/styles";
import OrderSection from "../order/OrderSection";
import SmallOrderbook from "../order/SmallOrderbook";

const OrderPage = () => {
  const [height] = useAtom(orderContentsHeightAtom);
  return (
    <>
      <ExchangeHeader borderVisible={true} infoVisible={true} />
      <Contents height={height}>
        <SmallOrderbook />
        <OrderSection />
      </Contents>
    </>
  );
};

const Contents = styled.div<{ height: string }>`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.height};
`;

export default OrderPage;
