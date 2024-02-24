import styled from "styled-components";
import Back from "@/public/back.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { useAtom } from "jotai";
import { queryCodeAtom } from "@/context/atoms";
import getKR from "@/utils/common/getKR";
import { useList } from "@/utils/hooks/useList";
import { usePrice } from "@/context/hooks";
import { motion } from "framer-motion";
import f from "@/utils/common/formatting";
import React from "react";

interface HeaderProps {
  borderVisible?: boolean;
  infoVisible?: boolean;
}

const ExchangeHeader: React.FC<HeaderProps> = ({
  borderVisible,
  infoVisible,
}) => {
  const router = useRouter();
  const [queryCode] = useAtom(queryCodeAtom);
  const { coinList } = useList();

  const price = usePrice("tp");
  const changePercent = usePrice("scr");

  const change = usePrice("c");

  const [isInfoVisible, setIsInfoVisible] = useState(infoVisible || false);
  const [headerBorderVisible, setHeaderBorderVisible] = useState(
    borderVisible || false
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      setHeaderBorderVisible(false);
      setIsInfoVisible(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    const borderFixed = borderVisible !== undefined;

    if (borderFixed || infoVisible) {
      borderVisible && setHeaderBorderVisible(borderVisible);
      infoVisible && setIsInfoVisible(infoVisible);
    } else {
      if (scrollY > 100) {
        setIsInfoVisible(true);
        setHeaderBorderVisible(true);
      } else {
        setIsInfoVisible(false);
        setHeaderBorderVisible(false);
      }
    }
  }, 100);

  const getTextColor = (change: string | undefined) => {
    if (change === "RISE") {
      return "#df5068";
    } else if (change === "FALL") {
      return "#448aef";
    }
    return "#6b7684";
  };

  return (
    <Container border={headerBorderVisible}>
      <Back
        width={26}
        height={26}
        fill={"#b7bfc7"}
        style={{
          cursor: "pointer",
          marginLeft: "-4px",
          marginRight: "10px",
          marginTop: "2px",
        }}
        onClick={() => {
          router.back();
        }}
      />
      {isInfoVisible && (
        <InfoContainer animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <Name>{getKR(coinList.data, queryCode)}</Name>
          <Info color={getTextColor(change)}>
            <Price>{f("price", price)}원</Price>
            <Price>{f("change", changePercent)}%</Price>
          </Info>
        </InfoContainer>
      )}
    </Container>
  );
};

const Container = styled.header<{ border: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => `${props.theme.height.header}px`};
  background-color: white;
  padding: 0px 20px;
  z-index: 200;
  border-bottom: ${(props) => (props.border ? `1px solid #f1f2f2` : "none")};
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Name = styled(motion.p)`
  font-size: 13px;
  font-weight: 600;
  margin-left: 0.5px;
`;
const Price = styled.p`
  font-size: 13px;
  margin-right: 5px;
  letter-spacing: -0.4px;
`;

const Info = styled.div<{ color: string }>`
  display: flex;
  margin-top: 3px;
  color: ${(props) => props.color};
`;

export default React.memo(ExchangeHeader);
