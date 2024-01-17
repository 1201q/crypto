import styled from "styled-components";

const ListController = () => {
  return (
    <Container>
      <SortBtn isSelect={false}>거래대금</SortBtn>
      <SortBtn isSelect={false}>상승</SortBtn>
      <SortBtn isSelect={false}>하락</SortBtn>
      <SortBtn isSelect={true}>이름</SortBtn>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 20px;
  height: 45px;
  background-color: white;
`;

const SortBtn = styled.button<{ isSelect: boolean }>`
  height: 32px;
  border: none;
  margin-right: 10px;
  padding: 0px 10px;
  border-radius: 6px;

  cursor: pointer;

  color: ${(props) => (props.isSelect ? "white" : "#6b7684")};
  background-color: ${(props) => (props.isSelect ? "#565656" : "#f2f4f6")};
  font-weight: ${(props) => (props.isSelect ? 700 : 500)};
`;

export default ListController;
