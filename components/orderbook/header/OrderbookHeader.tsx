import React from "react";
import ExchangeHeader from "../../shared/ExchangeHeader";
import TopBarHeader from "./TopBarHeader";

const OrderbookHeader = () => {
  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <TopBarHeader />
    </>
  );
};

export default React.memo(OrderbookHeader);
