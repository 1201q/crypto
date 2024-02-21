import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import {
  selectOrderbookPriceAtom,
  selectOrderbookBarWidthAtom,
  selectOrderbookSizeAtom,
} from "@/context/orderbook";
import f from "@/utils/common/formatting";

import { useAtom } from "jotai";
import React from "react";
import { useMemo, useDeferredValue } from "react";
import styled from "styled-components";

interface BarPropsType {
  $color: string;
  width: string | number;
}

const RowRight: React.FC<any> = ({ index }) => {
  const [price] = useAtom(
    useMemo(() => selectOrderbookPriceAtom(index), [index])
  );
  const [size] = useAtom(
    useMemo(() => selectOrderbookSizeAtom(index), [index])
  );
  const [displayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const [width] = useAtom(
    useMemo(() => selectOrderbookBarWidthAtom(index), [index])
  );

  let deferredWidth = useDeferredValue(width);

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
          : f("fixedPrice", price * size)}
      </Size>
      <BarContainer>
        <Bar
          width={deferredWidth}
          $color={type === "sell" ? "#ebf3fd" : "#fff3f3"}
        />
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

const Bar = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) => props.$color};
  height: 30px;
  border-radius: 6px;
`;

export default React.memo(RowRight);
