import styled from "styled-components";

import Back from "@/public/back.svg";
const Header = () => {
  return <Container></Container>;
};

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 54px;
  background-color: white;
  position: sticky;
  top: 0;
  padding: 0px 10px;
  z-index: 100;
`;

export default Header;
