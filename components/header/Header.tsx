import styled from "styled-components";
import Search from "@/public/search.svg";

const Header = () => {
  return (
    <Container>
      <Search
        width={23}
        height={23}
        fill={"#b7bfc7"}
        style={{ cursor: "pointer", marginTop: "10px" }}
      />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  padding: 0px 20px;
  z-index: 100;
`;

export default Header;
