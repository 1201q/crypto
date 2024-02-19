import { tradeListHeightAtom } from "@/context/styles";
import { useAtom } from "jotai";
import styled from "styled-components";
import TradeRow from "./TradeRow";
import { tradeDataAtom } from "@/context/atoms";
import { Virtuoso } from "react-virtuoso";

const TradeList = () => {
  const [height] = useAtom(tradeListHeightAtom);
  const [data] = useAtom(tradeDataAtom);

  return (
    <Container height={height}>
      <Virtuoso
        data={data}
        useWindowScroll
        style={{ height: "100%" }}
        itemContent={(index, data) => (
          <TradeRow
            timestamp={data.tms}
            price={data.tp}
            volume={data.tv}
            change={data.c}
            askOrBid={data.ab}
            key={data.sid}
          />
        )}
        totalCount={data.length}
        fixedItemHeight={46}
      />
    </Container>
  );
};

const Container = styled.main<{ height: string }>`
  height: ${(props) => props.height};
  z-index: 0;
`;

export default TradeList;
