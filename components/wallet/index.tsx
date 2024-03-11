import { useEffect, useState } from "react";
import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAssetPage from "./myAsset/index";
import MyTradePage from "./myTrade/index";
import { AnimatePresence } from "framer-motion";
import SelectOptionModal from "./SelectOptionModal";
import { useAtom } from "jotai";
import { isSelectOptionModalOpen } from "@/context/atoms";

const WalletPage = () => {
  const [tab, setTab] = useState([true, false]);
  const [isAssetModalVisible, setIsAssetModalVisible] = useAtom(
    isSelectOptionModalOpen
  );

  useEffect(() => {
    if (isAssetModalVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAssetModalVisible]);

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab[0] === true && <MyAssetPage />}
      {tab[1] === true && <MyTradePage />}
      <MenuTab />
      <AnimatePresence>
        {isAssetModalVisible && (
          <SelectOptionModal type={tab[0] === true ? "asset" : "trade"} />
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletPage;
