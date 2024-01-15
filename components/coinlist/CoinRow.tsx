import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { SetStateAction } from "jotai/vanilla";
import { SetAtom, TickerDataType } from "@/utils/types/types";
import f from "@/utils/common/formatting";
import { coinListAtom, selectCodeAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import getKR from "@/utils/common/getKR";

interface RowProps {
  coin: TickerDataType;
}

const CoinRow: React.FC<RowProps> = ({ coin }) => {
  const router = useRouter();
  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [coinList] = useAtom(coinListAtom);

  return (
    <Row
      onClick={() => {
        setSelectCode(coin.code);
        router.push(`/exchange/${coin.code}`);
        console.log(coin);
      }}
      key={coin.code}
    >
      <div>
        <CoinName>{f("code", coin.code)}</CoinName>
        <CoinName>{getKR(coinList, coin.code)}</CoinName>
      </div>
      <div>{f("price", coin.trade_price)}</div>
      <div>{f("change", coin.signed_change_rate)}%</div>
      <div>{f("acc", coin.acc_trade_price_24h)}</div>
    </Row>
  );
};

const Row = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px;

  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const CoinName = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

export default React.memo(CoinRow);
