import { useEffect, useState } from "react";
import MenuTab from "../shared/bottomTab/MenuTab";
import Header from "./Header";
import MyAssetPage from "./myAsset/index";
import MyTradePage from "./myTrade/index";
import { AnimatePresence } from "framer-motion";
import SelectOptionModal from "./SelectOptionModal";
import { useAtom } from "jotai";
import { isSelectOptionModalOpen } from "@/context/atoms";
import { useRouter } from "next/router";

const WalletPage = () => {
  const router = useRouter();
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

  const handleHistoryBack = () => {
    if (router.query?.open) {
      if (isAssetModalVisible) setIsAssetModalVisible(false);
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
          <SelectOptionModal type={"asset"} />
        )}
        {isAssetModalVisible && tab[1] === true && (
          <SelectOptionModal type={"trade"} />
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletPage;
