import styled from "styled-components";
import OrderbookRow from "./orderbook/OrderbookRow";

const SmallOrderbook = () => {
  const renderArray = Array(30).fill(null);
  return (
    <Container>
      {renderArray.map((d, index) => (
        <OrderbookRow index={index} key={index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  border-right: 1px solid #f1f2f2;
  overflow-y: scroll;
`;

export default SmallOrderbook;
