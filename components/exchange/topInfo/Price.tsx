import { queryCodeAtom } from "@/context/atoms";
import { TickerDataType } from "@/types/types";
import f from "@/utils/common/formatting";
import usePriceUpdate from "@/utils/hooks/usePriceUpdate";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";

interface PropsType {
  data: TickerDataType;
}

const Price: React.FC<PropsType> = ({ data }) => {
  const { isUpdated } = usePriceUpdate(data);
  const [selectCode] = useAtom(queryCodeAtom);

  const getUpdateDisplayBgColor = (change: string, isUpdated: boolean) => {
    if (change === "RISE") {
      return isUpdated ? "#85303E" : "#DF5068";
    } else if (change === "FALL") {
      return isUpdated ? "#28528F" : "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    }
  };

  const price = data.trade_price;
  const changePercent = data.signed_change_rate;
  const change = data.change;
  return (
    <Container bottom={15}>
      {data.code === selectCode ? (
        <>
          <PriceText>{f("price", price)}</PriceText>
          <Update bgcolor={getUpdateDisplayBgColor(change, isUpdated)}>
            <PercentText>{f("change", changePercent)}%</PercentText>
          </Update>
        </>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

const Container = styled.div<{ bottom: number }>`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${(props) => `${props.bottom}px`};
`;

// price
const PriceText = styled.p`
  font-size: 33px;
  font-weight: 700;
  letter-spacing: -0.8px;
  margin-right: 15px;
`;

const PercentText = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

const Update = styled.div<{
  bgcolor: string | undefined;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 22px;
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-radius: 5px;
  padding: 0px 8px;
  transition-duration: 100ms;
`;

export default React.memo(Price);
