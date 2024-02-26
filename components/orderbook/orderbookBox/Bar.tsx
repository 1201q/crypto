import { useOrderbook } from "@/context/hooks";
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
  const width = useOrderbook("width", index);

  return <Container width={width} type={type} />;
};

const Container = styled.div.attrs<BarPropsType>((props) => ({
  style: {
    width: `${props.width}%`,
    // transform:
    //   props.type === "buy"
    //     ? `translateX(-${props.width}%)`
    //     : `translateX(${props.width}%)`,
  },
}))<BarPropsType>`
  width: 100%;
  background-color: ${(props) =>
    props.type === "sell" ? "#ebf3fd" : "#fff3f3"};
  height: 32px;
  border-radius: 5px;
`;

export default React.memo(Bar);
