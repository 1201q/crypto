import ExchangeChart from "../exchange/chart/ExchangeChart";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import ExchangeInfo from "../exchange/topInfo/ExchangeInfo";
import { motion } from "framer-motion";

export default function ExchangePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
    </motion.div>
  );
}
