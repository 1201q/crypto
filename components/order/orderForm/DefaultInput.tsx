import styled from "styled-components";

interface PropsType {
  placeholder: string;
}

const DefaultInput: React.FC<PropsType> = ({ placeholder }) => {
  return (
    <Container>
      <Input type="text" placeholder={placeholder} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: #f2f4f6;
  border-radius: 7px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(100%);
  padding: 0px 15px 0px 15px;
  height: 100%;
  background-color: #f2f4f6;
  border-radius: 7px;
  font-size: 16px;
  letter-spacing: -0.5px;

  ::placeholder {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
`;

export default DefaultInput;
