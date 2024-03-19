import { WalletTradeItemDataType, WalletTradeDataType } from "@/types/types";
import dayjs from "dayjs";
import { atom } from "jotai";

interface ReduceType {
  [date: string]: WalletTradeItemDataType[];
}

export const walletTradeDataAtom = atom<WalletTradeDataType | null>(null);
export const sortedTradeDataAtom = atom((get) => {
  const tradeData = get(walletTradeDataAtom);
  const trades = tradeData
    ? [...(tradeData?.krw ?? []), ...(tradeData.trade ?? [])]
    : [];

  const sortArray = trades.sort(
    (a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix()
  );

  return sortArray;
});
export const reducedTradeDataAtom = atom((get) => {
  const dataArray = get(sortedTradeDataAtom);

  const reducedArray = dataArray.reduce((acc, current) => {
    const date = current.timestamp.split("T")[0];

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(current);
    return acc;
  }, {} as ReduceType);

  return Object.entries(reducedArray);
});
