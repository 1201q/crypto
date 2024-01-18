import styled from "styled-components";
import Search from "@/public/search.svg";

interface HeaderProps {
  title: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Container>
      <PageTitle>{title}</PageTitle>
      <Search
        width={23}
        height={23}
        fill={"#b7bfc7"}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 84px;
  background-color: white;
  padding: 0px 20px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export default PageHeader;
