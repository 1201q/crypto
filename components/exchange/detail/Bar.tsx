import { usePrice } from "@/context/hooks";
import { getRoundedDecimal } from "@/utils/common/decimalUtils";
import f from "@/utils/common/formatting";
import React, { useMemo } from "react";
import styled from "styled-components";

interface BarPropsType {
  low?: number;
  high?: number;
}

interface LeftProps {
  left: number;
}

const Bar: React.FC<BarPropsType> = ({ low, high }) => {
  const price = usePrice("tp");
  const left = useMemo(() => {
    if (low && high && price) {
      const range = high - low;
      const result = getRoundedDecimal(((price - low) / range) * 100, 0);
      return result >= 99 ? 99 : result <= 1 ? 1 : result;
    }
    return 0;
  }, [price]);

  return (
    <>
      <Container>
        <BarContainer left={left}>
          <CurrentPricePoint left={left} />
        </BarContainer>
      </Container>
      <BarInfoContainer>
        <Text color={"#448aef"}>{f("price", low)}원</Text>
        <Text color={"#df5068"}>{f("price", high)}원</Text>
      </BarInfoContainer>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 9px;
  position: relative;
  margin-bottom: 9px;
  background-color: #f2f4f6;
  border-radius: 10px;
  overflow-x: hidden;
`;

const BarContainer = styled.div.attrs<LeftProps>((props) => ({
  style: {
    transform: `translateX(${props.left}%)`,
  },
}))<LeftProps>`
  width: calc(100% - 4px);
  height: 9px;
  background: none;
  transition: transform 0.2s ease-out;
`;

const BarInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const CurrentPricePoint = styled.div<{ left: number }>`
  height: 100%;
  width: 4px;
  border-radius: 20px;
  background-color: gray;
`;

const Text = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};
  letter-spacing: -1px;
`;

export default React.memo(Bar);
