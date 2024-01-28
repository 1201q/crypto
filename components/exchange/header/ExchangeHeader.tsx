import styled from "styled-components";
import Back from "@/public/back.svg";
import { useRouter } from "next/router";

const ExchangeHeader = () => {
  const router = useRouter();

  return (
    <Container>
      <Back
        width={26}
        height={26}
        fill={"#b7bfc7"}
        style={{
          cursor: "pointer",
          marginLeft: "-4px",
          marginRight: "10px",
          marginTop: "2px",
        }}
        onClick={() => {
          router.replace("/market");
        }}
      />
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: white;
  padding: 0px 20px;

  z-index: 100;
`;

export default ExchangeHeader;
