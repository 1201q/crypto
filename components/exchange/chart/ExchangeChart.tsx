import styled from "styled-components";
import ChartController from "./ChartController";
import LineChart from "./LineChart";
import { useMemo } from "react";
import ChartInfo from "./ChartInfo";
import { useLatest } from "@/context/hooks";
import React from "react";
import { useLineChart } from "@/utils/hooks/useLineChart";
import { useAtom } from "jotai";
import getBongFetchURL from "@/utils/common/getBongFetchURL";
import { queryCodeAtom, selectedLineChartOptionAtom } from "@/context/atoms";

const ExchangeChart = () => {
  const data = useLatest();
  const [selectCode] = useAtom(queryCodeAtom);
  const [option] = useAtom(selectedLineChartOptionAtom);

  const URL = useMemo(
    () => getBongFetchURL(option, selectCode),
    [option, selectCode]
  );

  let { data: chartData, isValidating } = useLineChart(URL);
  const firstData = chartData && chartData[0];

  const latestData = useMemo(() => {
    return data;
  }, [data?.value]);

  return (
    <Container>
      <Chart>
        <LineChart
          latestData={latestData}
          chartData={chartData}
          isValidating={isValidating}
        />
      </Chart>
      <ChartInfo latestData={latestData} firstData={firstData} />
      <ChartController />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
  padding-top: 20px;
  background-color: white;
`;

const Chart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: none;
`;

export default React.memo(ExchangeChart);
