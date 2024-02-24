import { atom } from "jotai";
import {
  ExtendedTickerDataType,
  ExtendedTradeDataType,
  ExtendedOrderBookDataType,
} from "@/types/types";
import { sortOptionAtom } from "./atoms";
import { atomWithReset } from "jotai/utils";

interface SingleWsDataType {
  ticker: ExtendedTickerDataType | null;
  orderbook: ExtendedOrderBookDataType | null;
  trade: ExtendedTradeDataType[];
}

// 기본
export const allWebsocketAtom = atom<WebSocket | null>(null);
export const singleWebsocketAtom = atom<WebSocket | null>(null);

export const allWebsocketDataAtom = atomWithReset<ExtendedTickerDataType[]>([]);
export const singleWebsocketDataAtom = atomWithReset<SingleWsDataType>({
  ticker: null,
  orderbook: null,
  trade: [],
});

// raw 데이터중에 single 데이터만 가져옴
export const tickerDataAtom = atom<ExtendedTickerDataType | null>(
  (get) => get(singleWebsocketDataAtom).ticker
);
export const tradeDataAtom = atom<ExtendedTradeDataType[]>(
  (get) => get(singleWebsocketDataAtom).trade
);
export const orderbookDataAtom = atom<ExtendedOrderBookDataType | null>(
  (get) => get(singleWebsocketDataAtom).orderbook
);

// ticker
export const sortedAllTickerDataAtom = atom((get) => {
  const data = get(allWebsocketDataAtom);
  const sort = get(sortOptionAtom);

  return [...data]?.sort((a, b) => {
    const option = sort.find((option) => option.select)?.en;
    if (option === "acc") {
      return b.atp24h - a.atp24h;
    } else if (option === "up") {
      return b.scr - a.scr;
    } else if (option === "down") {
      return a.scr - b.scr;
    }
    return 0;
  });
});

export const rowTickerDataAtom = (index: number) =>
  atom((get) => get(sortedAllTickerDataAtom)[index]);
