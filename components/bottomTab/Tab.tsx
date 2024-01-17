import styled from "styled-components";
import Chart from "@/public/chart.svg";
import Menu from "@/public/menu.svg";
import Star from "@/public/star.svg";
import StarFill from "@/public/star-.svg";
import World from "@/public/world.svg";
import WorldFill from "@/public/world-.svg";

interface TabProps {
  name: string;
  isSelect: boolean;
  icon: any;
}

const Tab: React.FC<TabProps> = ({ name, isSelect, icon }) => {
  const IconRender = () => {
    if (icon === "star") {
      return isSelect ? (
        <StarFill width={15} height={15} />
      ) : (
        <Star width={15} height={15} />
      );
    } else if (icon === "menu") {
      return isSelect ? (
        <Menu width={15} height={15} />
      ) : (
        <Menu width={15} height={15} />
      );
    } else if (icon === "chart") {
      return isSelect ? (
        <Chart width={15} height={15} />
      ) : (
        <Chart width={15} height={15} />
      );
    } else if (icon === "world") {
      return isSelect ? (
        <WorldFill width={15} height={15} />
      ) : (
        <World width={15} height={15} />
      );
    } else {
      return isSelect ? (
        <Chart width={15} height={15} />
      ) : (
        <Chart width={15} height={15} />
      );
    }
  };

  return (
    <TabContainer>
      <TabIcon>{IconRender()}</TabIcon>
      <TabName>{name}</TabName>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;
const TabIcon = styled.div`
  margin-bottom: 3px;
`;

const TabName = styled.p`
  font-size: 12px;
  font-weight: bold;
`;

export default Tab;
