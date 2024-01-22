import MenuTab from "../shared/bottomTab/MenuTab";
import CoinList from "../market/CoinList";
import MarketHeader from "../market/MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader />
      <CoinList />
      <MenuTab />
    </>
  );
}
