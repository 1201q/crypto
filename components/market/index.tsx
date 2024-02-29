import MenuTab from "../shared/bottomTab/MenuTab";
import MarketList from "./MarketList";
import MarketHeader from "./MarketHeader";

export default function MarketPage() {
  return (
    <>
      <MarketHeader scrollY={0} />
      <MarketList />
      <MenuTab />
    </>
  );
}
