import { coinListAtom, searchInputValueAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import ResultRow from "./ResultRow";
import { Virtuoso } from "react-virtuoso";

const SearchResult = () => {
  const [coinList] = useAtom(coinListAtom);
  const [searchKeyword] = useAtom(searchInputValueAtom);

  const filteredCoins = coinList.filter((coin) => {
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
        totalCount={filteredCoins.length}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  padding-bottom: 20px;
`;

export default SearchResult;
