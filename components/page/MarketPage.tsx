import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinlist/CoinList";
import ListController from "../coinlist/ListController";
import Header from "../header/Header";
import PageHeader from "../header/PageHeader";

export default function MarketPage() {
  return (
    <>
      <Header />
      <PageHeader title={"마켓"} />
      <ListController />
      <CoinList />
      <MenuTab />
    </>
  );
}
