import { atom } from "jotai";
import {
  ExtendedTickerDataType,
  ExtendedTradeDataType,
  ExtendedOrderBookDataType,
  MarketListDataType,
} from "@/types/types"; // https://velog.io/@bnb8419/Jotai-%EC%82%AC%EC%9A%A9%EB%B2%95#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%82%B4%EC%97%90%EC%84%9C-atom%EC%83%9D%EC%84%B1
// coin data

export const allTickerDataAtom = atom<ExtendedTickerDataType[]>([]);
export const tradeDataAtom = atom<ExtendedTradeDataType[]>([]);
export const orderbookDataAtom = atom<ExtendedOrderBookDataType[]>([]);
export const coinListAtom = atom<MarketListDataType[]>([]);
