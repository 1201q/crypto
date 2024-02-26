import f from "@/utils/common/formatting";
import React from "react";
import styled from "styled-components";
import Bar from "./Bar";
import { useAtom } from "jotai";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import { useOrderbook } from "@/context/hooks";

interface BoxPropsType {
  type: "sell" | "buy";

  dataIndex: number;
}

const OrderbookBox: React.FC<BoxPropsType> = ({ type, dataIndex }) => {
  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const price = useOrderbook("price", dataIndex);
  const size = useOrderbook("size", dataIndex);
  const total = useOrderbook("total", dataIndex);

  const getTextColor = (type: string) => {
    if (type === "buy") {
      return "#df5068";
    } else {
      return "#448aef";
    }
  };

  return (
    <>
      {price ? (
        <Container type={type}>
          <Size type={type} $color={getTextColor(type)}>
            {displayMode && price
              ? f("orderbookSize", price, size)
              : f("fixedPrice", total)}
          </Size>
          <Bar type={type} index={dataIndex} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const Container = styled.div<{ type: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) =>
    props.type === "sell" ? "flex-end" : "flex-start"};
  overflow: hidden;
  position: relative;
  height: 42px;
  border-radius: 5px;
`;

const Size = styled.p<{ $color: string; type: string }>`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${(props) => props.$color};
  text-overflow: ellipsis;
  z-index: 20;
  padding: ${(props) => (props.type === "sell" ? "0 7px 0 0" : "0 0 0 7px")};
`;

export default React.memo(OrderbookBox);
