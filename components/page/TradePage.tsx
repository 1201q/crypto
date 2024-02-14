import styled from "styled-components";
import { motion } from "framer-motion";

import TradeList from "../trade/TradeList";
import TradeHeader from "../trade/TradeHeader";

export default function TradePage() {
  return (
    <>
      <TradeHeader />
      <TradeList />
    </>
  );
}
