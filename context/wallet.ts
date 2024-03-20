import {
  WalletTradeItemDataType,
  WalletTradeDataType,
  MarketListDataType,
} from "@/types/types";
import dayjs from "dayjs";
import { atom } from "jotai";
import { selectSortCoinAtom, selectTradeSortOption } from "./atoms";

interface ReduceType {
  [date: string]: WalletTradeItemDataType[];
}

export const walletTradeDataAtom = atom<WalletTradeDataType | null>(null);
export const sortedTradeDataAtom = atom((get) => {
  const tradeData = get(walletTradeDataAtom);
  const selectCoin = get(selectSortCoinAtom);
  const sortOptionSide = get(selectTradeSortOption);
  const side: any = sortOptionSide?.side || "all";

  const trades = tradeData
    ? [...(tradeData?.krw ?? []), ...(tradeData.trade ?? [])]
    : [];

  const sortedArray = filterArray(trades, side, selectCoin);

  const sortArray = sortedArray.sort(
    (a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix()
  );

  return sortArray;
});

const filterArray = (
  array: WalletTradeItemDataType[],
  side: "krw" | "buy" | "sell" | "all",
  coin: MarketListDataType | null
) => {
  if (!coin) {
    return side === "all" ? array : array.filter((item) => item.side === side);
  }

  if (coin && side === "krw") {
    return array.filter((item) => item.side === "krw");
  } else if (coin && side === "all") {
    return array.filter((item) => item.code === coin.market);
  } else {
    return array.filter(
      (item) => item.code === coin.market && item.side === side
    );
  }
};

export const selectTradeDataAtom = (id: string) =>
  atom((get) => get(sortedTradeDataAtom).find((data) => data.id === id));

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
