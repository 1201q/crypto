import ExchangeChart from "./chart/ExchangeChart";
import ExchangeHeader from "../shared/ExchangeHeader";
import ExchangeInfo from "./topInfo/ExchangeInfo";
import ExchangeMenu from "./others/ExchangeMenu";

import Footer from "../shared/Footer";
import ExchangeDetail from "./detail/ExchangeDetail";
import SectionLine from "./others/SectionLine";
import React from "react";
import OrderBtn from "../shared/OrderBtn";

const ExchangePage = () => {
  return (
    <>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
      <ExchangeMenu />
      <SectionLine />
      <ExchangeDetail />
      <Footer />
      <OrderBtn />
    </>
  );
};

export default ExchangePage;
