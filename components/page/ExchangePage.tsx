import ExchangeChart from "../exchange/chart/ExchangeChart";
import ExchangeHeader from "../exchange/header/ExchangeHeader";
import ExchangeInfo from "../exchange/topInfo/ExchangeInfo";

export default function ExchangePage() {
  return (
    <>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
    </>
  );
}
