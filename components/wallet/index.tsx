import { useState } from "react";
import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAssetPage from "./myAsset/index";
import MyTradePage from "./myTrade/index";

const WalletPage = () => {
  const [tab, setTab] = useState([true, false]);

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab[0] === true && <MyAssetPage />}
      {tab[1] === true && <MyTradePage />}
      <MenuTab />
    </>
  );
};

export default WalletPage;
