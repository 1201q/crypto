import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import CoinInfo from "./CoinInfo";
import CoinPrice from "./CoinPrice";

interface RowProps {
  name?: string;
  code: string;
  index?: number;
}

const CoinRow: React.FC<RowProps> = ({ name, code, index }) => {
  const router = useRouter();

  return (
    <Container
      initial={{ backgroundColor: "white" }}
      whileTap={{ backgroundColor: "#f2f4f6" }}
      onClick={() => {
        router.push(`/market/${code}`);
      }}
    >
      <CoinInfo name={name} code={code} />
      {index !== undefined && <CoinPrice index={index} />}
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 5px 20px 3px 20px;
  position: relative;
  cursor: pointer;
`;

export default React.memo(CoinRow);
