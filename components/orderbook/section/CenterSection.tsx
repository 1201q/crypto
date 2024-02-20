import Center from "../orderbookBox/CenterBox";
import React from "react";

const CenterSection = () => {
  const renderArray = Array(30).fill(null);

  return (
    <>
      {renderArray?.map((price, index) => (
        <Center index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(CenterSection);
