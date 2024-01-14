import { allTickerDataAtom } from "@/utils/atoms/atoms";
import { SetAtom } from "@/utils/types/types";
import { useAtom } from "jotai";
import { SetStateAction } from "jotai/vanilla";
import { useRouter } from "next/router";
import styled from "styled-components";

interface ListProps {
  selectCode: string;
  setSelectCode: SetAtom<[SetStateAction<string>], void>;
}

const List: React.FC<ListProps> = ({ selectCode, setSelectCode }) => {
  const [renderData] = useAtom(allTickerDataAtom);
  const router = useRouter();

  return (
    <Container>
      {renderData.map((coin) => (
        <Coin
          onClick={() => {
            setSelectCode(coin.code);
            router.push(`/exchange/${coin.code}`);
            console.log(coin);
          }}
          key={coin.code}
        >
          <div>{coin.code}</div>
          <div>{coin.trade_price}</div>
          <div>{(coin.signed_change_rate * 100).toFixed(2)}%</div>
          <div>{(coin.acc_trade_price_24h / 1000000).toFixed(0)}백만</div>
        </Coin>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  border: 1px solid black;
  margin: 10px;
`;

const Coin = styled.div`
  width: calc(100% - 20px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 40px;
  border: 1px solid black;
  padding: 10px;

  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

export default List;
