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
  const FixedWidth = Number((100 - width[index]).toFixed(2)) || 0;

  return <Container width={FixedWidth} type={type} />;
};

const Container = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    transform:
      props.type === "bid"
        ? `translateX(-${props.width}%)`
        : `translateX(${props.width}%)`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) =>
    props.type === "ask" ? "#ebf3fd" : "#fff3f3"};
  position: absolute;
  height: 100%;
  border-radius: 5px;
  transition: transform 0.2s ease-out;
`;

export default React.memo(Bar);
