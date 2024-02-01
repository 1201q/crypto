import styled from "styled-components";
import Info from "./Info";
import f from "@/utils/common/formatting";
import { TickerDataType } from "@/types/types";
import React from "react";

interface PropsType {
  data: TickerDataType;
}

const InfoBar: React.FC<PropsType> = ({ data }) => {
  const tradePrice = data.trade_price;
  const changePrice = data.signed_change_price;
  const change = data.change;
  const accSum = data.acc_trade_price_24h;

  const getTextColor = (change: string) => {
    if (change === "RISE") {
      return "#DF5068";
    } else if (change === "FALL") {
      return "#448AEF";
    } else if (change === "EVEN") {
      return "black";
    }
    return "black";
  };

  return (
    <Container>
      <Info
        header={"어제보다"}
        text={`${f("plus", change)}${f(
          "changePrice",
          tradePrice,
          changePrice
        )}`}
        color={getTextColor(change)}
      />
      <Info header={"거래대금"} text={`${f("acc", accSum)}백만`} />{" "}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 23px;
  background-color: #f2f4f6;
  border-radius: 5px;
  position: relative;

  @media screen and (max-width: 350px) {
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    height: auto;
    padding: 7px 0px;
  }
`;

export default React.memo(InfoBar);
