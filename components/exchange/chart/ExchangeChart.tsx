import styled from "styled-components";
import ChartController from "./ChartController";
import LineChart from "./LineChart";

const ExchangeChart = () => {
  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];

  const numDaysToAdd = 50;
  const lastDate = new Date(initialData[initialData.length - 1].time);
  const extendedData = Array.from({ length: numDaysToAdd }, (_, index) => {
    const currentDate = new Date(lastDate);
    currentDate.setDate(lastDate.getDate() + index + 1);

    const formattedDate = currentDate.toISOString().split("T")[0];
    const value = Math.random() * (40 - 20) + 20;

    return { time: formattedDate, value };
  });

  const resultData = initialData.concat(extendedData);
  return (
    <Container>
      <Chart>
        <LineChart data={resultData} />
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
  padding: 0px 21px;
`;

export default ExchangeChart;
