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
        itemContent={(index, data) => <CoinRow coin={data} index={index} />}
        totalCount={count}
      />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100% - 54px);
  background-color: white;
`;

export default React.memo(CoinList);
