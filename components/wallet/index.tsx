import { useState } from "react";
import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAmountPage from "./MyAmountPage";
import MyTradePage from "./MyTradePage";

const WalletPage = () => {
  const [tab, setTab] = useState([true, false]);
  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab[0] === true && <MyAmountPage />}
      {tab[1] === true && <MyTradePage />}
      <MenuTab />
    </>
  );
};

export default WalletPage;
