import { useAtom } from "jotai";
import styled from "styled-components";
import { sortOptionAtom } from "./atom/atom";

const ListController = () => {
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  return (
    <Container>
      {sortOptions.map((option, index) => (
        <SortBtn
          onClick={() => {
            setSortOptions((prev) => {
              return prev.map((o, oi) => ({
                ...o,
                select: oi === index,
              }));
            });
          }}
          key={option.name}
          isSelect={option.select}
        >
          {option.name}
        </SortBtn>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  height: 45px;
  background-color: white;
`;

const SortBtn = styled.button<{ isSelect: boolean }>`
  height: 32px;
  border: none;
  margin-right: 10px;
  padding: 0px 10px;
  border-radius: 6px;

  cursor: pointer;

  color: ${(props) => (props.isSelect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.isSelect ? "#565656" : "#f2f4f6")};
  font-weight: ${(props) => (props.isSelect ? 700 : 500)};
`;

export default ListController;
