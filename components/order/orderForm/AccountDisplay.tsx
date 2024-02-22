import f from "@/utils/common/formatting";
import styled from "styled-components";

const AccountDisplay = () => {
  return (
    <Container>
      <Header>주문가능</Header>
      <OrderablePrice>{f("fixedPrice", 100231230)}원</OrderablePrice>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Header = styled.p`
  width: 60px;
  font-size: 15px;
  color: gray;
  letter-spacing: -0.3px;
  text-overflow: ellipsis;
`;

const OrderablePrice = styled.p`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export default AccountDisplay;
