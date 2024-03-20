import { useRouter } from "next/router";

import styled from "styled-components";

const Header: React.FC = () => {
  const menu = [
    { name: "보유자산", tab: "asset" },
    { name: "거래내역", tab: "trade" },
  ];
  const router = useRouter();
  const currentTab = router.query.tab;

  return (
    <Container>
      {menu.map((m) => (
        <PageText
          key={`header-${m.name}`}
          onClick={() => {
            router.replace(`/wallet/${m.tab}`);
          }}
          isselect={m.tab === currentTab}
        >
          {m.name}
        </PageText>
      ))}
      <BarContainer>
        <UnderBar selectIndex={menu.findIndex((m) => m.tab === currentTab)} />
      </BarContainer>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => `${props.theme.height.header}px`};
  background-color: white;
  border-bottom: 1px solid #f1f2f2;
  padding: 0px 20px;
  z-index: 200;
`;

const BarContainer = styled.div`
  left: 0;
  bottom: -2px;
  position: absolute;
  width: 100%;
  height: 3px;
`;

const UnderBar = styled.div<{ selectIndex: number }>`
  position: relative;
  left: ${(props) =>
    props.selectIndex ? `${25 + props.selectIndex * 80}px` : "25px"};
  width: 50px;
  height: 100%;
  background-color: black;
  border-radius: 10px;
  transition-duration: 0.2s;
`;
const PageText = styled.div<{ isselect: boolean }>`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  font-size: 18px;
  font-weight: 700;
  margin-top: 2px;
  cursor: pointer;
  color: ${(props) =>
    props.isselect ? props.theme.font.black : props.theme.font.gray};
`;

export default Header;
