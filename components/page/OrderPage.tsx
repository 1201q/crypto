import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React, { useEffect } from "react";
import OrderSection from "../order/orderForm/OrderForm";
import OrderbookList from "../order/orderbook/OrderbookList";

import { useAtom } from "jotai";
import { isOrderKeyboardVisibleAtom } from "@/context/atoms";
import OrderKeyboard from "../order/OrderKeyboard";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const OrderPage = () => {
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useAtom(
    isOrderKeyboardVisibleAtom
  );

  useEffect(() => {
    router.beforePopState(() => {
      if (isKeyboardVisible) {
        window.history.pushState("", "");
        router.push(router.asPath);
        setIsKeyboardVisible(false);
        return false;
      }

      return true;
    });
    return () => {
      router.beforePopState(() => true);
    };
  }, [isKeyboardVisible]);

  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Contents>
        <OrderbookList />
        <OrderSection />
      </Contents>
      <AnimatePresence>
        {isKeyboardVisible && <OrderKeyboard />}
      </AnimatePresence>
    </>
  );
};

const Contents = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  height: ${(props) => props.theme.height.orderpage};
`;

export default OrderPage;
