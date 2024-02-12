import styled from "styled-components";
import { motion } from "framer-motion";
import OrderbookList from "../orderbook/OrderbookList";
import OrderbookHeader from "../orderbook/header/OrderbookHeader";

export default function OrderbookPage() {
  return (
    <Container>
      <OrderbookHeader />
      <OrderbookList />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
`;
