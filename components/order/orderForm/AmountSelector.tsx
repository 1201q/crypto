import { orderAmountOptionsAtom } from "@/context/order";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";

const AmountSelector = ({ side }: { side: "buy" | "sell" }) => {
  const [options, setOptions] = useAtom(orderAmountOptionsAtom);
  const selectIndex = options.findIndex((o) => o.select);

  const handleOption = (option: any, index: number) => {
    if (option.select === true) {
      setOptions((prev) =>
        prev.map((o, i) => {
          if (i === index) {
            return { ...o, select: false };
          } else {
            return { ...o };
          }
        })
      );
    } else {
      setOptions((prev) =>
        prev.map((o, i) => {
          return { ...o, select: index === i };
        })
      );
    }
  };

  return (
    <Container>
      {options.map((option, currentIndex) => (
        <Option
          key={option.name}
          select={option.select}
          active={selectIndex !== -1 && currentIndex <= selectIndex}
          onClick={() => {
            handleOption(option, currentIndex);
          }}
        >
          <Bar
            active={selectIndex !== -1 && currentIndex <= selectIndex}
            bgcolor={side === "buy" ? "#df5068" : "#448aef"}
          />
          <Text select={option.select}>{option.name}</Text>
        </Option>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 7px;
  gap: 7px;
`;

const Option = styled.div<{ select: boolean; active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const Bar = styled.div<{ bgcolor: string; active: boolean }>`
  width: 100%;
  height: 6px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 10px;
  margin-bottom: 5px;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  margin-bottom: 30px;
`;

const Text = styled.p<{ select: boolean }>`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 600;
  color: ${(props) => (props.select ? "black" : "#e5e5e5")};
  position: absolute;
`;

export default React.memo(AmountSelector);
