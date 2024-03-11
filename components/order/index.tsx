import styled from "styled-components";
import ExchangeHeader from "../shared/ExchangeHeader";
import React, { useEffect } from "react";
import OrderSection from "./orderForm/OrderForm";
import OrderbookList from "./orderbook/OrderbookList";

import { useAtom } from "jotai";
import {
  isOpenOrderConfirmModalAtom,
  isOrderKeyboardVisibleAtom,
} from "@/context/order";
import KeyboardModal from "./keyboard/KeyboardModal";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import ConfirmModal from "./orderForm/ConfirmModal";

const OrderPage = () => {
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useAtom(
    isOrderKeyboardVisibleAtom
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useAtom(
    isOpenOrderConfirmModalAtom
  );

  const handleHistoryBack = () => {
    if (router.query?.open) {
      if (isKeyboardVisible) setIsKeyboardVisible(false);
      else if (isOpenConfirmModal) setIsOpenConfirmModal(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleHistoryBack);
    return () => {
      router.events.off("routeChangeStart", handleHistoryBack);
    };
  }, [router.query]);

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
