import { useEffect, useState } from "react";
import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAssetPage from "./myAsset/index";
import MyTradePage from "./myTrade/index";
import { AnimatePresence } from "framer-motion";
import SortOptionModal from "./select/SortOptionModal";
import SelectCoinModal from "./select/SelectSortCoinModal";
import { useAtom } from "jotai";
import {
  isSelectOptionModalOpen,
  isSelectSortCoinModalOpenAtom,
} from "@/context/atoms";
import { useRouter } from "next/router";
import SelectSortCoinModal from "./select/SelectSortCoinModal";

const WalletPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState([true, false]);
  const [isAssetModalVisible, setIsAssetModalVisible] = useAtom(
    isSelectOptionModalOpen
  );
  const [isSelectCoinModalVisible, setIsSelectCoinModalVisible] = useAtom(
    isSelectSortCoinModalOpenAtom
  );

  useEffect(() => {
    if (isAssetModalVisible || isSelectCoinModalVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAssetModalVisible, isSelectCoinModalVisible]);

  const handleHistoryBack = () => {
    if (router.query?.open) {
      if (isAssetModalVisible) setIsAssetModalVisible(false);
      if (isSelectCoinModalVisible) setIsSelectCoinModalVisible(false);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleHistoryBack);
    return () => {
      router.events.off("routeChangeStart", handleHistoryBack);
    };
  }, [router.query]);

  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {tab[0] === true && <MyAssetPage />}
      {tab[1] === true && <MyTradePage />}
      <MenuTab />
      <AnimatePresence>
        {isAssetModalVisible && tab[0] === true && (
          <SortOptionModal type={"asset"} />
        )}
        {isAssetModalVisible && tab[1] === true && (
          <SortOptionModal type={"trade"} />
        )}
        {isSelectCoinModalVisible && tab[1] === true && <SelectSortCoinModal />}
      </AnimatePresence>
    </>
  );
};

export default WalletPage;
