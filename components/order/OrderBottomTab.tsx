import { motion } from "framer-motion";
import styled from "styled-components";

const BottomMenu = () => {
  return <Container></Container>;
};

const Container = styled.div`
  position: sticky;
  height: ${(props) => `${props.theme.height.orderBottomTab}px`};
  border-top: 1px solid #f1f2f2;
  bottom: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 20px;
  z-index: 100;
`;
const Button = styled(motion.button)`
  width: 65px;
  background-color: #f2f4f6;
  border-radius: 7px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: #808080;
  padding: 7px 0px;
  cursor: pointer;
`;

export default BottomMenu;
