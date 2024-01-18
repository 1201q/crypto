import styled from "styled-components";

const Header = () => {
  return <Container>1</Container>;
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  background-color: white;
  position: sticky;
  top: 0;
  padding: 0px 20px;
  z-index: 100;
`;

export default Header;
