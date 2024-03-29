import React from "react";
import styled from "styled-components";
import getKR from "@/utils/common/getKR";
import f from "@/utils/common/formatting";
import { useAtom } from "jotai";
import { queryCodeAtom } from "@/context/atoms";
import { useList } from "@/utils/hooks/useList";
import { motion } from "framer-motion";

const Name = () => {
  const { coinList } = useList();
  const [selectCode] = useAtom(queryCodeAtom);

  return (
    <Container bottom={5}>
      <NameText>{getKR(coinList.data, selectCode)}</NameText>
      <Code>{f("code", selectCode)}</Code>
    </Container>
  );
};

const Container = styled.div<{ bottom: number }>`
  display: flex;
  margin-bottom: ${(props) => `${props.bottom}px`};
`;

// name
const NameText = styled(motion.p)`
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-right: 10px;
  margin-left: 1px;
`;

const Code = styled.p`
  display: flex;
  align-items: flex-end;
  font-size: 13px;
  font-weight: 500;
  color: #a4a4a4;
`;

export default React.memo(Name);
