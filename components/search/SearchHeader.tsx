import styled from "styled-components";
import { IconBack, IconX } from "@/public/svgs";
import useSearchInput from "./hooks/useSearchInput";

const SearchHeader = () => {
  const { inputRef, keyword, onChange, redirectToMarket, clearInput } =
    useSearchInput();

  return (
    <Container>
      <IconBack
        width={26}
        height={26}
        fill={"#b7bfc7"}
        style={{
          cursor: "pointer",
          marginLeft: "-4px",
          marginRight: "10px",
          marginTop: "2px",
        }}
        onClick={redirectToMarket}
      />
      <Input
        type="text"
        ref={inputRef}
        placeholder="가상자산을 검색해보세요"
        maxLength={20}
        value={keyword}
        onChange={onChange}
      />
      <IconX
        width={23}
        height={23}
        fill={"#b7bfc7"}
        style={{
          marginRight: "-2px",
          cursor: "pointer",
        }}
        onClick={clearInput}
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
