import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";
import f from "@/utils/common/formatting";

const MyAssetItem = () => {
  const BlurURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

  const getUpdateDisplayBgColor = (change: string | undefined) => {
    if (change === "RISE") {
      return "#DF5068";
    } else if (change === "FALL") {
      return "#448AEF";
    } else if (change === "EVEN") {
      return "#B1B1B1";
    } else {
      return "#B1B1B1";
    }
  };
  return (
    <Container
      initial={{ backgroundColor: "white" }}
      whileTap={{ backgroundColor: "#f2f4f6" }}
    >
      <HeaderContainer>
        <CodeIcon>
          <Image
            src={`${process.env.NEXT_PUBLIC_LOGO_API_URL}${f(
              "code",
              "KRW-BTC"
            )}.png`}
            alt={"logo"}
            width={18}
            height={18}
            placeholder="blur"
            blurDataURL={BlurURL}
          />
        </CodeIcon>
        <KRnameText>{"스테이터스네트워크토큰"}</KRnameText>
        <Update bgcolor={getUpdateDisplayBgColor("RISE")}>
          <PercentText>{f("change", 2)}%</PercentText>
        </Update>
      </HeaderContainer>
      <InfoContainer>
        <DetailInfoBox>
          <InfoHeaderText>평단가</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
        <DetailInfoBox>
          <InfoHeaderText>평가손익</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
        <DetailInfoBox>
          <InfoHeaderText>보유수량</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
        <DetailInfoBox>
          <InfoHeaderText>평가금액</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
      </InfoContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100px;
  padding: 12px 20px 3px 20px;
  position: relative;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 7px;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 10px;
`;

const CodeIcon = styled.div`
  width: 18px;
  height: 18px;
  background-color: #f2f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// text
const KRnameText = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-left: 10px;
`;

const PercentText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const Update = styled.div<{ bgcolor: string }>`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 20px;
  border-radius: 5px;
  padding: 0px 6px;

  transition: background-color 0.1s ease-out;
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : props.theme.bg.gray};
`;

const DetailInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InfoHeaderText = styled.p`
  color: ${(props) => props.theme.font.gray};

  font-weight: 500;
  font-size: 14px;
`;
const InfoText = styled.p`
  color: ${(props) => props.theme.font.darkgray};
  font-weight: 500;
  font-size: 14px;
`;
export default MyAssetItem;
