import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

interface HeaderProps {
  tab: boolean[];
  setTab: Dispatch<SetStateAction<boolean[]>>;
}

const Header: React.FC<HeaderProps> = ({ tab, setTab }) => {
  const menu = ["보유자산", "거래내역"];
  const selectIndex = tab.findIndex((select) => select);

  return (
    <Container>
      {tab.map((select, index) => (
        <PageText
          onClick={() => {
            setTab((prev) => {
              return prev.map((tab, i) => i === index);
            });
          }}
          isselect={select}
        >
          {menu[index]}
        </PageText>
      ))}
      <BarContainer>
        <UnderBar selectIndex={selectIndex} />
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
  background-color: #f2f4f6;
  padding: 0px 20px;
  z-index: 200;
`;

const BarContainer = styled.div`
  left: 0;
  bottom: 0;
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
