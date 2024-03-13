import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React from "react";
import OrderSection from "./orderForm/OrderForm";
import OrderbookList from "./orderbook/OrderbookList";

const OrderPage = () => {
  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Contents>
        <OrderbookList />
        <OrderSection />
      </Contents>
    </>
  );
};

const Contents = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.theme.height.orderpage};
`;

export default OrderPage;
