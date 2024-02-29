import { motion } from "framer-motion";
import styled from "styled-components";
import { IconBack } from "@/public/svgs";
import React from "react";

import { useSetAtom, useAtom } from "jotai";
import {
  orderAmountAtom,
  orderTotalAtom,
  orderKeyboardTypeAtom,
} from "@/context/order";
import {
  handleBackspace,
  handleNumber,
  handleShortcut,
  handlePoint,
} from "@/utils/common/keyboard";

const Key: React.FC<{
  name: string | number;
  value: number | string;
  keyType: "shortcut" | "normal";
}> = ({ name, value, keyType }) => {
  const setAmount = useSetAtom(orderAmountAtom);
  const setTotal = useSetAtom(orderTotalAtom);
  const [keyboardType] = useAtom(orderKeyboardTypeAtom);

  const handleKeyboard = (key: any, setValue: any) => {
    if (keyType === "shortcut") {
      setValue((prev: string) => handleShortcut(prev, key));
    } else if (keyType === "normal") {
      if (key === ".") {
        setValue((prev: string) => handlePoint(prev));
      } else if (key === "back") {
        setValue((prev: string) => handleBackspace(prev));
      } else {
        setValue((prev: string) => handleNumber(prev, key));
      }
    }
  };

  return (
    <Keyboard
      whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
      transition={{ duration: 0.15 }}
      onClick={() => {
        if (keyboardType === "amount") {
          handleKeyboard(value, setAmount);
        } else if (keyboardType === "total") {
          handleKeyboard(value, setTotal);
        }
      }}
    >
      {name === "back" ? <IconBack width={20} height={20} /> : name}
    </Keyboard>
  );
};

const Keyboard = styled(motion.button)`
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 15px;
  background-color: white;
  color: ${(props) => props.theme.font.black};
  text-overflow: ellipsis;
  line-break: loose;
`;

export default React.memo(Key);
