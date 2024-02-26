import styled from "styled-components";
import OrderbookRow from "./OrderbookRow";
import { useAtom } from "jotai";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import Down from "@/public/caret-down.svg";
import React from "react";
import { Virtuoso } from "react-virtuoso";

const OrderbookList = () => {
  const renderArray = Array(30).fill(null);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  return (
    <Container>
      <Virtuoso
        data={renderArray}
        itemContent={(index, data) => (
          <OrderbookRow index={index} key={index} />
        )}
        totalCount={renderArray.length}
        fixedItemHeight={45}
        initialTopMostItemIndex={7}
      />
      <OrderbookController>
        <ChangeViewMode
          onClick={() => {
            setDisplayMode((prev) => !prev);
          }}
        >
          {displayMode ? "수량" : "총액"}
          <Down width={13} height={13} />
        </ChangeViewMode>
      </OrderbookController>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border-right: 1.5px solid #f1f2f2;
  padding-bottom: ${(props) =>
    `${props.theme.height.orderPageOrderbookController}px`};

  div {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const OrderbookController = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0px;
  height: ${(props) => `${props.theme.height.orderPageOrderbookController}px`};
  background-color: white;
  border-top: 1px solid #f1f2f2;
  z-index: 3;
`;

const ChangeViewMode = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.font.gray};
  padding-right: 5px;
  height: 100%;
  cursor: pointer;

  svg {
    fill: ${(props) => props.theme.font.gray};
    margin-top: -1px;
    margin-left: 3px;
  }
`;

export default React.memo(OrderbookList);
