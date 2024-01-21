import styled from "styled-components";
import Back from "@/public/back.svg";
import X from "@/public/x.svg";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { searchInputValueAtom } from "@/context/atoms";
import { useRouter } from "next/router";

const SearchHeader = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useAtom(searchInputValueAtom);

  useEffect(() => {
    setKeyword("");
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  return (
    <Container>
      <Back
        width={26}
        height={26}
        fill={"#b7bfc7"}
        style={{
          cursor: "pointer",
          marginLeft: "-4px",
          marginRight: "10px",
          marginTop: "2px",
        }}
        onClick={() => {
          router.replace("/exchange");
        }}
      />
      <Input
        type="text"
        ref={inputRef}
        placeholder="가상자산을 검색해보세요"
        maxLength={20}
        value={keyword}
        onChange={onInputChange}
      />
      <X
        width={23}
        height={23}
        fill={"#b7bfc7"}
        style={{
          marginRight: "-2px",
          cursor: "pointer",
        }}
        onClick={() => {
          setKeyword("");
        }}
      />
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: white;
  padding: 0px 20px;
  border-bottom: 1px solid #f2f4f6;
  z-index: 100;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.5px;
  margin-bottom: 1px;
`;

export default SearchHeader;
