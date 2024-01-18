import Home from "@/public/home.svg";
import Wallet from "@/public/wallet.svg";
import Community from "@/public/community.svg";
import Menu from "@/public/menu.svg";
import styled from "styled-components";

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

export default Icon;
