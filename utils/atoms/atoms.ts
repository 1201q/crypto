import { atom } from "jotai";
import { TickerDataType } from "../types/types";

//https://velog.io/@bnb8419/Jotai-%EC%82%AC%EC%9A%A9%EB%B2%95#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%82%B4%EC%97%90%EC%84%9C-atom%EC%83%9D%EC%84%B1

export const allTickerDataAtom = atom<TickerDataType[]>([]);
export const selectTickerDataAtom = atom<TickerDataType[]>([]);
export const selectCodeAtom = atom("");
export const tradeDataAtom = atom([]);
export const orderbookDataAtom = atom([]);
