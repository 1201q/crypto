import { useAtom } from "jotai";
import MenuTab from "../bottomTab/MenuTab";
import CoinList from "../coinlist/CoinList";
import ListController from "../coinlist/ListController";
import Header from "../header/Header";
import { headerHeightAtom } from "@/utils/atoms/styles";
import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { AnimatePresence } from "framer-motion";

export default function MarketPage() {
  const [, setHeaderHeight] = useAtom(headerHeightAtom);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let prevY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentY = window.scrollY;

      if (prevY > currentY) {
        console.log("위로");
        setIsHeaderVisible(true);
        setHeaderHeight(50);
      } else {
        console.log("아래로");
        setIsHeaderVisible(false);
        setHeaderHeight(0);
      }

      prevY = currentY;
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isHeaderVisible && <Header />}
      <ListController />
      <CoinList />
      <MenuTab />
    </>
  );
}
