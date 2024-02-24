import { useAtom } from "jotai";
import styled from "styled-components";
import TradeRow from "./TradeRow";
// import { tradeDataAtom } from "@/context/fetch";
import { Virtuoso } from "react-virtuoso";
import { tradeDataAtom } from "@/context/websocket";

const TradeList = () => {
  const [data] = useAtom(tradeDataAtom);

  return (
    <Container>
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

const Container = styled.main`
  height: ${(props) => props.theme.height.tradeList};
  z-index: 0;
`;

export default TradeList;
