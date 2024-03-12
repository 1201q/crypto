import { useList } from "@/utils/hooks/useList";
import { useEffect, useRef, useState } from "react";
import { MarketListDataType } from "@/types/types";

const useSearchAndFilter = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { coinList } = useList();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    return () => {
      setSearchKeyword("");
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchKeyword(value);
  };

  const clearInput = () => {
    setSearchKeyword("");
  };

  const filteredCoins = coinList?.data.filter((coin: MarketListDataType) => {
    const keyword = searchKeyword
      .toLocaleUpperCase()
      .replace("KRW-", "")
      .trim();

    const { market, korean_name, english_name } = coin;
    const code = market.replace("KRW-", "");
    const eng = english_name.toLocaleUpperCase().replaceAll(" ", "");

    if (searchKeyword.length >= 1) {
      return (
        code.includes(keyword) ||
        eng.includes(keyword) ||
        korean_name.includes(keyword)
      );
    }
    return true;
  });

  return {
    inputRef,
    keyword: searchKeyword,
    onChange,
    clearInput,
    filteredCoins,
  };
};
export default useSearchAndFilter;
