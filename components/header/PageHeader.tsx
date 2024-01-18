import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  height: 50px;
  background-color: white;
  padding: 0px 20px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: flex-start;
`;

const PageTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export default PageHeader;
