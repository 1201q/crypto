import { selectOrderbookBarWidthAtom } from "@/context/deriveredAtoms";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
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
  const [width] = useAtom(
    useMemo(() => selectOrderbookBarWidthAtom(index), [index])
  );

  return <Container width={100 - width} type={type} />;
};

const Container = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    // transform:
    //   props.type === "buy"
    //     ? `translateX(-${props.width}%)`
    //     : `translateX(${props.width}%)`,
    width: `${props.width}%`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) =>
    props.type === "sell" ? "#ebf3fd" : "#fff3f3"};
  height: 32px;
  border-radius: 5px;
`;

export default React.memo(Bar);
