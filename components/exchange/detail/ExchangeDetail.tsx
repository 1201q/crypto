import { queryCodeAtom, selectTickerDataAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";

const ExchangeDetail = () => {
  const [queryCode] = useAtom(queryCodeAtom);
  const [data] = useAtom(selectTickerDataAtom(queryCode));

  console.log(data);
  return <Container></Container>;
};

const Container = styled.div`
  background-color: white;
  height: 400px;
  padding: 0px 20px;
`;
export default ExchangeDetail;
