import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "./Header";
import { motion } from "framer-motion";
import { useGoogle } from "./hooks/useGoogle";
import { IconGoogle } from "@/public/svgs";
import { authService } from "@/utils/firebase/client";
import { signOut } from "firebase/auth";
import LoadingSpinner from "../shared/LoadingSpinner";
import Link from "next/link";

const MainPage = () => {
  const router = useRouter();
  const { loginGoogle, isGoogleLoading } = useGoogle();

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
              router.push("/auth/login");
            }}
            whileTap={{ scale: 0.98 }}
          >
            이메일로 로그인
          </Button>
          <SocialLoginButton onClick={loginGoogle} whileTap={{ scale: 0.98 }}>
            <IconGoogle />
            <p>소셜 계정 로그인</p>
          </SocialLoginButton>
        </ButtonContainer>
        <LinkContainer>
          <SignUpLink href={"/auth/signup"}>회원가입</SignUpLink>
          <p
            onClick={() => {
              signOut(authService);
            }}
          >
            테스트 로그아웃
          </p>
        </LinkContainer>
      </motion.div>
      {isGoogleLoading && (
        <Redirecting>
          <LoadingSpinner color="white" size={60} />
        </Redirecting>
      )}
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
  margin-top: 60px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled(motion.button)`
  width: 80%;
  max-width: 400px;
  height: 50px;

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  margin: 10px 0px 0px 0px;
  background-color: ${(props) => props.theme.bg.selectBtn};
  color: white;
  margin: 20px 0px 0px 0px;
`;

const SocialLoginButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 400px;
  height: 40px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bg.default};
  margin-top: 20px;
  cursor: pointer;

  p {
    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.font.darkgray};
    margin-left: 4px;
  }

  svg {
    transform: scale(0.7);
  }
`;

const SignUpLink = styled(Link)`
  width: 100%;
  margin-top: 50px;
  font-size: 15px;
  color: gray;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
`;

const Redirecting = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;

  p {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 30px;
  }
`;

export default MainPage;
