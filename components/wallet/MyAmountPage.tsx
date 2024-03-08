import styled from "styled-components";
import AmountInfo from "./amount/AmountInfo";

const MyAmountPage = () => {
  return (
    <Container>
      <AmountInfo />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  min-height: calc(100dvh - 50px - 50px);
`;

export default MyAmountPage;
