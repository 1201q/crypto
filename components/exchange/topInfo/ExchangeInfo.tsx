import React from "react";
import styled from "styled-components";

import Price from "./Price";
import Name from "./Name";
import InfoBar from "./InfoBar";
import { usePrice } from "@/context/hooks";

const ExchangeInfo = () => {
  const price = usePrice();

  return (
    <Container>
      {price && (
        <>
          <Name />
          <Price />
          <InfoBar />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  padding: 10px 21px 0px 21px;
`;

export default React.memo(ExchangeInfo);
