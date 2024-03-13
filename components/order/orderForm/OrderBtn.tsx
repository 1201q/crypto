import { modalAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";

import styled from "styled-components";

const OrderBtn = ({ side }: { side: "buy" | "sell" }) => {
  const setModal = useSetAtom(modalAtom);

  return (
    <Btn
      bgcolor={side === "buy" ? "#df5068" : "#448aef"}
      whileTap={{ scale: 0.98 }}
      initial={{ scale: 1 }}
      transition={{ duration: 0.1 }}
      onClick={() => {
        setModal("orderConfirm");
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
