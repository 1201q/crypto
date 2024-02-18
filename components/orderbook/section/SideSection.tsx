import React from "react";
import OrderbookBox from "../orderbookBox/OrderbookBox";
import { Virtuoso } from "react-virtuoso";

interface SectionType {
  type: "sell" | "buy";
  top?: number;
}

const RenderArrayLength = 15;

const SideSection: React.FC<SectionType> = ({ type, top }) => {
  const render = Array(RenderArrayLength);

  return (
    <Virtuoso
      data={render}
      style={{ height: "100%", width: "100%" }}
      useWindowScroll
      itemContent={(index, data) => (
        <OrderbookBox
          key={`${type}-${index}`}
          type={type}
          index={type === "buy" ? index + RenderArrayLength : index}
        />
      )}
      totalCount={render?.length}
      fixedItemHeight={42}
      increaseViewportBy={{ top: top || 0, bottom: 0 }}
    />
  );
};

export default React.memo(SideSection);
