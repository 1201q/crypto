import styled from "styled-components";
import f from "@/utils/common/formatting";
import React, { memo } from "react";
import { usePrice } from "@/context/hooks";

const InfoBar = () => {
  const ChangePriceInfo = memo(() => {
    const price = usePrice("tp") || 0;
    const change = usePrice("c");
    const changePrice = usePrice("scp") || 0;

    const getTextColor = (change: string | undefined) => {
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
      <InfoContainer>
        <InfoHeader>어제보다</InfoHeader>
        <Text color={getTextColor(change)}>{`${f("plus", change)}${f(
          "changePrice",
          price,
          changePrice
        )}원`}</Text>
      </InfoContainer>
    );
  });

  const AccPriceSumInfo = memo(() => {
    const accSum = usePrice("atp24h");
    return (
      <InfoContainer>
        <InfoHeader>거래대금</InfoHeader>
        <Text>{`${f("acc", accSum)}백만`}</Text>
      </InfoContainer>
    );
  });

  return (
    <Container>
      <ChangePriceInfo />
      <AccPriceSumInfo />
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

const InfoContainer = styled.div`
  display: flex;
  height: 14px;
  margin-right: 15px;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6b7684;
  border-right: 1px solid #6b7684;
  padding-left: 7px;
  padding-right: 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Text = styled.p<{ color?: string }>`
  display: flex;
  font-size: 13px;
  align-items: center;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-left: 7px;
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default React.memo(InfoBar);
