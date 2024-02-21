import styled from "styled-components";
import OrderbookRow from "./OrderbookRow";
import { useAtom } from "jotai";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import Down from "@/public/caret-down.svg";
import React from "react";

const OrderbookList = () => {
  const renderArray = Array(30).fill(null);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  return (
    <Container>
      {renderArray.map((d, index) => (
        <OrderbookRow index={index} key={index} />
      ))}
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
  border-right: 1px solid #f1f2f2;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OrderbookController = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  bottom: 0px;
  height: 30px;
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
  cursor: pointer;

  svg {
    fill: ${(props) => props.theme.font.gray};
    margin-top: -1px;
    margin-left: 3px;
  }
`;

export default React.memo(OrderbookList);
