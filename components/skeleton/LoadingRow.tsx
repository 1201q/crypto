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

const SkeletonRow = () => {
  return (
    <Container>
      <Flex>
        <CodeIcon />
        <NameContainer>
          <Name />
          <EnName />
        </NameContainer>
      </Flex>
      <Flex style={{ display: "flex", flexDirection: "column" }}>
        <PriceBox />
        <PriceText />
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  background-color: white;
  padding: 0px 20px;
`;

const Loading = styled.div`
  border-radius: 4px;
  animation: ${skeletonLoading} 2s infinite;
`;

const CodeIcon = styled(Loading)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Flex = styled.div`
  display: flex;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 34px;
  margin-left: 15px;
`;

const Name = styled(Loading)`
  width: 80px;
  height: 14px;

  @media screen and (max-width: 320px) {
    width: 65px;
  }
`;

const EnName = styled(Loading)`
  width: 40px;
  height: 14px;
`;

const PriceBox = styled(Loading)`
  width: 80px;
  height: 20px;
`;
const PriceText = styled(Loading)`
  height: 13px;
  margin-top: 5px;
`;

export default SkeletonRow;
