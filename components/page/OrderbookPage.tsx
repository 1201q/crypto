import OrderbookList from "../orderbook/OrderbookList";
import OrderbookHeader from "../orderbook/header/OrderbookHeader";
import OrderBtn from "../shared/OrderBtn";

export default function OrderbookPage() {
  return (
    <>
      <OrderbookHeader />
      <OrderbookList />
      <OrderBtn />
    </>
  );
}
