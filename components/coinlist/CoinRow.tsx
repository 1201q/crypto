import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TickerDataType } from "@/utils/types/types";
import f from "@/utils/common/formatting";
import { coinListAtom, selectCodeAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import getKR from "@/utils/common/getKR";
import Image from "next/image";
import { motion } from "framer-motion";

interface RowProps {
  coin: TickerDataType;
}

const CoinRow: React.FC<RowProps> = ({ coin }) => {
  const router = useRouter();
  const updateTimerRef = useRef<NodeJS.Timeout>();
  const [selectCode, setSelectCode] = useAtom(selectCodeAtom);
  const [coinList] = useAtom(coinListAtom);

  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isUpdated, setIsUpdated] = useState(false);

  const getUpdateDisplayBgColor = (change: string, isUpdated: boolean) => {
    if (change === "RISE") {
      return isUpdated ? "#85303E" : "#DF5068";
    } else if (change === "FALL") {
      return isUpdated ? "#28528F" : "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    }
  };

  useEffect(() => {
    setIsRendered(true);
    setCurrentPrice(coin.trade_price);

    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRendered) {
      // 처음 렌더가 되는 경우는 무시함.
      if (currentPrice !== coin.trade_price) {
        // price의 변화가 생긴경우
        if (updateTimerRef.current) {
          // 기존에 TIMER가 있다면 종료
          clearTimeout(updateTimerRef.current);
        }

        updateTimerRef.current = setTimeout(() => {
          setIsUpdated(false);
        }, 200);

        setIsUpdated(true);

        setCurrentPrice((prev) => {
          if (prev !== coin.trade_price) {
            return coin.trade_price;
          }
          return prev;
        });
      }
    }
  }, [coin]);

  return (
    <Row
      onClick={() => {
        setSelectCode(coin.code);
        router.push(`/exchange/${coin.code}`);
        console.log(coin);
      }}
      key={coin.code}
      initial={{ scale: 1, backgroundColor: "white" }}
      whileTap={{ scale: 0.99, backgroundColor: "#F9FAFB" }}
    >
      <CoinInfo>
        <CodeIcon>
          <Image
            src={`https://static.upbit.com/logos/${f("code", coin.code)}.png`}
            alt={"logo"}
            width={23}
            height={23}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </CodeIcon>
        <NameContainer>
          <KRnameText>{getKR(coinList, coin.code)}</KRnameText>
          <CodeText>{f("code", coin.code)}</CodeText>
        </NameContainer>
      </CoinInfo>
      <CoinPrice>
        <PercentDisplayBox
          bgcolor={getUpdateDisplayBgColor(coin.change, isUpdated)}
        >
          <PercentText>{f("change", coin.signed_change_rate)}%</PercentText>
        </PercentDisplayBox>
        <PriceText>{f("price", coin.trade_price)}</PriceText>
      </CoinPrice>
    </Row>
  );
};

const Row = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 47px;
  padding: 5px 20px 3px 20px;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 15px;
  white-space: break-spaces;

  @media screen and (max-width: 320px) {
    width: 95px;
  }
`;

const CoinPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 80px;
  margin-bottom: 2px;
`;

const PercentDisplayBox = styled.div<{
  bgcolor: string | undefined;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 22px;
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-radius: 4px;
  margin-bottom: 3px;

  transition-duration: 100ms;
`;

const CodeIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// text
const KRnameText = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 6px;
`;

const CodeText = styled.div`
  font-size: 12px;
  color: gray;
  margin-left: 1px;
`;

const PercentText = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-right: 5px;
`;

const PriceText = styled.div`
  width: 100%;
  font-size: 13px;
  color: gray;
  margin-right: 1px;
  text-align: end;
`;

export default React.memo(CoinRow);
