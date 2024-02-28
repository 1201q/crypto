import { buyOrderDataAtom, isOpenOrderConfirmModalAtom } from "@/context/order";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import styled from "styled-components";

const OrderBtn = ({ side }: { side: "buy" | "sell" }) => {
  const setModalOpen = useSetAtom(isOpenOrderConfirmModalAtom);

  return (
    <Btn
      bgcolor={side === "buy" ? "#df5068" : "#448aef"}
      whileTap={{ scale: 0.98 }}
      initial={{ scale: 1 }}
      transition={{ duration: 0.1 }}
      onClick={() => {
        setModalOpen(true);
      }}
    >
      {side === "buy" ? "매수" : "매도"}
    </Btn>
  );
};

const Btn = styled(motion.button)<{ bgcolor: string }>`
  position: absolute;
  bottom: 120px;
  background-color: ${(props) => props.bgcolor};
  width: calc(100% - 30px);
  height: 45px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
`;

export default OrderBtn;
