import styled from "styled-components";
import Tab from "./Tab";
import { tabMenuAtom } from "./atom/atom";
import { useAtom } from "jotai";

const MenuTab = () => {
  const [tab] = useAtom(tabMenuAtom);
  return (
    <Container>
      {tab.map((tab, index) => (
        <Tab
          key={tab.name}
          name={tab.name}
          isSelect={tab.select}
          icon={tab.icon}
        />
      ))}
    </Container>
  );
};

const Container = styled.nav`
  height: 50px;
  z-index: 100;
  background-color: white;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #f1f2f2;
  box-sizing: border-box;
  display: flex;
`;

export default MenuTab;
