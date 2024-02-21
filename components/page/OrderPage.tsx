import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React from "react";
import OrderSection from "../order/orderForm/OrderForm";
import OrderbookList from "../order/orderbook/OrderbookList";
import OrderBottomTab from "../order/OrderBottomTab";
import { useAtomValue } from "jotai";
import { isOrderKeyboardVisibleAtom } from "@/context/atoms";
import OrderKeyboard from "../order/OrderKeyboard";

const OrderPage = () => {
  const keyboardVisible = useAtomValue(isOrderKeyboardVisibleAtom);

  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Contents>
        <OrderbookList />
        <OrderSection />
      </Contents>
      <OrderBottomTab />
      {keyboardVisible && <OrderKeyboard />}
    </>
  );
};

const Contents = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.theme.height.orderList};
`;

export default OrderPage;
