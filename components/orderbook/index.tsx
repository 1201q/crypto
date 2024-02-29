import OrderbookList from "./OrderbookList";
import OrderbookHeader from "./header/OrderbookHeader";
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
