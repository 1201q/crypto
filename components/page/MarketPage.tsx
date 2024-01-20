import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinlist/CoinList";
import MarketHeader from "../header/MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader />
      <CoinList />
      <MenuTab />
    </>
  );
}
