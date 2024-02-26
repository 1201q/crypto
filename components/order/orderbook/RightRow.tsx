import Bar from "@/components/orderbook/orderbookBox/Bar";
import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import { useOrderbook } from "@/context/hooks";
import f from "@/utils/common/formatting";

import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import styled from "styled-components";

const RowRight: React.FC<any> = ({ index }) => {
  const price = useOrderbook("price", index);
  const size = useOrderbook("size", index);
  const total = useOrderbook("total", index);

  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);

  const type = useMemo(() => {
    return index < 15 ? "sell" : "buy";
  }, [index]);

  const getHogaTextColor = (type: string) => {
    if (type === "buy") {
      return "#df5068";
    } else {
      return "#448aef";
    }
  };

  return (
    <Container>
      <Size $color={getHogaTextColor(type)}>
        {displayMode && price
          ? f("orderbookSize", price, size)
          : f("fixedPrice", total)}
      </Size>
      <BarContainer>
        <Bar index={index} type={type} />
      </BarContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  position: relative;
  z-index: 1;
`;

const Size = styled.p<{ $color: string }>`
  position: absolute;
  right: 6px;
  margin-top: 9px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -1px;
  color: ${(props) => props.$color};

  @media screen and (max-width: 450px) {
    margin-top: 18px;
    font-size: 12px;
  }
`;

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default React.memo(RowRight);
