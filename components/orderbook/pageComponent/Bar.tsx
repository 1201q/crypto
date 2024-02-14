import { orderbookBarWidthAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";

interface PropsType {
  type: "ask" | "bid";
  index: number;
}

interface BarPropsType {
  type: "ask" | "bid";
  width: string | number;
}

const Bar: React.FC<PropsType> = ({ type, index }) => {
  const [width] = useAtom(orderbookBarWidthAtom);
  const FixedWidth = width[index]?.toFixed(2) || 0;

  return <Container width={FixedWidth} type={type} />;
};

const Container = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))<BarPropsType>`
  background-color: ${(props) =>
    props.type === "ask" ? "#d8e7fc" : "#ffe7e8"};
  position: absolute;
  height: 32px;
  opacity: 0.5;
  border-radius: 5px;
`;

export default React.memo(Bar);
