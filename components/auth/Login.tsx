import styled from "styled-components";
import Header from "./Header";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <>
      <Header header="로그인" />
      <Container>
        <InputHeaderText>이메일</InputHeaderText>
        <Input
          type="email"
          // value={email}
          name="email"
          // onChange={onChange}
          placeholder="이메일을 입력하세요"
          required
        />
        <InputHeaderText>비밀번호</InputHeaderText>
        <Input
          type="password"
          // value={password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          // onChange={onChange}
          minLength={6}
          required
        />

        <BtnContainer>
          <BidBtn
            whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            로그인
          </BidBtn>
        </BtnContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: ${(props) => props.theme.height.orderpage};
  padding: 30px 22px;
  position: relative;
`;

const InputHeaderText = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: gray;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0px 0px;
  height: 34px;
  background: none;
  border-bottom: 1px solid lightgray;

  margin-bottom: 15px;
  font-size: 15px;
  margin-bottom: 30px;
`;

const BtnContainer = styled.div`
  width: calc(100% - 44px);
  position: absolute;
  bottom: 15px;
`;

const BidBtn = styled(motion.button)`
  background-color: #448aef;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
`;

export default Login;
