import { IconBack } from "@/public/svgs";
import { useRouter } from "next/router";
import styled from "styled-components";

const Header = ({ header = "ALL UP!" }: { header?: string }) => {
  const router = useRouter();
  return (
    <Container>
      <IconBack
        width={26}
        height={26}
        fill={"black"}
        style={{
          cursor: "pointer",
          marginLeft: "-4px",
          marginRight: "10px",
          marginTop: "2px",
        }}
        onClick={() => {
          router.back();
        }}
      />
      <PageText>{header}</PageText>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => `${props.theme.height.header}px`};
  background-color: white;
  padding: 0px 20px;
  z-index: 200;
  border: none;
`;

const PageText = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 2px;
  margin-left: 6px;
`;

export default Header;
