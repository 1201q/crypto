import ExchangeChart from "../exchange/chart/ExchangeChart";
import ExchangeHeader from "../shared/ExchangeHeader";
import ExchangeInfo from "../exchange/topInfo/ExchangeInfo";
import ExchangeMenu from "../exchange/others/ExchangeMenu";

import Footer from "../shared/Footer";
import ExchangeDetail from "../exchange/detail/ExchangeDetail";
import SectionLine from "../exchange/others/SectionLine";
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
