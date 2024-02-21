import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function custom404() {
  const router = useRouter();
  return (
    <Container>
      <HeaderText>404</HeaderText>
      <TextContainer>
        <BigText>페이지를 찾을 수 없어요!</BigText>
        <SmallText>
          요청하신 페이지의 주소가 변경되거나 삭제되었을 수 있어요.
        </SmallText>
        <SmallText>입력하신 페이지의 주소를 다시 확인해주세요.</SmallText>
      </TextContainer>
      <Button
        onClick={() => router.replace("/market")}
        initial={{ scale: 1 }}
        transition={{ duration: 0.1 }}
        whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
      >
        홈으로 가기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #f2f4f6;
  color: ${(props) => props.theme.font.darkgray};
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 140px 30px 0px 30px;
`;

const TextContainer = styled.div`
  margin-bottom: 50px;
`;

const HeaderText = styled.p`
  font-size: 130px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const BigText = styled.p`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 40px;
  white-space: pre-wrap;
  text-align: center;
  letter-spacing: -0.5px;
`;

const SmallText = styled(BigText)`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 120%;
`;

const Button = styled(motion.button)`
  background-color: #448aef;
  width: fit-content;
  height: 45px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  padding: 0px 20px;
`;
