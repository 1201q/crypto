import { tradeListHeaderHeightAtom } from "@/context/styles";
import { useAtom } from "jotai";
import styled from "styled-components";
import ExchangeHeader from "../exchange/header/ExchangeHeader";

const TradeHeader = () => {
  const [height] = useAtom(tradeListHeaderHeightAtom);
  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Container height={height}>
        <Header sort={"flex-start"}>체결시간</Header>
        <Header sort={"flex-end"}>체결가</Header>
        <Header sort={"flex-end"}>체결량</Header>
      </Container>
    </>
  );
};

const Container = styled.header<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  background-color: white;
  border-bottom: 1px solid #f1f2f2;
  padding: 0px 21px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  z-index: 100;
  position: sticky;
  top: 51px;
`;

const Header = styled.div<{ sort: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.sort};
  font-size: 15px;
  font-weight: 500;
  color: #6b7684;
`;

export default TradeHeader;
