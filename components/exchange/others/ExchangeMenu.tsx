import { motion } from "framer-motion";
import styled from "styled-components";

const ExchangeMenu = () => {
  return (
    <Container>
      <MenuContainer>
        <ExchangeBtn whileTap={{ backgroundColor: "#D9DBDD" }}>
          호가
        </ExchangeBtn>
        <Line />
        <ExchangeBtn whileTap={{ backgroundColor: "#D9DBDD" }}>
          거래내역
        </ExchangeBtn>
      </MenuContainer>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 6px;
  padding: 0px 20px;
  margin-top: 30px;
  height: 800px;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f4f6;
  height: 45px;
  border-radius: 10px;
`;

const Line = styled.div`
  background-color: lightgray;
  width: 1px;
  height: 25px;
`;

const ExchangeBtn = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #6b7684;
  height: 100%;
  border-radius: 10px;
`;

export default ExchangeMenu;
