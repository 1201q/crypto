import Header from "@/components/auth/Header";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { motion } from "framer-motion";
import styled from "styled-components";
import useDepositInput from "./hooks/useDepositInput";
import useDeposit from "./hooks/useDeposit";

const DepositPage = () => {
  const { inputRef, onChange, value, inputValue, isFocus, inputLimit } =
    useDepositInput();
  const { onSubmit, isLoading, errorMsg } = useDeposit(value);

  return (
    <>
      <Header header="원화입금" />
      <Container onSubmit={onSubmit}>
        <HeaderText>입금 금액을 입력해주세요</HeaderText>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          inputMode="numeric"
          onChange={onChange}
          placeholder="1만원 이상의 금액을 입력해주세요"
          required
          isFocus={isFocus}
          inputLimit={inputLimit}
          minLength={5}
        />
        {inputLimit && (
          <InputLimitError
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.1 }}
          >
            한번에 1억원까지만 가능해요.
          </InputLimitError>
        )}
        {errorMsg !== "" && <ErrorContainer>{errorMsg}</ErrorContainer>}
        <BtnContainer>
          <SubmitButton
            whileTap={{ backgroundColor: "#28528F", scale: 0.99 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            type="submit"
          >
            {isLoading && <LoadingSpinner size={23} color="white" width={6} />}
            <ButtonText isLoading={isLoading}>입금</ButtonText>
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

const HeaderText = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Input = styled.input<{ isFocus: boolean; inputLimit?: boolean }>`
  width: 100%;
  padding: 0px 0px;
  height: 34px;
  background: none;
  border-bottom: ${(props) =>
    !props.inputLimit
      ? props.isFocus
        ? `2px solid ${props.theme.font.blue}`
        : "1px solid lightgray"
      : `2px solid ${props.theme.font.red}`};
  padding-bottom: ${(props) => (props.isFocus ? "0px" : "1px")};
  font-size: 15px;
  margin-bottom: 10px;
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

const ErrorContainer = styled.div`
  border-radius: 9px;
  background-color: ${(props) => props.theme.bg.lightRed};
  color: ${(props) => props.theme.font.red};
  padding: 10px;
  font-weight: 500;
  margin-top: 25px;
`;

const InputLimitError = styled(motion.div)`
  font-size: 13px;
  color: ${(props) => props.theme.font.red};
`;
export default DepositPage;
