import { PrimitiveAtom } from "jotai";
import {
  ExtendedTickerDataType,
  ExtendedTradeDataType,
  ExtendedOrderBookDataType,
} from "@/types/types";
import { useUpbit } from "./websocketUtils";

export const useTicker = (
  code: string[] | string,
  atom: PrimitiveAtom<ExtendedTickerDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { ticker: useUpbit("ticker", code, atom, isWsOpenAtom) };
};

export const useTrade = (
  code: string[] | string,
  atom: PrimitiveAtom<ExtendedTradeDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { trade: useUpbit("trade", code, atom, isWsOpenAtom) };
};

export const useOrderbook = (
  code: string[] | string,
  atom: PrimitiveAtom<ExtendedOrderBookDataType[]>,
  isWsOpenAtom: PrimitiveAtom<boolean>
) => {
  return { orderbook: useUpbit("orderbook", code, atom, isWsOpenAtom) };
};
