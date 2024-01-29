import styled from "styled-components";
import ExchangeChart from "../exchange/chart/ExchangeChart";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import ExchangeInfo from "../exchange/topInfo/ExchangeInfo";
import { motion } from "framer-motion";

export default function ExchangePage() {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
`;
