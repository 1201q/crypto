import { MarketListDataType } from "../../types/types";

export default function getKR(coinList: MarketListDataType[], code: string) {
  const correct = coinList?.find((coin) => coin.market === code);
  return correct?.korean_name;
}
