import styled from "styled-components";
import Input from "./Input";
import SideSelector from "./SideSelector";
import AmountSelector from "./AmountSelector";
import TypeSelector from "./TypeSelector";

import { useAtom } from "jotai";
import {
  orderAmountAtom,
  orderSideAtom,
  orderTotalAtom,
} from "@/context/order";
import AccountDisplay from "./AccountDisplay";
import { useEffect } from "react";
import React from "react";
import OrderBtn from "./OrderBtn";

const OrderSection = () => {
  const [side, setSide] = useAtom(orderSideAtom);
  const [, setAmount] = useAtom(orderAmountAtom);
  const [, setTotal] = useAtom(orderTotalAtom);

  useEffect(() => {
    return () => {
      setSide("buy");
      setAmount("0");
      setTotal("0");
    };
  }, []);

  return (
    <Container>
      <SideSelector />
      <TypeSelector />
      <AccountDisplay />
      <AmountSelector side={side} />
      <Input
        headerText={side === "buy" ? "총액" : "수량"}
        type={side === "buy" ? "total" : "amount"}
      />
      <OrderBtn side={side} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
  position: relative;
`;

export default React.memo(OrderSection);
