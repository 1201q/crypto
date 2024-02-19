import { orderbookPriceArrayAtom } from "@/context/deriveredAtoms";
import Center from "../orderbookBox/CenterBox";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import { useAtom } from "jotai";

const CenterSection = () => {
  const [data] = useAtom(orderbookPriceArrayAtom);

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      itemContent={(index, price) => <Center index={index} key={price} />}
      totalCount={data?.length}
      fixedItemHeight={42}
      increaseViewportBy={{ top: 0, bottom: 0 }}
    />
  );
};

export default React.memo(CenterSection);
