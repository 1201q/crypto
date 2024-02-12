import {
  orderbookSizeAtom,
  orderbookUnitsAtom,
  orderbookVolumeDisplayModeAtom,
} from "@/context/atoms";
import { usePrice } from "@/context/hooks";
import { orderbookTopHeaderHeightAtom } from "@/context/styles";
import f from "@/utils/common/formatting";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import styled from "styled-components";

interface BarPropsType {
  width: string | number;
}

const TopBarHeader = () => {
  const price = usePrice("trade_price") || 0;
  const [height] = useAtom(orderbookTopHeaderHeightAtom);
  const [sizeData] = useAtom(orderbookSizeAtom);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const [data] = useAtom(orderbookUnitsAtom);

  const getBlueWidth = useCallback(() => {
    return ((sizeData?.ask / sizeData?.sum) * 100).toFixed(2);
  }, [sizeData]);

  return (
    <Container height={height}>
      <ValueContainer>
        <ValueBox align={"left"}>
          <Header>판매</Header>
          <Value color={"#448aef"}>
            {displayMode
              ? f("orderbookSize", price, sizeData?.ask)
              : f("fixedPrice", sizeData?.ask * price)}
          </Value>
        </ValueBox>
        <Button
          onClick={() => {
            setDisplayMode((prev) => !prev);
          }}
        >
          {displayMode ? "수량" : "총액(원)"}
        </Button>
        <ValueBox align={"right"}>
          <Header>구매</Header>
          <Value color={"#df5068"}>
            {displayMode
              ? f("orderbookSize", price, sizeData?.bid)
              : f("fixedPrice", sizeData?.bid * price)}
          </Value>
        </ValueBox>
      </ValueContainer>
      <BarContainer>
        <Bar width={getBlueWidth()} />
      </BarContainer>
    </Container>
  );
};

const Container = styled.header<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  background-color: white;
  border: none;
  z-index: 100;
  position: sticky;
  top: 51px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 7px;
  background-color: #df5068;
  border-radius: 7px;
`;

const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  margin-top: 6px;
  position: relative;
`;

const ValueBox = styled.div<{ align: string }>`
  text-align: ${(props) => props.align};
`;

const Header = styled.p`
  font-size: 12px;
  margin-bottom: 2px;
  color: #808080;
`;
const Value = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

const Button = styled.button`
  position: absolute;
  width: 76px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f2f4f6;
  border-radius: 7px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #808080;
  padding: 6px 0px;
  cursor: pointer;
`;

const Bar = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))<BarPropsType>`
  height: 100%;
  background-color: #448aef;
  border-radius: 7px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: width 0.2s ease-out;
`;

export default React.memo(TopBarHeader);