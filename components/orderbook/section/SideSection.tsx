import React from "react";
import OrderbookBox from "../orderbookBox/OrderbookBox";
import { Virtuoso } from "react-virtuoso";

interface SectionType {
  type: "sell" | "buy";
  data: any[];
}

const SideSection: React.FC<SectionType> = ({ type, data }) => {
  return (
    <Virtuoso
      data={data}
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
    />
  );
};

export default React.memo(SideSection);
