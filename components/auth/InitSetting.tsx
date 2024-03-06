import styled from "styled-components";
import Header from "./Header";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";

const InitSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Header header="첫 설정" />
      <Container>
        <InfoText>첫 설정을 완료해주세요.</InfoText>
        <div>
          <div>
            <div>100만원으로 시작</div>
          </div>
          <div>
            <div>1000만원으로 시작</div>
          </div>
          <div>
            <div>1억으로 시작</div>
          </div>
          <div>
            <div>10억으로 시작</div>
          </div>
        </div>
        <BtnContainer>
          <SubmitButton
            whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            type="submit"
          >
            {isLoading && <LoadingSpinner size={23} color="white" width={6} />}
            <ButtonText isLoading={isLoading}>로그인</ButtonText>
          </SubmitButton>
        </BtnContainer>
      </Container>
    </>
  );
};

const Container = styled(motion.form)`
  height: ${(props) => props.theme.height.orderpage};
  padding: 30px 22px;
  position: relative;
`;

const InfoText = styled.p`
  font-size: 32px;
  font-weight: 600;
  text-align: left;
`;

const BtnContainer = styled.div`
  width: calc(100% - 44px);
  position: absolute;
  bottom: 20px;
`;

const SubmitButton = styled(motion.button)`
  position: relative;
  background-color: #448aef;
  width: 100%;
  height: 54px;
  border-radius: 15px;
  border: none;

  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.p<{ isLoading: boolean }>`
  transform: ${(props) =>
    props.isLoading ? "translateX(17px)" : "translateX(0)"};
  transition-duration: 0.2s;
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

export default InitSetting;
