import React from "react";
import styled from "styled-components";

const TypeSelector = () => {
  return (
    <Container>
      <OptionContainer isActive={true}>
        <Header>시장가</Header>
        <input type="radio" checked={true} readOnly />
      </OptionContainer>
      <OptionContainer isActive={false}>
        <Header>지정가</Header>
        <input type="radio" checked={false} readOnly />
      </OptionContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: flex-start;
`;

const OptionContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  margin-right: 10px;
  opacity: ${(props) => (props.isActive ? 1 : "0.3")};
`;
const Header = styled.p`
  font-size: 14px;
  color: gray;
  letter-spacing: -0.3px;
  text-overflow: ellipsis;
  margin-right: 10px;
`;

export default React.memo(TypeSelector);
