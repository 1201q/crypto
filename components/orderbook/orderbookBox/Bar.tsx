import { orderbookBarWidthAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";

interface PropsType {
  type: "sell" | "buy";
  index: number;
}

interface BarPropsType {
  type: "sell" | "buy";
  width: string | number;
}

const Bar: React.FC<PropsType> = ({ type, index }) => {
  const [width] = useAtom(orderbookBarWidthAtom);
  const dataIndex = type === "buy" ? index + 15 : index;
  const FixedWidth = Number((100 - width[dataIndex]).toFixed(2)) || 0;

  return <Container width={FixedWidth} type={type} />;
};

const Container = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    transform:
      props.type === "buy"
        ? `translateX(-${props.width}%)`
        : `translateX(${props.width}%)`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) =>
    props.type === "sell" ? "#ebf3fd" : "#fff3f3"};
  height: 32px;
  border-radius: 5px;
`;

export default React.memo(Bar);
