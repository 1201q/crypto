import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAssetPage from "./myAsset/index";
import MyTradePage from "./myTrade/index";
import { useRouter } from "next/router";

const WalletPage = () => {
  const router = useRouter();
  const currentTab = router.query.tab;

  return (
    <>
      <Header />
      {currentTab === "asset" && <MyAssetPage />}
      {currentTab === "trade" && <MyTradePage />}
      <MenuTab />
    </>
  );
};

export default WalletPage;
