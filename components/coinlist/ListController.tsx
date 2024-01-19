import { useAtom } from "jotai";
import styled from "styled-components";
import { sortOptionAtom } from "./atom/atom";
import { motion } from "framer-motion";
import {
  coinListControllerHeightAtom,
  headerHeightAtom,
} from "@/utils/atoms/styles";

const ListController = () => {
  const [sortOptions, setSortOptions] = useAtom(sortOptionAtom);
  const [height] = useAtom(coinListControllerHeightAtom);
  const [headerHeight] = useAtom(headerHeightAtom);
  return (
    <Container height={height} headerHeight={headerHeight}>
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
          $isselect={option.select}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {option.name}
        </SortBtn>
      ))}
    </Container>
  );
};

const Container = styled.div<{ height: number; headerHeight: number }>`
  position: sticky;
  top: ${(props) => `${props.headerHeight}px`};
  padding: 0px 20px;
  height: ${(props) => `${props.height}px`};
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const SortBtn = styled(motion.button)<{ $isselect: boolean }>`
  height: 32px;
  border: none;
  margin-right: 10px;
  padding: 0px 10px;
  border-radius: 6px;

  cursor: pointer;

  color: ${(props) => (props.$isselect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.$isselect ? "#565656" : "#f2f4f6")};
  font-weight: ${(props) => (props.$isselect ? 700 : 500)};
`;

export default ListController;
