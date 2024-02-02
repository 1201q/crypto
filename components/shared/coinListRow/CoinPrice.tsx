import { TickerDataType } from "@/types/types";
import f from "@/utils/common/formatting";
import usePriceUpdate from "@/utils/hooks/usePriceUpdate";
import React from "react";
import styled from "styled-components";

interface ComponentProps {
  tickerData: TickerDataType;
}

const CoinPrice: React.FC<ComponentProps> = ({ tickerData }) => {
  const { isUpdated } = usePriceUpdate(tickerData.trade_price);

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
      <UpdateContainer
        bgcolor={getUpdateDisplayBgColor(tickerData.change, isUpdated)}
      >
        <PercentText>{f("change", tickerData.signed_change_rate)}%</PercentText>
      </UpdateContainer>
      <PriceText>{f("price", tickerData.trade_price)}</PriceText>
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

const UpdateContainer = styled.div<{
  bgcolor: string | undefined;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 22px;
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-radius: 4px;
  margin-bottom: 3px;
  transition-duration: 100ms;
`;

const PercentText = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-right: 5px;
  letter-spacing: -0.1px;
`;

const PriceText = styled.div`
  width: 100%;
  font-size: 13px;
  color: gray;
  margin-right: 1px;
  text-align: end;
`;

export default React.memo(CoinPrice);
