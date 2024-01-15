import { allTickerDataAtom, selectCodeAtom } from "@/utils/atoms/atoms";
import { SetAtom } from "@/utils/types/types";
import { useAtom } from "jotai";
import { SetStateAction } from "jotai/vanilla";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import CoinRow from "./CoinRow";
import React from "react";

interface ListProps {
  count: number;
}

const CoinList: React.FC<ListProps> = ({ count }) => {
  const [renderData] = useAtom(allTickerDataAtom);

  return (
    <Container>
      <Virtuoso
        data={renderData}
        style={{ height: "100%" }}
        itemContent={(index, data) => <CoinRow coin={data} />}
        totalCount={count}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 350px;
  height: 700px;
  border: 1px solid black;
  margin: 10px;
`;

export default React.memo(CoinList);
