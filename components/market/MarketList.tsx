import { allTickerDataAtom, sortedAllTickerDataAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import React from "react";

import { useList } from "@/utils/hooks/useList";
import CoinRow from "../shared/coinListRow/CoinRow";
import SkeletonRow from "../skeleton/LoadingRow";

const MarketList = () => {
  const { coinList } = useList();

  const [data] = useAtom(sortedAllTickerDataAtom);
  const [d] = useAtom(allTickerDataAtom);

  return (
    <Container>
      {coinList?.code.length === data.length ? (
        <Virtuoso
          data={data}
          useWindowScroll
          itemContent={(index, data) => (
            <CoinRow key={data.cd} code={data.cd} tickerData={data} />
          )}
          totalCount={coinList?.code.length}
          fixedItemHeight={55}
        />
      ) : (
        <Virtuoso
          data={coinList?.code}
          useWindowScroll
          itemContent={(index) => <SkeletonRow key={index} />}
          totalCount={coinList?.code.length}
          fixedItemHeight={55}
        />
      )}
    </Container>
  );
};

const Container = styled.main`
  min-height: calc(100dvh - 150px);
  background-color: white;
`;

export default MarketList;
