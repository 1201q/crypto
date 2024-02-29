import React from "react";
import styled from "styled-components";
import Bar from "./Bar";
import { usePrice } from "@/context/hooks";
import f from "@/utils/common/formatting";

const ExchangeDetail = () => {
  const low = usePrice("lp");
  const high = usePrice("hp");

  const low24 = usePrice("l52wp");
  const high24 = usePrice("h52wp");

  const accPrice = usePrice("atp24h");
  const accVolume = usePrice("atv24h");

  return (
    <Container>
      <Header>정보</Header>

      <HeaderText>1일 가격</HeaderText>
      <Bar low={low} high={high} />

      <HeaderText>1년 가격</HeaderText>
      <Bar low={low24} high={high24} />

      <InfoTable>
        <div>
          <InfoName>24시간 거래대금</InfoName>
          <InfoPrice>{`${f("KRW", accPrice)}원`}</InfoPrice>
        </div>
        <div>
          <InfoName>24시간 거래량</InfoName>
          <InfoPrice>{f("price", accVolume)}</InfoPrice>
        </div>
      </InfoTable>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: fit-content;
  padding: 30px 20px 25px 20px;
  position: relative;
`;

const Header = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
`;

const HeaderText = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
`;

const InfoTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-top: 15px;
  border-top: 0.5px solid #ededef;
`;

const InfoName = styled.p`
  font-size: 14px;
  color: gray;
  letter-spacing: -0.5px;
  margin-bottom: 7px;
`;
const InfoPrice = styled.p`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.7px;
  margin-bottom: 6px;
`;

const KRW = styled.p`
  color: ${(props) => props.theme.font.gray};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.4px;
`;

export default ExchangeDetail;
