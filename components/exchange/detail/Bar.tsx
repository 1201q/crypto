import { usePrice } from "@/context/hooks";
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
  const price = usePrice("trade_price");
  const left = useMemo(() => {
    if (low && high && price) {
      const range = high - low;
      const result = Math.floor(((price - low) / range) * 100);
      return result > 99 ? 99 : result;
    }
    return 0;
  }, [price]);

  return (
    <>
      <Container>
        <BarContainer>
          <CurrentPrice left={left} />
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
  height: 18px;
  position: relative;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 9px;
  background-color: #f2f4f6;
  border-radius: 10px;
  position: absolute;
`;

const BarInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const CurrentPrice = styled.div.attrs<LeftProps>((props) => ({
  style: {
    left: props.left && `${props.left}%`,
  },
}))<LeftProps>`
  height: 100%;
  width: 4px;
  background-color: gray;
  border-radius: 80px;
  position: absolute;

  transition: left 0.1s ease-out;
`;

const Text = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};
  letter-spacing: -1px;
`;

export default React.memo(Bar);
