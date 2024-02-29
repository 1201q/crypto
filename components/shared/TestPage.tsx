import MenuTab from "./bottomTab/MenuTab";
import Header from "../market/MarketHeader";

export default function TestPage() {
  return (
    <>
      <Header scrollY={0} />
      <MenuTab />
    </>
  );
}
