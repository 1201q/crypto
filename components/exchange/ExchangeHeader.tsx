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
  /* border-bottom: 1px solid #f2f4f6; */
  z-index: 100;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.5px;
  margin-bottom: 1px;
`;

export default ExchangeHeader;
