import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { orderbookListHeightAtom } from "@/context/styles";
import CenterSection from "./section/CenterSection";
import SideSection from "./section/SideSection";

import {
  orderbookBuyUnitsAtom,
  orderbookPriceArrayAtom,
  orderbookSellUnitsAtom,
} from "@/context/atoms";

const OrderbookList = () => {
  const [height] = useAtom(orderbookListHeightAtom);
  const [buyData] = useAtom(orderbookBuyUnitsAtom);
  const [sellData] = useAtom(orderbookSellUnitsAtom);
  const [priceList] = useAtom(orderbookPriceArrayAtom);

  return (
    <ListContainer height={height}>
      <SideSection type={"sell"} data={sellData} />
      <CenterSection data={priceList} />
      <RightContainer>
        <SideSection type={"buy"} data={buyData} />
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
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 630px;
`;

export default React.memo(OrderbookList);
