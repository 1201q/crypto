import { isCorrectPage, selectedLineChartOptionAtom } from "@/context/atoms";
import { LineChartPropsType } from "@/types/types";
import f from "@/utils/common/formatting";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React from "react";
import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
  0% {
    background-color: #E9EBEE;
  }
  50% {
    background-color: #F7F8F9;
  }
  100% {
    background-color: #E9EBEE;
  }
`;

interface PropsType {
  latestData: LineChartPropsType;
  firstData: LineChartPropsType;
}

const ChartInfo: React.FC<PropsType> = ({ latestData, firstData }) => {
  const [option] = useAtom(selectedLineChartOptionAtom);

  const startDate =
    firstData &&
    dayjs.unix(firstData.time).add(9, "hours").format("YYYY년 M월 D일");

  const renderData = useMemo(() => {
    if (latestData && firstData) {
      const price = latestData?.value - firstData?.value;
      const percent = price / firstData?.value;
      return {
        price: f("changePrice", latestData.value, price),
        percent: f("change", percent),
      };
    } else {
      return null;
    }
  }, [latestData, firstData]);

  const getTextColor = (targetPrice: number, currentPrice: number) => {
    if (targetPrice - currentPrice < 0) {
      return "#df5068";
    } else if (targetPrice - currentPrice > 0) {
      return "#448aef";
    } else {
      return "#6b7684";
    }
  };

  const [isCorret] = useAtom(isCorrectPage);

  return (
    <Container>
      {isCorret && renderData ? (
        <Line>
          <YesterDay>{option?.name}전보다</YesterDay>
          {renderData && (
            <Percent color={getTextColor(firstData.value, latestData.value)}>
              {renderData.percent}%
            </Percent>
          )}
          {renderData && (
            <Price color={getTextColor(firstData.value, latestData.value)}>
              ({renderData.price}원)
            </Price>
          )}
        </Line>
      ) : (
        <Loading width={40} height={15} />
      )}
      {isCorret && renderData ? (
        <Line>
          <StartDate>{startDate && `${startDate}부터`}</StartDate>
        </Line>
      ) : (
        <Loading width={30} height={13} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 55px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  margin-top: 20px;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

const YesterDay = styled.p`
  font-size: 15px;
  color: #6b7684;
  margin-right: 10px;
`;

const Price = styled.p<{ color: string }>`
  font-size: 15px;
  color: ${(props) => (props.color ? props.color : "black")};
  font-weight: 600;
  letter-spacing: -1px;
`;

const Percent = styled(Price)`
  margin-right: 7px;
`;

const StartDate = styled.p`
  font-size: 13px;
  letter-spacing: -0.5px;
  color: #6b7684;
`;

const Loading = styled.div<{ width: number; height: number }>`
  display: flex;
  align-items: center;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}%`};
  min-width: 130px;
  max-width: 250px;
  margin-bottom: 7px;
  border-radius: 5px;
  animation: ${skeletonLoading} 2s infinite;
`;

export default React.memo(ChartInfo);
