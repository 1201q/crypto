import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React from "react";
import OrderSection from "../order/OrderSection";
import SmallOrderbook from "../order/SmallOrderbook";

const OrderPage = () => {
  return (
    <>
      <ExchangeHeader borderVisible={true} infoVisible={true} />
      <Contents>
        <SmallOrderbook />
        <OrderSection />
      </Contents>
    </>
  );
};

const Contents = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.theme.height.orderList};
`;

export default OrderPage;
