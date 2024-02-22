import { MarketListDataType } from "../../types/types";

export default function getKR(
  coinList: MarketListDataType[] | undefined,
  code: string | undefined
) {
  const correctCode = coinList?.find((coin) => coin.market === code);
  return correctCode?.korean_name;
}
