import { allTickerDataAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import CoinRow from "./CoinRow";
import React from "react";

interface CoinListProps {
  height: number;
}

const CoinList: React.FC<CoinListProps> = ({ height }) => {
  const [renderData] = useAtom(allTickerDataAtom);

  return (
    <Container height={height}>
      <Virtuoso
        data={renderData}
        style={{ height: "100%" }}
        itemContent={(index, data) => <CoinRow coin={data} />}
        totalCount={renderData.length}
      />
    </Container>
  );
};

const Container = styled.div<{ height: number }>`
  height: ${(props) => `calc(100% - ${props.height}px)`};
  background-color: white;
`;

export default React.memo(CoinList);
