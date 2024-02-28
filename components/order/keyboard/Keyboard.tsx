import { orderKeyboardTypeAtom } from "@/context/atoms";
import { usePrice } from "@/context/hooks";
import {
  getKeyboardAmountOptions,
  getKeyboardKeys,
} from "@/utils/common/keyboard";
import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Key from "./Key";

const defaultKeys = [
  { name: "+1000만", value: 10000000 },
  { name: "+100만", value: 1000000 },
  { name: "+10만", value: 100000 },
  { name: "+1만", value: 10000 },
];

const Keyboard = () => {
  const price = usePrice("pcp");
  const type = useAtomValue(orderKeyboardTypeAtom);
  const [keyboard, setKeyboard] = useState(getKeyboardKeys(type));
  const [shortCutKeyboard, setShortCutKeyboard] = useState(() => {
    if (type === "amount") {
      return price && getKeyboardAmountOptions(price);
    } else {
      return defaultKeys;
    }
  });

  useEffect(() => {
    setKeyboard(getKeyboardKeys(type));
    setShortCutKeyboard(() => {
      if (type === "amount") {
        return price && getKeyboardAmountOptions(price);
      } else {
        return defaultKeys;
      }
    });
  }, [type]);

  return (
    <Container>
      <ShortCutBtnContainer>
        {shortCutKeyboard &&
          shortCutKeyboard?.map((option) => (
            <Key
              key={option.name}
              name={option.name}
              value={option.value}
              keyType={"shortcut"}
            />
          ))}
      </ShortCutBtnContainer>
      <NormalKeyboardContainer type={type}>
        {keyboard.map((key) => (
          <Key key={key} name={key} value={key} keyType={"normal"} />
        ))}
      </NormalKeyboardContainer>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100% - 35px);
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 5px;
`;

const ShortCutBtnContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`;

const NormalKeyboardContainer = styled.div<{ type: "amount" | "total" }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  direction: ${(props) => (props.type === "total" ? "rtl" : "ltl")};
`;

export default Keyboard;
