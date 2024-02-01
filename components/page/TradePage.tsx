import styled from "styled-components";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import { motion } from "framer-motion";
import ExchangeMenu from "../exchange/others/ExchangeMenu";

export default function TradePage() {
  return (
    <Container>
      <ExchangeHeader />
      <ExchangeMenu />
    </Container>
  );
}

const Container = styled(motion.div)`
  width: 100%;
`;
