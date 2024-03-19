import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import styled from "styled-components";

dayjs.extend(isToday);

const DateDivider = ({ date }: { date: string }) => {
  return (
    <Container>
      {dayjs(date).isToday() ? "오늘" : dayjs(date).format("M월 D일")}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.bg.default};
  padding-left: 21px;
  font-size: 14px;
  color: ${(props) => props.theme.font.darkgray};
  letter-spacing: -0.5px;
  margin: 0px 0px;
`;
export default DateDivider;
