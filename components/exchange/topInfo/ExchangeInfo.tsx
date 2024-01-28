import {
  queryCodeAtom,
  selectCodeAtom,
  selectTickerDataAtom,
} from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";

import Price from "./Price";
import Name from "./Name";
import InfoBar from "./infoBar/InfoBar";

const ExchangeInfo = () => {
  const [selectCode] = useAtom(queryCodeAtom);
  const [data] = useAtom(selectTickerDataAtom(selectCode));

  return (
    <>
      <Container>
        {data && (
          <>
            <Name />
            <Price data={data} />
            <InfoBar data={data} />
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100px;
  padding: 10px 21px;
`;

export default React.memo(ExchangeInfo);
