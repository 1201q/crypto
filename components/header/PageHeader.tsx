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
        width={22}
        height={22}
        fill={"#b7bfc7"}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 70px;
  background-color: white;
  padding: 0px 20px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.p`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export default PageHeader;
