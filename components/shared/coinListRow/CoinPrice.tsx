import { selectSortedTickerDataAtom } from "@/context/orderbook";
import f from "@/utils/common/formatting";
import usePriceUpdate from "@/utils/hooks/usePriceUpdate";
import { useAtomValue } from "jotai";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

interface ComponentProps {
  index: number;
}

interface UpdateProps {
  bgcolor: string | undefined;
}

const CoinPrice: React.FC<ComponentProps> = ({ index }) => {
  const data = useAtomValue(
    useMemo(() => selectSortedTickerDataAtom(index), [index])
  );
  const { isUpdated } = usePriceUpdate(data?.tp);

  const getUpdateDisplayBgColor = (change: string, isUpdated: boolean) => {
    if (change === "RISE") {
      return isUpdated ? "#85303E" : "#DF5068";
    } else if (change === "FALL") {
      return isUpdated ? "#28528F" : "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    }
  };

  return (
    <Container>
      <UpdateContainer bgcolor={getUpdateDisplayBgColor(data.c, isUpdated)}>
        <PercentText>{f("change", data?.cr)}%</PercentText>
      </UpdateContainer>
      <PriceText>{f("price", data?.tp)}</PriceText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 80px;
  margin-bottom: 2px;
`;

const UpdateContainer = styled.div.attrs<UpdateProps>((props) => ({
  style: {
    backgroundColor: props.bgcolor && props.bgcolor,
  },
}))<UpdateProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 22px;
  border-radius: 4px;
  margin-bottom: 3px;
  transition: background-color 0.1s ease-out;
`;

const PercentText = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: white;
  margin-right: 5px;
  letter-spacing: -0.5px;
`;

const PriceText = styled.div`
  width: 100%;
  font-size: 13px;
  color: gray;
  margin-right: 1px;
  text-align: end;
  letter-spacing: -0.5px;
`;

export default React.memo(CoinPrice);
