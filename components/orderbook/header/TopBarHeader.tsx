import { orderbookVolumeDisplayModeAtom } from "@/context/atoms";
import { orderbookSizeAtom } from "@/context/deriveredAtoms";
import { orderbookPriceModeAtom } from "@/context/deriveredAtoms";
import { usePrice } from "@/context/hooks";
import { orderbookTopHeaderHeightAtom } from "@/context/styles";
import { getRoundedDecimal } from "@/utils/common/decimalUtils";
import f from "@/utils/common/formatting";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import TopHeaderBar from "./TopHeaderBar";
import ValueDisplay from "./ValueDisplay";

const TopBarHeader = () => {
  const [height] = useAtom(orderbookTopHeaderHeightAtom);
  const [displayMode, setDisplayMode] = useAtom(orderbookVolumeDisplayModeAtom);

  return (
    <Container height={height}>
      <ValueContainer>
        <ValueDisplay align={"left"} type={"ask"} headerText="판매" />
        <Button
          onClick={() => {
            setDisplayMode((prev) => !prev);
          }}
          initial={{ scale: 1, translateX: "-50%" }}
          whileTap={{ scale: 0.95 }}
        >
          {displayMode ? "수량" : "총액(원)"}
        </Button>
        <ValueDisplay align={"right"} type={"bid"} headerText="구매" />
      </ValueContainer>
      <TopHeaderBar />
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

const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  margin-top: 6px;
  position: relative;
  padding: 0px 20px;
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

export default React.memo(TopBarHeader);
