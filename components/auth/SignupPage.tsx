import styled from "styled-components";
import Header from "./Header";
import { motion } from "framer-motion";
import LoadingSpinner from "../shared/LoadingSpinner";
import useInput from "./hooks/useInput";

import useSignup from "./hooks/useSignup";

const SignupPage = () => {
  const {
    value: email,
    onChange: onEmailChange,
    isFocus: isEmailFocus,
    inputRef: emailRef,
  } = useInput();

  const {
    value: password,
    onChange: onPasswordChange,
    isFocus: isPasswordFocus,
    inputRef: passwordRef,
  } = useInput();

  const {
    value: name,
    onChange: onNameChange,
    isFocus: isNameFocus,
    inputRef: nameRef,
  } = useInput();

  const { onSubmit, errorMsg, isLoading } = useSignup(email, password, name);
  return (
    <>
      <Header header="회원가입" />
      <Container
        onSubmit={onSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <InputHeaderText>이메일</InputHeaderText>
        <Input
          ref={emailRef}
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일을 입력해주세요"
          required
          isFocus={isEmailFocus}
        />
        <InputHeaderText>비밀번호</InputHeaderText>
        <Input
          ref={passwordRef}
          type="password"
          value={password}
          placeholder="6자리 이상의 비밀번호를 입력해주세요"
          onChange={onPasswordChange}
          minLength={6}
          required
          isFocus={isPasswordFocus}
        />

        <InputHeaderText>닉네임 확인</InputHeaderText>
        <Input
          ref={nameRef}
          type="text"
          value={name}
          placeholder="사용할 닉네임을 입력해주세요"
          onChange={onNameChange}
          minLength={2}
          required
          isFocus={isNameFocus}
        />
        {errorMsg && <ErrorContainer>{errorMsg}</ErrorContainer>}
        <BtnContainer>
          <SubmitButton
            whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            type="submit"
          >
            {isLoading && <LoadingSpinner size={23} color="white" width={6} />}
            <ButtonText isLoading={isLoading}>회원가입</ButtonText>
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

const ErrorContainer = styled.div`
  border-radius: 9px;
  background-color: ${(props) => props.theme.bg.lightRed};
  color: ${(props) => props.theme.font.red};
  padding: 10px;
  font-weight: 500;
`;

const InputHeaderText = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: gray;
  margin-bottom: 8px;
`;

const Input = styled.input<{ isFocus: boolean }>`
  width: 100%;
  padding: 0px 0px;
  height: 34px;
  background: none;
  border-bottom: ${(props) =>
    props.isFocus
      ? `2px solid ${props.theme.font.blue}`
      : "1px solid lightgray"};
  padding-bottom: ${(props) => (props.isFocus ? "0px" : "1px")};
  font-size: 15px;
  margin-bottom: 30px;
  box-sizing: border-box;
  letter-spacing: -0.5px;
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

export default SignupPage;
