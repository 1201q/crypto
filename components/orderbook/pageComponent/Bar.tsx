import { orderbookSizeAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import styled from "styled-components";

interface PropsType {
  type: "ask" | "bid";
  size: number;
}

const Bar: React.FC<PropsType> = ({ type, size }) => {
  const [data] = useAtom(orderbookSizeAtom);

  const getWidth = useCallback(
    (type: string) => {
      const ratio = data.ask / data.bid;

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

  return <Container width={getWidth(type)} type={type}></Container>;
};

const Container = styled.div<{ type: string; width: string | number }>`
  position: absolute;
  width: ${(props) => (props.width ? `${props.width}%` : 0)};
  height: 32px;
  background-color: ${(props) =>
    props.type === "ask" ? "#d8e7fc" : "#ffe7e8"};
  opacity: 0.5;
  border-radius: 5px;
`;
export default React.memo(Bar);
