import Center from "../orderbookBox/CenterBox";
import React from "react";
import { Virtuoso } from "react-virtuoso";

interface SectionType {
  data: any[];
}

const CenterSection: React.FC<SectionType> = ({ data }) => {
  return (
    <Virtuoso
      data={data}
      useWindowScroll
      itemContent={(index, data) => <Center price={data} key={data} />}
      totalCount={data?.length}
      fixedItemHeight={42}
    />
  );
};

export default React.memo(CenterSection);
