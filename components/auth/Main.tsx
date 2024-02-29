import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "./Header";
import { motion } from "framer-motion";

const Main = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HeaderContainer>
          <SmallText>가상자산 시뮬레이션 서비스</SmallText>
          <HeaderText>ALL UP!</HeaderText>
        </HeaderContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              router.push("/auth/in");
            }}
          >
            이메일로 로그인
          </Button>
          <Button>구글로 계속하기</Button>
        </ButtonContainer>
        <SignUpLink
          onClick={() => {
            router.push("/auth/create");
          }}
        >
          회원가입
        </SignUpLink>
      </motion.div>
    </>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const HeaderText = styled.p`
  font-size: 60px;
  font-weight: 800;
  letter-spacing: 0px;
  text-align: center;
  line-height: 120%;
`;

const SmallText = styled.p`
  font-size: 15px;
  margin-bottom: 7px;
  color: ${(props) => props.theme.font.gray};
`;

const Button = styled.button`
  width: 80%;
  max-width: 400px;
  height: 40px;

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0px 0px 0px;
  background-color: white;
  border: 1px solid lightgray;
  color: black;

  margin: 20px 0px 0px 0px;
`;

const SignUpLink = styled.p`
  width: 100%;
  margin-top: 80px;
  font-size: 14px;
  color: gray;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
`;

export default Main;
