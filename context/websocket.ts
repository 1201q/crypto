import { PrimitiveAtom, atom } from "jotai";
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
type WsType =
  | ExtendedTickerDataType
  | ExtendedOrderBookDataType
  | ExtendedTradeDataType;

// 기본
export const allWebsocketAtom = atom<WebSocket | null>(null);

export const singleWebsocketAtom = atom<WebSocket | null>(null);

export const allWebsocketDataAtom = atomWithReset<ExtendedTickerDataType[]>([]);

export const defaultSingleWebsocketDataAtom = atomWithReset<SingleWsDataType>({
  ticker: null,
  orderbook: null,
  trade: [],
});

export const singleWebsocketDataAtom = atom(
  (get) => get(defaultSingleWebsocketDataAtom),
  (_get, set, update: WsType) => {
    if (update.ty === "ticker") {
      set(defaultSingleWebsocketDataAtom, (prev) => ({
        ...prev,
        ticker: update as ExtendedTickerDataType,
      }));
    } else if (update.ty === "orderbook") {
      set(defaultSingleWebsocketDataAtom, (prev) => ({
        ...prev,
        orderbook: update as ExtendedOrderBookDataType,
      }));
    } else if (update.ty === "trade") {
      set(defaultSingleWebsocketDataAtom, (prev) => {
        const updatedTrade = [
          update as ExtendedTradeDataType,
          ...(prev?.trade || []),
        ];

        if (updatedTrade.length > 50) {
          updatedTrade.pop();
        }

        return {
          ...prev,
          trade: updatedTrade,
        };
      });
    }
  }
);

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

export const selectPriceAtom = <K extends keyof ExtendedTickerDataType>(
  key: K
) =>
  atom((get) => get(tickerDataAtom)?.[key] || undefined) as PrimitiveAtom<
    ExtendedTickerDataType[K] | undefined
  >;

allWebsocketAtom.debugLabel = "allWebsocketAtom";
singleWebsocketAtom.debugLabel = "singleWebsocketAtom";
allWebsocketDataAtom.debugLabel = "allWebsocketDataAtom";
defaultSingleWebsocketDataAtom.debugLabel = "defaultSingleWebsocketDataAtom";
singleWebsocketDataAtom.debugLabel = "singleWebsocketDataAtom";
tickerDataAtom.debugLabel = "tickerDataAtom";
tradeDataAtom.debugLabel = "tradeDataAtom";
orderbookDataAtom.debugLabel = "orderbookDataAtom";
sortedAllTickerDataAtom.debugLabel = "sortedAllTickerDataAtom";
rowTickerDataAtom.debugLabel = "rowTickerDataAtom";
