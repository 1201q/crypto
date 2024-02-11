import styled from "styled-components";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import { motion } from "framer-motion";
import OrderbookList from "../orderbook/OrderbookList";

export default function OrderbookPage() {
  return (
    <Container>
      <ExchangeHeader />
      <OrderbookList />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
`;
