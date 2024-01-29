import styled from "styled-components";
import ChartController from "./ChartController";
import LineChart from "./LineChart";

const ExchangeChart = () => {
  return (
    <Container>
      <Chart>
        <LineChart />
      </Chart>
      <ChartController />
    </Container>
  );
};

const Container = styled.div`
  height: 380px;
  margin-top: 10px;
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
`;

export default ExchangeChart;
