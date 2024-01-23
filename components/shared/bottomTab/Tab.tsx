import styled from "styled-components";
import Icon from "./Icon";
import { useRouter } from "next/router";
import React from "react";

interface TabProps {
  name: string;
  isSelect: boolean;
  icon: string;

  routing: string;
}

const Tab: React.FC<TabProps> = ({ name, isSelect, icon, routing }) => {
  const router = useRouter();
  return (
    <TabContainer
      onClick={() => {
        router.push(routing);
      }}
    >
      <Icon icon={icon} isSelect={isSelect} />
      <TabName $isselect={isSelect}>{name}</TabName>
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
  border-radius: 5px;
`;

const TabName = styled.p<{ $isselect: boolean }>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.$isselect ? "black" : "#b7bfc7")};
`;

export default React.memo(Tab);
