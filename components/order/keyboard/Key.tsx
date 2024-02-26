import { motion } from "framer-motion";
import styled from "styled-components";
import Back from "@/public/back.svg";
import React from "react";

const Key: React.FC<{ name: string | number; value?: number }> = ({
  name,
  value,
}) => {
  return (
    <Keyboard
      whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
      transition={{ duration: 0.15 }}
    >
      {name === "back" ? <Back width={20} height={20} /> : name}
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
`;

export default React.memo(Key);
