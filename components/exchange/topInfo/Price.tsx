import { usePrice } from "@/context/hooks";
import f from "@/utils/common/formatting";
import usePriceUpdate from "@/utils/hooks/usePriceUpdate";

import React from "react";
import styled from "styled-components";

const Price: React.FC = () => {
  const getUpdateDisplayBgColor = (
    change: string | undefined,
    isUpdated: boolean
  ) => {
    if (change === "RISE") {
      return isUpdated ? "#85303E" : "#DF5068";
    } else if (change === "FALL") {
      return isUpdated ? "#28528F" : "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    } else {
      return "#B1B1B1";
    }
  };

  const PriceComponent = () => {
    const price = usePrice("trade_price") || 0;
    return <PriceText>{f("price", price)}</PriceText>;
  };

  const UpdateComponent = () => {
    const price = usePrice("trade_price") || 0;
    const changePercent = usePrice("signed_change_rate");
    const change = usePrice("change");

    const { isUpdated } = usePriceUpdate(price);
    return (
      <Update bgcolor={getUpdateDisplayBgColor(change, isUpdated)}>
        <PercentText>{f("change", changePercent)}%</PercentText>
      </Update>
    );
  };

  return (
    <Container bottom={15}>
      <PriceComponent />
      <UpdateComponent />
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
