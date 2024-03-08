import styled from "styled-components";
import AmountInfo from "./myAsset/MyAssetInfo";
import MyAssetList from "./myAsset/MyAssetList";

const MyAmountPage = () => {
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

export default MyAmountPage;
