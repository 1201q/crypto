import { searchInputValueAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useSearchInput = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [keyword, setKeyword] = useAtom(searchInputValueAtom);

  useEffect(() => {
    return () => {
      setKeyword("");
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setKeyword(value);
  };

  const clearInput = () => {
    setKeyword("");
  };

  const redirectToMarket = () => {
    router.replace("/market");
  };

  return {
    inputRef,
    keyword,
    onChange,
    clearInput,
    redirectToMarket,
  };
};
export default useSearchInput;
