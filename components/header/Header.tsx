import styled from "styled-components";
import Search from "@/public/search.svg";
import { useAtom } from "jotai";
import { headerHeightAtom } from "@/utils/atoms/styles";

const Header = () => {
  const [height] = useAtom(headerHeightAtom);

  return (
    <Container height={height}>
      <Title></Title>
      <Search
        width={23}
        height={23}
        fill={"#b7bfc7"}
        style={{ cursor: "pointer", marginTop: "3px" }}
      />
    </Container>
  );
};

const Container = styled.header<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => `${props.height}px`};
  background-color: white;
  position: sticky;
  top: 0;
  padding: 0px 20px;
  z-index: 100;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 3px;
`;

export default Header;
