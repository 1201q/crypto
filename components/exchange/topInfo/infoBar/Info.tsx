import React from "react";
import styled from "styled-components";

interface InfoPropsType {
  header: string;
  text: string;
  color?: string;
}

const Info: React.FC<InfoPropsType> = ({ header, text, color }) => {
  return (
    <Container>
      <InfoHeader>{header}</InfoHeader>
      <Text color={color}>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 14px;
  margin-right: 15px;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6b7684;
  border-right: 1px solid #6b7684;
  padding-left: 7px;
  padding-right: 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Text = styled.p<{ color: string | undefined }>`
  display: flex;
  font-size: 13px;
  align-items: center;
  font-weight: 700;
  letter-spacing: -0.1px;
  margin-left: 7px;
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default React.memo(Info);
