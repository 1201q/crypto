import React from "react";
import OrderbookBox from "../orderbookBox/OrderbookBox";
import { Virtuoso } from "react-virtuoso";

interface SectionType {
  type: "sell" | "buy";
  data: any[];
  top?: number;
}

const SideSection: React.FC<SectionType> = ({ type, data, top }) => {
  return (
    <Virtuoso
      data={data}
      style={{ height: "100%", width: "100%" }}
      useWindowScroll
      itemContent={(index, data) => (
        <OrderbookBox
          type={type}
          index={index}
          price={data.price}
          size={data.size}
        />
      )}
      totalCount={data?.length}
      fixedItemHeight={42}
      increaseViewportBy={{ top: top || 0, bottom: 0 }}
    />
  );
};

export default React.memo(SideSection);
