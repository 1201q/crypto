import styled from "styled-components";
import Icon from "./Icon";

interface TabProps {
  name: string;
  isSelect: boolean;
  icon: any;
}

const Tab: React.FC<TabProps> = ({ name, isSelect, icon }) => {
  return (
    <TabContainer>
      <Icon icon={icon} isSelect={isSelect} />

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

const TabName = styled.p`
  font-size: 12px;
  font-weight: bold;
`;

export default Tab;
