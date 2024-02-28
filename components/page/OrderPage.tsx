import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React, { useEffect } from "react";
import OrderSection from "../order/orderForm/OrderForm";
import OrderbookList from "../order/orderbook/OrderbookList";

import { useAtom } from "jotai";
import {
  isOpenOrderConfirmModalAtom,
  isOrderKeyboardVisibleAtom,
} from "@/context/order";
import KeyboardModal from "../order/keyboard/KeyboardModal";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import ConfirmModal from "../order/orderForm/ConfirmModal";

const OrderPage = () => {
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useAtom(
    isOrderKeyboardVisibleAtom
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useAtom(
    isOpenOrderConfirmModalAtom
  );

  useEffect(() => {
    router.beforePopState(() => {
      if (isKeyboardVisible || isOpenConfirmModal) {
        window.history.pushState("", "");
        router.push(router.asPath);
        setIsKeyboardVisible(false);
        setIsOpenConfirmModal(false);
        return false;
      }

      return true;
    });
    return () => {
      router.beforePopState(() => true);
    };
  }, [isKeyboardVisible, isOpenConfirmModal]);

  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Contents>
        <OrderbookList />
        <OrderSection />
      </Contents>
      <AnimatePresence>
        {isKeyboardVisible && <KeyboardModal />}
        {isOpenConfirmModal && <ConfirmModal />}
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
