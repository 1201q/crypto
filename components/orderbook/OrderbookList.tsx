import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { orderbookListHeightAtom } from "@/context/styles";
import CenterSection from "./section/CenterSection";
import SideSection from "./section/SideSection";

const OrderbookList = () => {
  const [height] = useAtom(orderbookListHeightAtom);

  return (
    <ListContainer height={height}>
      <SideSection type={"sell"} />
      <CenterSection />
      <RightContainer>
        <SideSection type={"buy"} top={630} startIndex={15} />
      </RightContainer>
    </ListContainer>
  );
};

const ListContainer = styled.div<{ height: string }>`
  display: grid;
  grid-template-columns: 1.2fr 1.1fr 1.2fr;
  gap: 10px;
  height: ${(props) => props.height};
  min-height: calc(100dvh - 100px);
  padding-top: 15px;
  padding-bottom: 20px;
  padding: 15px 21px 20px 21px;
  user-select: none;
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  margin-top: 4px;
`;

export default React.memo(OrderbookList);
