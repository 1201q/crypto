import { modalAtom } from "@/context/atoms";
import { AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";

import { useEffect } from "react";
import SortOptionModal from "../wallet/select/SortOptionModal";
import SelectSortCoinModal from "../wallet/select/SelectSortCoinModal";
import ConfirmModal from "../order/orderForm/ConfirmModal";
import KeyBoardModal from "../order/keyboard/KeyboardModal";

const ModalRender = () => {
  const modalType = useAtomValue(modalAtom);

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalType]);

  return (
    <>
      <AnimatePresence>
        {modalType === "assetOption" && <SortOptionModal type={"asset"} />}
        {modalType === "tradeOption" && <SortOptionModal type={"trade"} />}
        {modalType === "selectCoin" && <SelectSortCoinModal />}
        {modalType === "orderConfirm" && <ConfirmModal />}
        {modalType === "orderKeyboard" && <KeyBoardModal />}
      </AnimatePresence>
    </>
  );
};

export default ModalRender;
