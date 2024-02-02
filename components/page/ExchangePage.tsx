import styled from "styled-components";
import ExchangeChart from "../exchange/chart/ExchangeChart";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import ExchangeInfo from "../exchange/topInfo/ExchangeInfo";
import { motion } from "framer-motion";
import ExchangeMenu from "../exchange/others/ExchangeMenu";

import Footer from "../shared/footer/Footer";
import ExchangeDetail from "../exchange/detail/ExchangeDetail";
import SectionLine from "../exchange/others/SectionLine";
import React from "react";

const ExchangePage = () => {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
      <ExchangeMenu />
      <SectionLine />
      <ExchangeDetail />
      <Footer />
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
`;

export default ExchangePage;
