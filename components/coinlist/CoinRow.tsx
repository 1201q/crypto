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
  index: number;
}

const CoinRow: React.FC<RowProps> = ({ index, coin }) => {
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

  return (
    <Row
      onClick={() => {
        setSelectCode(coin.code);
        router.push(`/exchange/${coin.code}`);
        console.log(coin);
      }}
      key={coin.code}
    >
      <LeftSide>
        <IndexNumber>{index + 1}</IndexNumber>
        <Flex>
          <CodeImage>
            <Image
              src={`https://static.upbit.com/logos/${f("code", coin.code)}.png`}
              alt={"logo"}
              width={23}
              height={23}
            />
          </CodeImage>
          <NameContainer>
            <KRnameText>{getKR(coinList, coin.code)}</KRnameText>
            <CodeText>{f("code", coin.code)}</CodeText>
          </NameContainer>
        </Flex>
      </LeftSide>

      <RightSide>
        <PriceContainer>
          <PercentText color={getTextColor(coin.change)}>
            {f("change", coin.signed_change_rate)}%
          </PercentText>

          <PriceText>{f("price", coin.trade_price)}</PriceText>
        </PriceContainer>
      </RightSide>
    </Row>
  );
};

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 10px 20px;
  transition-duration: 0.5ms;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const LeftSide = styled(Flex)``;
const RightSide = styled.div``;

const IndexNumber = styled.div`
  width: 24px;
  font-size: 16px;
  font-weight: 600;
  margin-right: 15px;
  text-align: center;
  color: #1b64da;
`;

const NameContainer = styled.div`
  margin-left: 15px;
`;
const PriceContainer = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
`;

const KRnameText = styled.p`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 6px;
`;
const CodeText = styled.p`
  font-size: 12px;
  color: gray;
  margin-left: 1px;
`;

const PercentText = styled(KRnameText)<{ color: string | undefined }>`
  font-size: 18px;
  color: ${(props) => (props.color ? props.color : "black")};
  letter-spacing: -0.2px;
`;

const CodeImage = styled.div`
  width: 34px;
  height: 34px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceText = styled.p`
  font-size: 13px;
  color: gray;
`;

export default React.memo(CoinRow);
