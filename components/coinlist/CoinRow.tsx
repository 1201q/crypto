import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TickerDataType } from "@/utils/types/types";
import f from "@/utils/common/formatting";
import { coinListAtom, selectCodeAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import getKR from "@/utils/common/getKR";
import Image from "next/image";

interface RowProps {
  coin: TickerDataType;
}

const CoinRow: React.FC<RowProps> = ({ coin }) => {
  const router = useRouter();
  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [coinList] = useAtom(coinListAtom);

  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [bgColor, setBgcolor] = useState<string>("none");

  const getTextColor = (change: string) => {
    if (change === "RISE") {
      return "#E12343";
    } else if (change === "FALL") {
      return "#1763B6";
    } else if (change === "EVEN") {
      return "#9e9e9e";
    }
  };

  useEffect(() => {
    setIsRendered(true);
    setCurrentPrice(coin.trade_price);
  }, []);

  useEffect(() => {
    if (isRendered) {
      if (currentPrice !== coin.trade_price) {
        let askTimeout: NodeJS.Timeout;
        let bidTimeout: NodeJS.Timeout;

        if (coin.ask_bid === "ASK") {
          setBgcolor("#e6f1fc");
        } else if (coin.ask_bid === "BID") {
          setBgcolor("#fae7e7");
        }

        askTimeout = setTimeout(() => {
          setBgcolor("none");
        }, 200);
        bidTimeout = setTimeout(() => {
          setBgcolor("none");
        }, 200);
        setCurrentPrice((prev) => {
          if (prev !== coin.trade_price) {
            return coin.trade_price;
          }
          return prev;
        });
        return () => {
          clearTimeout(askTimeout);
          clearTimeout(bidTimeout);
        };
      }
    }
  }, [coin]);

  return (
    <Row
      isSelect={selectCode === coin.code}
      onClick={() => {
        setSelectCode(coin.code);
        router.push(`/exchange/${coin.code}`);
        console.log(coin);
      }}
      key={coin.code}
    >
      <RowContainer>
        <NameContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Image
              src={`https://static.upbit.com/logos/${f("code", coin.code)}.png`}
              alt={"logo"}
              width={13}
              height={13}
            />
            <NameText>{f("code", coin.code)}</NameText>
          </div>
          <KRNameText>{getKR(coinList, coin.code)}</KRNameText>
        </NameContainer>
        <ContentsContainer>
          <PriceUpdateDiv>
            <PriceText color={getTextColor(coin.change)}>
              {f("price", coin.trade_price)}
            </PriceText>
          </PriceUpdateDiv>
          <FlexDiv>
            <ChangeRateText color={getTextColor(coin.change)}>
              {f("change", coin.signed_change_rate)}%
            </ChangeRateText>
          </FlexDiv>
          <FlexDiv>
            <AccPriceText>{f("acc", coin.acc_trade_price_24h)}</AccPriceText>
            <MillionText>백만</MillionText>
          </FlexDiv>
        </ContentsContainer>
      </RowContainer>
    </Row>
  );
};

const Row = styled.li<{ isSelect: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  padding: 10px;
  background-color: ${(props) => (props.isSelect ? "#f5f5f5" : "none")};
  transition-duration: 0.5ms;

  :hover {
    background-color: ${(props) => (props.isSelect ? "#f5f5f5" : "#f5f5f5")};
    cursor: pointer;
  }
`;

const RowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameContainer = styled.div`
  width: 90px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 18fr 13fr 16fr;
  width: 220px;
  height: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PriceUpdateDiv = styled(FlexDiv)`
  height: 100%;
`;

// text
const Text = styled.p`
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;
const NameText = styled(Text)`
  font-size: 14px;
  font-weight: 800;
  margin-left: 6px;
  margin-bottom: 1px;
  letter-spacing: 0.5px;
`;
const KRNameText = styled.p`
  width: 100%;
  color: gray;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const PriceText = styled(Text)`
  font-size: 14px;
  letter-spacing: -0.2px;
  color: ${(props) => props.color};
  padding: 3px;
  border-radius: 2px;
`;
const ChangeRateText = styled(Text)`
  letter-spacing: 0.1px;
  color: ${(props) => props.color};
`;
const AccPriceText = styled(Text)`
  font-size: 12px;
  letter-spacing: -0.2px;
`;
const MillionText = styled.p`
  color: #9e9e9e;
  font-size: 11px;
  letter-spacing: -0.5px;
  margin-left: 0px;
  margin-top: 1px;
  text-align: right;
  font-weight: 500;
`;

export default React.memo(CoinRow);
