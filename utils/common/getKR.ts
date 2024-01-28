import { MarketListDataType } from "../../types/types";

export default function getKR(
  coinList: MarketListDataType[] | undefined,
  code: string | undefined
) {
  const correct = coinList?.find((coin) => coin.market === code);
  return correct?.korean_name;
}
