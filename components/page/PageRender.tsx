import { useEffect } from "react";
import styled from "styled-components";

interface PageRenderProps {
  Render: React.FC;
}

const PageRender: React.FC<PageRenderProps> = ({ Render }) => {
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", setScreenSize);
  }, []);

  return (
    <Container>
      <Mobile>
        <Render />
      </Mobile>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  background-color: #f2f4f6;
  display: flex;
  justify-content: center;
`;

const Mobile = styled.div`
  width: 840px;
  height: 100%;
  border-right: 1px solid #d1d6db;
  border-left: 1px solid #d1d6db;
`;

export default PageRender;
