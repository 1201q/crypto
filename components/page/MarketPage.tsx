import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinList/CoinList";
import MarketHeader from "../coinList/MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader />
      <CoinList />
      <MenuTab />
    </>
  );
}
