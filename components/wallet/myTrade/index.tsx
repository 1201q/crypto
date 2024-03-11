import styled from "styled-components";
import MyTradeList from "./MyTradeList";

const MyTradePage = () => {
  return (
    <Container>
      <MyTradeList />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: white;
  min-height: calc(100dvh - 50px - 50px);
`;

export default MyTradePage;
