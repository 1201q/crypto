import MenuTab from "../shared/bottomTab/MenuTab";
import MarketList from "../market/MarketList";
import MarketHeader from "../market/MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader />
      <MarketList />
      <MenuTab />
    </>
  );
}
