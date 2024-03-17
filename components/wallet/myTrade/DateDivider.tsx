import styled from "styled-components";

const DateDivider = () => {
  return <Container>3월 15일</Container>;
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
  margin: 1px 0px;
`;
export default DateDivider;
