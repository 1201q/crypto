import {
  isOrderKeyboardVisibleAtom,
  orderKeyboardTypeAtom,
  orderSideAtom,
  orderTotalAtom,
  displayOrderAmountAtom,
} from "@/context/order";

import { useAtom } from "jotai";
import { useRouter } from "next/router";
import styled from "styled-components";

interface PropsType {
  headerText: string;
  type: "amount" | "total";
}

const Input: React.FC<PropsType> = ({ headerText, type }) => {
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useAtom(
    isOrderKeyboardVisibleAtom
  );
  const [keyboardType, setKeyboardType] = useAtom(orderKeyboardTypeAtom);
  const [orderside] = useAtom(orderSideAtom);

  const [displayOrderAmount] = useAtom(displayOrderAmountAtom);
  const [orderTotal] = useAtom(orderTotalAtom);

  const isFocus = keyboardType === type && keyboardVisible;

  const handleOpenKeyboard = () => {
    setKeyboardType(type);
    setKeyboardVisible(true);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, open: true },
      },
      `${router.asPath}?`
    );
  };

  return (
    <Container onClick={handleOpenKeyboard} focus={isFocus} side={orderside}>
      <Header>{headerText}</Header>
      <Price
        type="text"
        value={
          type === "amount"
            ? displayOrderAmount
            : Number(orderTotal).toLocaleString()
        }
        readOnly
      />
    </Container>
  );
};

const Container = styled.div<{ focus: boolean; side: "buy" | "sell" }>`
  display: flex;
  align-items: center;
  width: 100%;
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
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: gray;
  letter-spacing: -0.3px;

  margin-right: 10px;
  margin-left: 10px;
  white-space: nowrap;
`;

const Price = styled.input`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: -0.5px;
  background: none;
  width: 100%;
  height: 100%;
`;

export default Input;
