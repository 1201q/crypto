import { orderSideAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import styled from "styled-components";

const OrderSideSelector = () => {
  const [side, setSide] = useAtom(orderSideAtom);

  return (
    <Container>
      <SortBtn
        $isselect={side === "buy"}
        onClick={() => {
          setSide("buy");
        }}
        $bgcolor={"#df5068"}
      >
        매수
      </SortBtn>
      <SortBtn
        $isselect={side === "sell"}
        onClick={() => {
          setSide("sell");
        }}
        $bgcolor={"#448aef"}
      >
        매도
      </SortBtn>
    </Container>
  );
};

const Container = styled.div`
  height: 32px;
  background-color: #f2f4f6;
  margin-top: 15px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 7px;
`;

const SortBtn = styled.button<{ $isselect: boolean; $bgcolor: string }>`
  border: none;
  border-radius: 7px;
  cursor: pointer;
  color: ${(props) => (props.$isselect ? "white" : "#6b7684")};
  background-color: ${(props) =>
    props.$isselect ? props.$bgcolor : "#f2f4f6"};
  font-size: 14px;
  font-weight: ${(props) => (props.$isselect ? 700 : 500)};
`;

export default OrderSideSelector;
