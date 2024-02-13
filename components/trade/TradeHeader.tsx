import { tradeListHeaderHeightAtom } from "@/context/styles";
import { useAtom } from "jotai";
import styled from "styled-components";
import ExchangeHeader from "../shared/header/ExchangeHeader";
import Exchange from "@/public/exchange.svg";

import { tradeListVolumeDisplayModeAtom } from "@/context/atoms";

const TradeHeader = () => {
  const [height] = useAtom(tradeListHeaderHeightAtom);
  const [displayMode, setDisplayMode] = useAtom(tradeListVolumeDisplayModeAtom);

  return (
    <>
      <ExchangeHeader borderVisible={false} infoVisible={true} />
      <Container height={height}>
        <Header sort={"flex-start"}>체결시간</Header>
        <Header sort={"flex-end"}>체결가</Header>
        <Header
          sort={"flex-end"}
          onClick={() => setDisplayMode((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {displayMode ? "체결량" : "체결액"}
          <SvgBtn>
            <Exchange width={13} height={13} fill={"#6b7684"} />
          </SvgBtn>
        </Header>
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
  top: 50px;
`;

const Header = styled.div<{ sort: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.sort};
  font-size: 15px;
  font-weight: 500;
  color: #6b7684;
`;

const SvgBtn = styled.button`
  cursor: pointer;
  border-radius: 7px;
  padding: 0;
  border: none;
  background: none;
  margin-left: 5px;
  margin-top: 2px;
`;

export default TradeHeader;
