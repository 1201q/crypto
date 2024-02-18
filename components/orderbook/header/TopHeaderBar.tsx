import { orderbookSizeAtom } from "@/context/deriveredAtoms";
import { getRoundedDecimal } from "@/utils/common/decimalUtils";
import { useAtom } from "jotai";
import React from "react";
import { useCallback } from "react";
import styled from "styled-components";

interface BarPropsType {
  width: number;
}

const TopHeaderBar = () => {
  const [sizeData] = useAtom(orderbookSizeAtom);

  const getRedWidth = useCallback(() => {
    return getRoundedDecimal((sizeData?.bid / sizeData?.sum) * 100, 0) || 0;
  }, [sizeData?.sum]);

  return (
    <Container>
      <Bar width={getRedWidth()} />
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
  border-radius: 7px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform-origin: left center;
  transition: transform 0.2s ease-out;
`;

export default React.memo(TopHeaderBar);
