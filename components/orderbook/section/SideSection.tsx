import React from "react";
import OrderbookBox from "../orderbookBox/OrderbookBox";

interface SectionType {
  type: "sell" | "buy";
  top?: number;
  startIndex?: number;
}

const SideSection: React.FC<SectionType> = ({ type, startIndex = 0 }) => {
  const renderArray = Array(15).fill(null);

  return (
    <>
      {renderArray.map((d, index) => (
        <OrderbookBox
          key={`${type}-${index}`}
          type={type}
          dataIndex={index + startIndex}
        />
      ))}
    </>
  );
};

export default React.memo(SideSection);
