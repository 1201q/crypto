import { lineChartControllerOptionAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
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
    </Controller>
  );
};

const Controller = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  height: 40px;
`;

const SortBtn = styled(motion.button)<{ $isselect: boolean }>`
  height: 30px;
  border: none;
  padding: 0px 0px;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => (props.$isselect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.$isselect ? "#565656" : "white")};
  font-weight: ${(props) => (props.$isselect ? 700 : 500)};
`;

export default ChartController;
