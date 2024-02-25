import React, { useEffect } from "react";
import styled from "styled-components";
import Price from "./Price";
import Name from "./Name";
import InfoBar from "./InfoBar";

import LoadingExchangeInfo from "@/components/skeleton/LoadingExchangeInfo";
import { useAtomValue } from "jotai";

import { isCorrectPage } from "@/context/atoms";

const ExchangeInfo = () => {
  const correct = useAtomValue(isCorrectPage);

  return (
    <Container>
      {correct ? (
        <>
          <Name />
          <Price />
          <InfoBar />
        </>
      ) : (
        <LoadingExchangeInfo />
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  padding: 10px 21px 0px 21px;
  background-color: white;
`;

export default React.memo(ExchangeInfo);
