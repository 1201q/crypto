import { allTickerDataAtom, coinListAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";
import CoinRow from "./CoinRow";
import React, { useEffect, useMemo } from "react";
import { sortOptionAtom } from "./atom/atom";
import { TickerDataType } from "@/utils/types/types";

interface CoinListProps {
  height: number;
}

const CoinList: React.FC<CoinListProps> = ({ height }) => {
  const [renderData] = useAtom(allTickerDataAtom);
  const [sort] = useAtom(sortOptionAtom);
  const [coinList] = useAtom(coinListAtom);

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
    <Container height={height}>
      {coinList.length === renderData.length ? (
        <Virtuoso
          data={sortedData}
          style={{ height: "100%" }}
          itemContent={(index, data) => <CoinRow coin={data} />}
          totalCount={coinList.length}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
};

const Container = styled.div<{ height: number }>`
  height: ${(props) => `calc(100% - ${props.height}px)`};
  background-color: white;
`;

export default React.memo(CoinList);
