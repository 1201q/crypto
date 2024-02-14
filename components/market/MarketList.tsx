import { allTickerDataAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import React, { useMemo } from "react";
import { sortOptionAtom } from "@/context/atoms";
import { TickerDataType } from "@/types/types";

import { useList } from "@/utils/hooks/useList";
import CoinRow from "../shared/coinListRow/CoinRow";
import SkeletonRow from "../skeleton/LoadingRow";

const MarketList = () => {
  const { coinList } = useList();
  const [renderData] = useAtom(allTickerDataAtom);
  const [sort] = useAtom(sortOptionAtom);

  const sortedData: TickerDataType[] = useMemo(() => {
    return [...renderData]?.sort((a, b) => {
      const option = sort.find((option) => option.select)?.en;
      if (option === "acc") {
        return b.acc_trade_price_24h - a.acc_trade_price_24h;
      } else if (option === "up") {
        return b.signed_change_rate - a.signed_change_rate;
      } else if (option === "down") {
        return a.signed_change_rate - b.signed_change_rate;
      }
      return 0;
    });
  }, [renderData, sort]);

  return (
    <Container>
      {coinList?.code.length === renderData.length ? (
        <Virtuoso
          data={sortedData}
          useWindowScroll
          itemContent={(index, data) => (
            <CoinRow key={data.code} code={data.code} tickerData={data} />
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
