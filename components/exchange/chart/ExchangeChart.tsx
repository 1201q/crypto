import styled from "styled-components";
import ChartController from "./ChartController";
import LineChart from "./LineChart";
import { useAtom } from "jotai";
import { selectCodeAtom, selectedLineChartOptionAtom } from "@/context/atoms";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { CandleDataType } from "@/types/types";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const ExchangeChart = () => {
  const [option] = useAtom(selectedLineChartOptionAtom);
  const [selectCode] = useAtom(selectCodeAtom);

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const URL =
    option?.type === "minutes"
      ? `/api/bong/minutes?minutes=${option.unit}`
      : `/api/bong/${option?.type}`;

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `${URL}?market=${selectCode}&count=${option?.count}`
    );
    const data = res.data;
    const formatting = data.map((d: CandleDataType) => {
      return {
        time: dayjs(d.candle_date_time_kst).unix(),
        value: d.trade_price,
      };
    });
    const reverse = formatting.reverse();
    setChartData(reverse);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [option]);

  return (
    <Container>
      <Chart>
        {!isLoading && chartData.length > 0 ? (
          <LineChart data={chartData} />
        ) : (
          <Loading></Loading>
        )}
      </Chart>

      <ChartController />
    </Container>
  );
};

const Container = styled.header`
  height: 400px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
`;

const Loading = styled.div`
  height: 370px;
`;

export default ExchangeChart;
