import React from "react";
import styled from "styled-components";
import HeadMeta from "../shared/Meta/HeadMeta";

interface PageRenderProps {
  Render: React.FC;
  title?: string | undefined;
  description?: string | undefined;
}

const PageRender: React.FC<PageRenderProps> = ({
  Render,
  title,
  description,
}) => {
  return (
    <Container>
      <HeadMeta title={title} description={description} />
      <Mobile>
        <Render />
      </Mobile>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  position: relative;
  background-color: #f2f4f6;
  display: flex;
  justify-content: center;
`;

const Mobile = styled.div`
  width: 840px;
  height: 100%;
  min-height: 100dvh;
  background-color: white;
  border-right: 1px solid #d1d6db;
  border-left: 1px solid #d1d6db;

  @media screen and (max-width: 840px) {
    border: none;
  }
`;

export default React.memo(PageRender);
