import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinlist/CoinList";
import ListController from "../coinlist/ListController";
import Header from "../header/Header";
import PageHeader from "../header/PageHeader";

export default function MarketListPage() {
  return (
    <>
      <Header />
      <PageHeader title={"원화 마켓"} />
      <ListController />
      <CoinList height={199} />
      <MenuTab />
    </>
  );
}
