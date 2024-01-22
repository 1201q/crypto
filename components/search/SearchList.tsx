import { searchInputValueAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import ResultRow from "./ResultRow";
import { Virtuoso } from "react-virtuoso";

import { MarketListDataType } from "@/types/types";
import { useList } from "@/utils/hooks/useList";

const SearchList = () => {
  const { coinList, isValidating } = useList();

  const [searchKeyword] = useAtom(searchInputValueAtom);

  const filteredCoins = coinList?.data.filter((coin: MarketListDataType) => {
    const keyword = searchKeyword
      .toLocaleUpperCase()
      .replace("KRW-", "")
      .trim();

    const { market, korean_name, english_name } = coin;
    const code = market.replace("KRW-", "");
    const eng = english_name.toLocaleUpperCase().replaceAll(" ", "");

    return (
      searchKeyword.length >= 1 &&
      (code.includes(keyword) ||
        eng.includes(keyword) ||
        korean_name.includes(keyword))
    );
  });

  return (
    <Container>
      <Virtuoso
        data={filteredCoins}
        useWindowScroll
        style={{ height: "100%" }}
        itemContent={(index, data) => (
          <ResultRow
            key={data.market}
            market={data.market}
            KRname={data.korean_name}
          />
        )}
        totalCount={filteredCoins?.length}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  padding-bottom: 20px;
`;

export default SearchList;
