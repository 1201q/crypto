import styled from "styled-components";
import Tab from "./Tab";
import { pathnameAtom, tabMenuAtom } from "@/context/atoms";
import { useAtom } from "jotai";

import { bottomTabHeightAtom } from "@/context/styles";

const MenuTab = () => {
  const [tabMenu] = useAtom(tabMenuAtom);
  const [pathname] = useAtom(pathnameAtom);
  const [height] = useAtom(bottomTabHeightAtom);

  return (
    <Container height={height}>
      {tabMenu.map((tab) => (
        <Tab
          key={tab.name}
          name={tab.name}
          isSelect={tab.routing === pathname}
          icon={tab.icon}
          routing={tab.routing}
        />
      ))}
    </Container>
  );
};

const Container = styled.nav<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  z-index: 100;
  background-color: white;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #f1f2f2;
  box-sizing: border-box;
  display: flex;
`;

export default MenuTab;
