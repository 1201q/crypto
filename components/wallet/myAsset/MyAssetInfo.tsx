import SectionLine from "@/components/exchange/others/SectionLine";
import f from "@/utils/common/formatting";
import { motion } from "framer-motion";
import styled from "styled-components";

const AmountInfo = () => {
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
    <Container>
      <MyAmountContainer>
        <HeaderText>총 보유 자산</HeaderText>
        <Flex>
          <AllAmountText>{f("fixedPrice", 2022000)} </AllAmountText>
          <Update bgcolor={getUpdateDisplayBgColor("RISE")}>
            <PercentText>{f("change", 2)}%</PercentText>
          </Update>
          <KrwDepositBtn initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
            원화입금
          </KrwDepositBtn>
        </Flex>
      </MyAmountContainer>
      <PortfolioContainer>
        <HeaderText>포토폴리오 요약</HeaderText>
        <Bar />
      </PortfolioContainer>
      <PortfolioBtnContainer>
        <PortfolioBtn
          initial={{ scale: 1, backgroundColor: "white" }}
          whileTap={{ scale: 0.98, backgroundColor: "#f2f4f6" }}
        >
          <Flex>
            <Color />
            <BarHeaderText>원화</BarHeaderText>
          </Flex>
          <PortfolioBtnText>10000000</PortfolioBtnText>
        </PortfolioBtn>
        <PortfolioBtn
          initial={{ scale: 1, backgroundColor: "white" }}
          whileTap={{ scale: 0.98, backgroundColor: "#f2f4f6" }}
        >
          <Flex>
            <Color />
            <BarHeaderText>가상자산</BarHeaderText>
          </Flex>
          <PortfolioBtnText>10000000</PortfolioBtnText>
        </PortfolioBtn>
      </PortfolioBtnContainer>
      <DetailInfoContainer>
        <DetailInfoBox>
          <InfoHeaderText>수익률</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
        <DetailInfoBox>
          <InfoHeaderText>평가손익</InfoHeaderText>
          <InfoText>10000000</InfoText>
        </DetailInfoBox>
      </DetailInfoContainer>
      <SectionLine />
    </Container>
  );
};

const Container = styled.div``;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const MyAmountContainer = styled.div`
  padding: 30px 20px 0px 20px;
`;

const PortfolioContainer = styled.div`
  padding: 30px 21px 0px 21px;
`;

const PortfolioBtnContainer = styled.div`
  padding: 15px 11px 0px 11px;
`;

const DetailInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 15px 21px 15px 21px;
  border-top: 1px solid #f1f2f2;
`;

const HeaderText = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const AllAmountText = styled.p`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-left: -2px;
  margin-right: 15px;
`;

const DetailInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PortfolioBtn = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 7px;
  background: none;
  cursor: pointer;
`;

const Color = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  margin-right: 10px;
  background-color: red;
`;

const InfoHeaderText = styled.p`
  color: ${(props) => props.theme.font.gray};

  font-weight: 500;
  font-size: 14px;
`;

const BarHeaderText = styled.p`
  color: ${(props) => props.theme.font.black};
  font-weight: 700;
  font-size: 15px;
`;
const InfoText = styled.p`
  color: ${(props) => props.theme.font.black};
  font-weight: 500;
  font-size: 14px;
`;

const PortfolioBtnText = styled.p`
  color: ${(props) => props.theme.font.black};
  font-weight: 500;
  font-size: 15px;
`;

const PercentText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

const Update = styled.div<{ bgcolor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 22px;
  border-radius: 5px;
  padding: 0px 6px;
  margin-top: 5px;
  transition: background-color 0.1s ease-out;
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : props.theme.bg.gray};
`;

const Bar = styled.div`
  height: 30px;
  background-color: red;
  border-radius: 8px;
`;

const KrwDepositBtn = styled(motion.button)`
  right: 20px;
  position: absolute;
  height: 30px;
  border: none;
  padding: 0px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7684;
  background-color: #f2f4f6;
  font-weight: 500;
`;

export default AmountInfo;
