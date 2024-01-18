import styled from "styled-components";
import Tab from "./Tab";
import { pathnameAtom, tabMenuAtom } from "./atom/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MenuTab = () => {
  const router = useRouter();
  const [tabMenu] = useAtom(tabMenuAtom);
  const [pathname, setPathname] = useAtom(pathnameAtom);

  useEffect(() => {
    console.log(router.pathname);
    setPathname(router.pathname);
  }, [router.pathname]);

  return (
    <Container>
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
