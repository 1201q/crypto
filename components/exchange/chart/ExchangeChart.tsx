import styled from "styled-components";
import ChartController from "./ChartController";
import LineChart from "./LineChart";
import { useAtom } from "jotai";
import { queryCodeAtom, selectTickerDataAtom } from "@/context/atoms";
import dayjs from "dayjs";
import { useMemo } from "react";

const ExchangeChart = () => {
  const [queryCode] = useAtom(queryCodeAtom);
  const [data] = useAtom(selectTickerDataAtom(queryCode));

  const getLatestData = useMemo(() => {
    return {
      value: data?.trade_price || 0,
      time: dayjs(data?.trade_timestamp).add(-9, "hour").unix(),
      open: data?.opening_price || 0,
      close: data?.trade_price || 0,
      high: data?.high_price || 0,
      low: data?.low_price || 0,
    };
  }, [data?.trade_price]);

  const latestData = getLatestData;

  return (
    <Container>
      <Chart>
        <LineChart latestData={latestData} />
      </Chart>
      <ChartController />
    </Container>
  );
};

const Container = styled.div`
  /* height: 380px; */
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Chart = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: none;
`;

export default ExchangeChart;
