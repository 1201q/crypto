import { orderbookSizeAtom } from "@/context/orderbook";
import { getRoundedDecimal } from "@/utils/common/decimalUtils";
import { useAtom } from "jotai";
import React, { useDeferredValue, useMemo } from "react";

import styled from "styled-components";

interface BarPropsType {
  width: number;
}

const TopHeaderBar = () => {
  const [sizeData] = useAtom(orderbookSizeAtom);

  const getRedWidth = useMemo(() => {
    return getRoundedDecimal((sizeData?.bid / sizeData?.sum) * 100, 0) || 0;
  }, [sizeData?.sum]);

  const deferredWidth = useDeferredValue(getRedWidth);

  return (
    <Container>
      <Bar width={deferredWidth} />
    </Container>
  );
};

const Container = styled.div`
  height: 7px;
  background-color: #df5068;
  border-radius: 7px;
  margin: 0px 21px;
  overflow: hidden;
`;

const Bar = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    transform: `translateX(-${props.width}%)`,
  },
}))<BarPropsType>`
  width: 100%;
  height: 100%;
  background-color: #448aef;
  transform-origin: left center;
  transition: transform 0.2s ease-out;
`;

export default React.memo(TopHeaderBar);
