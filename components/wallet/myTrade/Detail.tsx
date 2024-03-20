import Header from "@/components/auth/Header";
import { selectTradeDataAtom } from "@/context/wallet";
import f from "@/utils/common/formatting";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useMemo } from "react";
import styled from "styled-components";

const DetailPage = ({ id }: { id: string }) => {
  const { coinList } = useList();
  const data = useAtomValue(useMemo(() => selectTradeDataAtom(id), []));
  const isKrw = data?.side === "krw";

  const BlurURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

  const imageLink = `${process.env.NEXT_PUBLIC_LOGO_API_URL}${
    !isKrw ? f("code", data?.code) : "KRW"
  }.png`;

  return (
    <>
      <Header header="" />
      <Container>
        <HeaderContainer>
          <CodeIcon>
            <Image
              src={imageLink}
              alt={"logo"}
              width={22}
              height={22}
              placeholder="blur"
              blurDataURL={BlurURL}
            />
          </CodeIcon>
          <HeaderText>
            {isKrw ? "원화" : getKR(coinList.data, data?.code)}
          </HeaderText>
        </HeaderContainer>
        <PriceText>{f("fixedPrice", data?.total)}원</PriceText>
        <InfoContainer>
          {!isKrw && (
            <InfoItem>
              <InfoHeader>주문가격</InfoHeader>
              <InfoValue>{f("price", data?.price)}원</InfoValue>
            </InfoItem>
          )}
          {!isKrw && (
            <InfoItem>
              <InfoHeader>수량 ({f("code", data?.code)})</InfoHeader>
              <InfoValue>{f("decimal", data?.amount)}</InfoValue>
            </InfoItem>
          )}
          <InfoItem>
            <InfoHeader>거래일</InfoHeader>
            <InfoValue>
              {dayjs(data?.timestamp).format("YYYY년 M월 D일 H시 m분")}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoHeader>거래타입</InfoHeader>
            <InfoValue>
              {isKrw ? "원화입금" : data?.side === "buy" ? "매수" : "매도"}
            </InfoValue>
          </InfoItem>
          {!isKrw && (
            <InfoItem>
              <InfoHeader>거래유형</InfoHeader>
              <InfoValue>
                {data?.type === "market" ? "시장가" : "지정가"}
              </InfoValue>
            </InfoItem>
          )}
        </InfoContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 30px 22px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CodeIcon = styled.div`
  width: 22px;
  height: 22px;
  min-width: 22px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeaderText = styled.p`
  font-size: 21px;
  font-weight: 600;

  margin-left: 10px;
`;

const PriceText = styled.p`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -2px;
  margin-left: -1px;
  margin-right: 15px;
  margin-bottom: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 2px;
  margin-bottom: 30px;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.font.darkgray};

  margin-bottom: 5px;
`;

const InfoValue = styled.p`
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

export default DetailPage;
