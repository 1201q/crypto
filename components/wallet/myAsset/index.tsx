import styled from "styled-components";
import AmountInfo from "./MyAssetInfo";
import MyAssetList from "./MyAssetList";

const MyAssetPage = () => {
  return (
    <Container>
      <AmountInfo />
      <MyAssetList />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: white;
  min-height: calc(100dvh - 50px - 50px);
`;

export default MyAssetPage;
