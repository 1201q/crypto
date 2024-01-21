import ExchangeChart from "../exchange/ExchangeChart";
import ExchangeHeader from "../exchange/ExchangeHeader";
import ExchangeInfo from "../exchange/ExchangeInfo";

export default function ExchangePage() {
  return (
    <>
      <ExchangeHeader />
      <ExchangeInfo />
      <ExchangeChart />
    </>
  );
}
