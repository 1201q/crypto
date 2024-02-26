import {
  isOrderKeyboardVisibleAtom,
  orderKeyboardTypeAtom,
  orderSideAtom,
} from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";

interface PropsType {
  headerText: string;
  type: "amount" | "sum";
}

const DefaultInput: React.FC<PropsType> = ({ headerText, type }) => {
  const [keyboardVisible, setKeyboardVisible] = useAtom(
    isOrderKeyboardVisibleAtom
  );
  const [keyboardType, setKeyboardType] = useAtom(orderKeyboardTypeAtom);
  const [orderside] = useAtom(orderSideAtom);

  const handleKeyboard = () => {
    setKeyboardType(type);
    setKeyboardVisible(true);
  };

  const isFocus = keyboardType === type && keyboardVisible;

  return (
    <Container onClick={handleKeyboard} focus={isFocus} side={orderside}>
      <Header>{headerText}</Header>
    </Container>
  );
};

const Container = styled.div<{ focus: boolean; side: "buy" | "sell" }>`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: ${(props) =>
    props.focus
      ? props.side === "sell"
        ? props.theme.bg.lightBlue
        : props.theme.bg.lightRed
      : props.theme.bg.default};
  border-radius: 7px;
  margin-bottom: 10px;
  cursor: text;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: gray;
  letter-spacing: -0.3px;
  text-overflow: ellipsis;
  margin-left: 10px;
`;

export default DefaultInput;
