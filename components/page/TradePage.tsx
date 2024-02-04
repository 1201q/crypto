import styled from "styled-components";
import { motion } from "framer-motion";

import TradeList from "../trade/TradeList";
import TradeHeader from "../trade/TradeHeader";

export default function TradePage() {
  return (
    <Container>
      <TradeHeader />
      <TradeList />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
  position: relative;
`;
