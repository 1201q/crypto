import MenuTab from "../bottomTab/MenuTab";
import Header from "../header/Header";
import PageHeader from "../header/PageHeader";

export default function TestPage() {
  return (
    <>
      <Header />
      <PageHeader title={"원화 마켓"} />
      <MenuTab />
    </>
  );
}
