import styled from "styled-components";
import Search from "@/public/search.svg";
import { useAtom } from "jotai";
import { headerHeightAtom } from "@/utils/atoms/styles";
import Image from "next/image";

const Header = () => {
  const [height] = useAtom(headerHeightAtom);

  return (
    <Container height={height}>
      <Title>
        <Image
          src={require("@/public/logo.png")}
          alt={"logo"}
          width={36}
          height={25}
        />
      </Title>
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

const Title = styled.div`
  margin-top: 5px;
  margin-left: -3px;
`;

export default Header;
