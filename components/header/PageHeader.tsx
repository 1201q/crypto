import styled from "styled-components";
import { useAtom } from "jotai";
import { pageHeaderHeightAtom } from "@/utils/atoms/styles";

interface HeaderProps {
  title: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title }) => {
  const [height] = useAtom(pageHeaderHeightAtom);
  return (
    <Container height={height}>
      <PageTitle>{title}</PageTitle>
    </Container>
  );
};

const Container = styled.div<{ height: number }>`
  height: ${(props) => `${props.height}px`};
  background-color: white;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.p`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-bottom: 10px;
`;

export default PageHeader;
