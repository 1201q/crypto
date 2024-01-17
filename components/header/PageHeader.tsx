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
  height: 50px;
  background-color: white;
  padding: 0px 20px;
  position: sticky;
  top: 0;
`;

const PageTitle = styled.p`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -1px;
`;

export default PageHeader;
