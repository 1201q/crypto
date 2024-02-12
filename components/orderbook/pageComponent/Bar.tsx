import { orderbookSizeAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";

interface PropsType {
  type: "ask" | "bid";
  size: number;
}

interface BarPropsType {
  type: "ask" | "bid";
  width: string | number;
}

const Bar: React.FC<PropsType> = ({ type, size }) => {
  const [data] = useAtom(orderbookSizeAtom);

  const getWidth = useCallback(
    (type: string) => {
      if (type === "ask") {
        const width = (size / data.sum) * 100;
        return width >= 100 ? 100 : width.toFixed(3);
      } else {
        const width = (size / data.sum) * 100;
        return width >= 100 ? 100 : width.toFixed(3);
      }
    },
    [data, size]
  );

  return <Container width={getWidth(type)} type={type} />;
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
  transition: width 0.2s ease-out;
`;

export default React.memo(Bar);
