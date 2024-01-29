import { PrimitiveAtom } from "jotai";
import {
  OrderBookDataType,
  TickerDataType,
  TradeDataType,
} from "@/types/types";
import { useUpbit } from "./websocketUtils";

export const useTicker = (
  code: string[] | string,
  atom: PrimitiveAtom<TickerDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { ticker: useUpbit("ticker", code, atom, isWsOpenAtom) };
};

export const useTrade = (
  code: string[] | string,
  atom: PrimitiveAtom<TradeDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { trade: useUpbit("trade", code, atom, isWsOpenAtom) };
};

export const useOrderbook = (
  code: string[] | string,
  atom: PrimitiveAtom<OrderBookDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { orderbook: useUpbit("orderbook", code, atom, isWsOpenAtom) };
};
