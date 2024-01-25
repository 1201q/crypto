import { motion } from "framer-motion";
import styled from "styled-components";

const ChartController = () => {
  return (
    <Controller>
      <SortBtn $isselect={true}>1일</SortBtn>
      <SortBtn $isselect={false}>1주</SortBtn>
      <SortBtn $isselect={false}>1달</SortBtn>
      <SortBtn $isselect={false}>3달</SortBtn>
      <SortBtn $isselect={false}>1년</SortBtn>
    </Controller>
  );
};

const Controller = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  height: 34px;
  padding: 0px 21px;
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
