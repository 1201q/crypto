import styled from "styled-components";

interface PropsType {
  placeholder: string;
}

const DefaultInput: React.FC<PropsType> = ({ placeholder }) => {
  return (
    <Container>
      <Header>{placeholder}</Header>
      <Input type="text" placeholder="0" inputMode="none" />
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: gray;
  letter-spacing: -0.3px;
  text-overflow: ellipsis;
  margin-left: 10px;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  padding: 0px 15px 0px 5px;
  height: 100%;
  background: none;
  border-radius: 7px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.5px;

  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.5px;
    color: ${(props) => props.theme.font.black};
  }
`;

export default DefaultInput;
