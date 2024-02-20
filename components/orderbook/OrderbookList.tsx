import React from "react";
import styled from "styled-components";
import CenterSection from "./section/CenterSection";
import SideSection from "./section/SideSection";

const OrderbookList = () => {
  return (
    <ListContainer>
      <LeftContainer>
        <SideSection type={"sell"} />
      </LeftContainer>
      <CenterContainer>
        <CenterSection />
      </CenterContainer>
      <RightContainer>
        <SideSection type={"buy"} top={630} startIndex={15} />
      </RightContainer>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  gap: 10px;
  height: ${(props) => props.theme.height.orderbookList};
  min-height: calc(100dvh - 100px);
  padding: 15px 21px 20px 21px;
  user-select: none;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const RightContainer = styled(LeftContainer)`
  justify-content: flex-end;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default React.memo(OrderbookList);
