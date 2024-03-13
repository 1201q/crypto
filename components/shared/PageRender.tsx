import React from "react";
import styled from "styled-components";
import HeadMeta from "./Meta/HeadMeta";
import ModalRender from "./ModalRender";

interface PageRenderProps {
  Render: React.FC;
  title?: string | undefined;
  description?: string | undefined;
  bgColor?: string;
}

const PageRender: React.FC<PageRenderProps> = ({
  Render,
  title,
  description,
  bgColor,
}) => {
  return (
    <Container>
      <HeadMeta title={title} description={description} />
      <Mobile bgColor={bgColor || "white"}>
        <Render />
        <ModalRender />
      </Mobile>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
  display: flex;
  justify-content: center;
`;

const Mobile = styled.div<{ bgColor: string }>`
  width: 840px;
  height: 100%;
  min-height: 100dvh;
  background-color: ${(props) => props.bgColor};
  border-right: 1px solid #d1d6db;
  border-left: 1px solid #d1d6db;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 840px) {
    border: none;
  }
`;

export default React.memo(PageRender);
