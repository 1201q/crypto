import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React from "react";
import OrderSection from "../order/OrderForm";
import OrderbookList from "../order/orderbook/OrderbookList";
import OrderBottomTab from "../order/OrderBottomTab";

const OrderPage = () => {
  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Contents>
        <OrderbookList />
        <OrderSection />
      </Contents>
      <OrderBottomTab />
    </>
  );
};

const Contents = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.theme.height.orderList};
`;

export default OrderPage;
