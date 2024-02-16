import {
  orderbookSizeAtom,
  orderbookPriceModeAtom,
  orderbookVolumeDisplayModeAtom,
} from "@/context/atoms";
import { usePrice } from "@/context/hooks";
import { orderbookTopHeaderHeightAtom } from "@/context/styles";
import f from "@/utils/common/formatting";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import styled from "styled-components";

interface BarPropsType {
  width: number;
}

const TopBarHeader = () => {
  const price = usePrice("trade_price") || 0;
  const [height] = useAtom(orderbookTopHeaderHeightAtom);
  const [sizeData] = useAtom(orderbookSizeAtom);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);
  const [priceSum] = useAtom(orderbookPriceModeAtom);

  const getRedWidth = useCallback(() => {
    return Number(((sizeData?.bid / sizeData?.sum) * 100).toFixed(2)) || 0;
  }, [sizeData]);

  return (
    <Container height={height}>
      <ValueContainer>
        <ValueBox align={"left"}>
          <Header>판매</Header>
          <Value color={"#448aef"}>
            {displayMode
              ? f("orderbookSize", price, sizeData?.ask)
              : f("fixedPrice", priceSum?.ask)}
          </Value>
        </ValueBox>
        <Button
          onClick={() => {
            setDisplayMode((prev) => !prev);
          }}
          initial={{ scale: 1, translateX: "-50%" }}
          whileTap={{ scale: 0.95 }}
        >
          {displayMode ? "수량" : "총액(원)"}
        </Button>
        <ValueBox align={"right"}>
          <Header>구매</Header>
          <Value color={"#df5068"}>
            {displayMode
              ? f("orderbookSize", price, sizeData?.bid)
              : f("fixedPrice", priceSum?.bid)}
          </Value>
        </ValueBox>
      </ValueContainer>
      <BarContainer>
        <Bar width={getRedWidth()} />
      </BarContainer>
    </Container>
  );
};

const Container = styled.header<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  background-color: white;
  border: none;
  z-index: 101;
  position: sticky;
  top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BarContainer = styled.div`
  height: 7px;
  background-color: #df5068;
  border-radius: 7px;
  margin: 0px 21px;
  overflow: hidden;
`;

const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  margin-top: 6px;
  position: relative;
  padding: 0px 20px;
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
  min-height: 14px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

const Button = styled(motion.button)`
  position: absolute;
  width: 65px;
  left: 50%;
  background-color: #f2f4f6;
  border-radius: 7px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: #808080;
  padding: 7px 0px;
  cursor: pointer;
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

export default React.memo(TopBarHeader);
