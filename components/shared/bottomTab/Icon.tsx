import { IconHome as Home } from "@/public/svgs";
import { IconWallet as Wallet } from "@/public/svgs";
import { IconCommunity as Community } from "@/public/svgs";
import { IconMenu as Menu } from "@/public/svgs";
import styled from "styled-components";
import React from "react";

interface IconProps {
  icon: string;
  isSelect: boolean;
}

const Icon: React.FC<IconProps> = ({ icon, isSelect }) => {
  const IconRender = () => {
    switch (icon) {
      case "home":
        return <Home />;
      case "wallet":
        return <Wallet />;
      case "community":
        return <Community />;
      case "menu":
        return <Menu />;
      default:
        return null;
    }
  };

  return <TabIcon $isselect={isSelect}>{IconRender()}</TabIcon>;
};
const TabIcon = styled.div<{ $isselect: boolean }>`
  margin-bottom: 4px;

  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => (props.$isselect ? "black" : "#b7bfc7")};
  }
`;

export default React.memo(Icon);
