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

const LoadingExchangeInfo = () => {
  return (
    <Container>
      <Name />
      <Price />
      <InfoBar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const Loading = styled.div`
  border-radius: 4px;
  animation: ${skeletonLoading} 2s infinite;
`;

const Name = styled(Loading)`
  width: 140px;
  height: 21px;
  margin-bottom: 5px;
`;

const Price = styled(Loading)`
  width: 190px;
  margin-bottom: 15px;
  height: 33px;
`;

const InfoBar = styled(Loading)`
  width: 100%;
  min-height: 23px;
  background-color: #f2f4f6;
`;

export default LoadingExchangeInfo;
