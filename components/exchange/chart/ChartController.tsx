import { lineChartControllerOptionAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";

import styled from "styled-components";

const ChartController = () => {
  const [options, setOptions] = useAtom(lineChartControllerOptionAtom);

  return (
    <Controller>
      {options.map((option, index) => (
        <SortBtn
          key={option.name}
          onClick={() => {
            setOptions((prev) => {
              return prev.map((o, oi) => ({
                ...o,
                select: oi === index,
              }));
            });
          }}
          $isselect={option.select}
        >
          {option.name}
        </SortBtn>
      ))}
      <SortBtn $isselect={false}>차트</SortBtn>
    </Controller>
  );
};

const Controller = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 10px;
  margin-bottom: 25px;
  background-color: #f2f4f6;
  border-radius: 6px;
`;

const SortBtn = styled(motion.button)<{ $isselect: boolean }>`
  height: 33px;
  border: none;
  padding: 0px 0px;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => (props.$isselect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.$isselect ? "#565656" : "#f2f4f6")};
  font-weight: ${(props) => (props.$isselect ? 700 : 500)};
`;

export default React.memo(ChartController);
