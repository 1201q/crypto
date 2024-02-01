import { queryCodeAtom, selectedLineChartOptionAtom } from "@/context/atoms";
import { LineChartPropsType } from "@/types/types";
import f from "@/utils/common/formatting";
import getBongFetchURL from "@/utils/common/getBongFetchURL";
import { useLineChart } from "@/utils/hooks/useLineChart";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useMemo } from "react";
import styled from "styled-components";

interface PropsType {
  latestData: LineChartPropsType;
}

const ChartInfo: React.FC<PropsType> = ({ latestData }) => {
  const [selectCode] = useAtom(queryCodeAtom);
  const [option] = useAtom(selectedLineChartOptionAtom);
  const URL = useMemo(
    () => getBongFetchURL(option, selectCode),
    [option, selectCode]
  );

  let { data: chartData, isValidating } = useLineChart(URL);
  const firstData = chartData && chartData[0];
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

  return (
    <Container>
      <Line>
        <YesterDay>{option.name}전보다</YesterDay>
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
      <Line>
        <StartDate>{startDate && `${startDate}부터`}</StartDate>
      </Line>
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
`;

const Percent = styled(Price)`
  margin-right: 7px;
`;

const StartDate = styled.p`
  font-size: 13px;
  letter-spacing: -0.5px;
  color: #6b7684;
`;

export default ChartInfo;
