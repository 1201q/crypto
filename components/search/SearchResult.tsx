import { coinListAtom, searchInputValueAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";
import ResultRow from "./ResultRow";

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
      code.includes(keyword) ||
      eng.includes(keyword) ||
      korean_name.includes(keyword)
    );
  });

  return (
    <Container>
      {filteredCoins.map((coin) => (
        <ResultRow
          key={coin.market}
          market={coin.market}
          KRname={coin.korean_name}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
`;

export default SearchResult;
