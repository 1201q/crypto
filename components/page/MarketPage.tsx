import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinlist/CoinList";
import MarketHeader from "../coinlist/MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader />
      <CoinList />
      <MenuTab />
    </>
  );
}
