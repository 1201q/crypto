import styled from "styled-components";
import Tab from "./Tab";
import { pathnameAtom, tabMenuAtom } from "@/context/atoms";
import { useAtom } from "jotai";

const MenuTab = () => {
  const [tabMenu] = useAtom(tabMenuAtom);
  const [pathname] = useAtom(pathnameAtom);

  return (
    <Container>
      {tabMenu.map((tab) => (
        <Tab
          key={tab.name}
          name={tab.name}
          isSelect={tab.routing.split("/")[1] === pathname?.split("/")[1]}
          icon={tab.icon}
          routing={tab.routing}
        />
      ))}
    </Container>
  );
};

const Container = styled.nav`
  height: ${(props) => `${props.theme.height.bottomTab}px`};
  z-index: 100;
  background-color: white;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #f1f2f2;
  box-sizing: border-box;
  display: flex;
`;

export default MenuTab;
