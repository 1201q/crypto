import { selectCodeAtom, selectTickerDataAtom } from "@/context/atoms";
import { TickerDataType } from "@/types/types";
import f from "@/utils/common/formatting";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";
import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ExchangeInfo = () => {
  const updateTimerRef = useRef<NodeJS.Timeout>();
  const [selectCode] = useAtom(selectCodeAtom);
  const [data] = useAtom(selectTickerDataAtom(selectCode));

  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isUpdated, setIsUpdated] = useState(false);

  const { coinList, isValidating } = useList();

  const getUpdateDisplayBgColor = (change: string, isUpdated: boolean) => {
    if (change === "RISE") {
      return isUpdated ? "#85303E" : "#DF5068";
    } else if (change === "FALL") {
      return isUpdated ? "#28528F" : "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    }
  };

  const Name = (bottom: number) => {
    return (
      <Flex bottom={bottom}>
        <NameText>{getKR(coinList.data, selectCode)}</NameText>
        <Code>{f("code", selectCode)}</Code>
      </Flex>
    );
  };

  const Price = (data: TickerDataType, bottom: number) => {
    const price = data.trade_price;
    return (
      <Flex bottom={bottom}>
        <PriceText>{f("price", price)}</PriceText>
      </Flex>
    );
  };

  const Yesterday = (data: TickerDataType, bottom: number) => {
    const tradePrice = data.trade_price;
    const changePrice = data.signed_change_price;
    const changePercent = data.signed_change_rate;

    return (
      <Flex bottom={bottom}>
        <YesterDay>어제보다</YesterDay>
        <YesterDayInfo>
          {f("changePrice", tradePrice, changePrice)}원
        </YesterDayInfo>
        <YesterDayInfo>{f("change", changePercent)}%</YesterDayInfo>
      </Flex>
    );
  };

  return (
    <Container>
      {data ? Name(5) : <Flex bottom={5}></Flex>}
      {data ? Price(data, 10) : <Flex bottom={10}></Flex>}
      {data ? Yesterday(data, 0) : <Flex bottom={0}></Flex>}
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
  padding: 20px 21px;
`;

const Flex = styled.div<{ bottom: number }>`
  width: 100%;
  display: flex;
  margin-bottom: ${(props) => `${props.bottom}px`};
`;

// name
const NameText = styled.p`
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -1px;
  margin-right: 10px;
`;

const Code = styled.p`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 500;
  color: gray;
`;

// price
const PriceText = styled.p`
  font-size: 35px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const YesterDay = styled.p`
  font-size: 15px;
  color: gray;
`;

const YesterDayInfo = styled.p`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.4px;
  margin-left: 6px;
`;

const PercentDisplayBox = styled.div<{
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
`;

const Skeleton = styled.div`
  width: 150px;
  height: 100%;
  background-color: #b1b1b1;
  border-radius: 4px;
`;

export default ExchangeInfo;
