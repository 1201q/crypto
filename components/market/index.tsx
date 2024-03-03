import MenuTab from "../shared/bottomTab/MenuTab";
import MarketList from "./MarketList";
import MarketHeader from "./MarketHeader";
import LoginPlzPopup from "./LoginPlzPopup";
import { useAtomValue } from "jotai";
import { isLoginAtom, isLoginPlzPopupDisplayAtom } from "@/context/user";

export default function MarketPage() {
  const loginPlzPopupDisplay = useAtomValue(isLoginPlzPopupDisplayAtom);
  const isLoggedIn = useAtomValue(isLoginAtom);
  return (
    <>
      <MarketHeader scrollY={0} />
      <MarketList />
      <MenuTab />
      {loginPlzPopupDisplay && !isLoggedIn && <LoginPlzPopup />}
    </>
  );
}
