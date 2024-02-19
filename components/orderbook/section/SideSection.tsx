import React, { useMemo } from "react";
import OrderbookBox from "../orderbookBox/OrderbookBox";
import { Virtuoso } from "react-virtuoso";
import { useAtomValue } from "jotai";
import { selectOrderbookUnitArrayAtom } from "@/context/deriveredAtoms";

interface SectionType {
  type: "sell" | "buy";
  top?: number;
  startIndex?: number;
}

const SideSection: React.FC<SectionType> = ({ type, top, startIndex = 0 }) => {
  // const render = useAtomValue(
  //   useMemo(() => selectOrderbookUnitArrayAtom(type), [type])
  // );
  const renderArray = Array(15).fill(null);

  return (
    <div>
      {renderArray.map((d, index) => (
        <OrderbookBox
          key={`${type}-${index}`}
          type={type}
          dataIndex={index + startIndex}
        />
      ))}
    </div>
  );
};

// {render && (
//   <Virtuoso
//     data={render}
//     style={{ height: "100%", width: "100%" }}
//     useWindowScroll
//     itemContent={(index, data) => (
//       <OrderbookBox key={`${type}-${index}`} type={type} index={index} />
//     )}
//     totalCount={render?.length}
//     fixedItemHeight={42}
//     increaseViewportBy={{ top: top || 0, bottom: 0 }}
//   />
// )}

export default React.memo(SideSection);
