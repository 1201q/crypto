import { atom } from "jotai";
import {
  ExtendedOrderBookDataType,
  ExtendedTradeDataType,
  MarketListDataType,
  ExtendedTickerDataType,
} from "../types/types";

// https://velog.io/@bnb8419/Jotai-%EC%82%AC%EC%9A%A9%EB%B2%95#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%82%B4%EC%97%90%EC%84%9C-atom%EC%83%9D%EC%84%B1

// coin data
export const allTickerDataAtom = atom<ExtendedTickerDataType[]>([]);
export const selectTickerDataAtom = atom(
  (get) => {
    const allTickerData = get(allTickerDataAtom);
    const queryCode = get(queryCodeAtom);

    return allTickerData.find((coin) => coin?.cd === queryCode);
  },
  (_, set, update: ExtendedTickerDataType) => {
    set(selectTickerDataAtom, update);
  }
);

export const sortedAllTickerDataAtom = atom(
  (get) => {
    const data = get(allTickerDataAtom);
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
  },
  (_, set, update: ExtendedTickerDataType[]) => {
    set(sortedAllTickerDataAtom, update);
  }
);

export const tradeDataAtom = atom<ExtendedTradeDataType[]>([]);

// orderbook
export const orderbookDataAtom = atom<ExtendedOrderBookDataType[]>([]);

export const coinListAtom = atom<MarketListDataType[]>([]);
export const queryCodeAtom = atom<string | undefined>("");

// coinList
const options = [
  { name: "거래대금", en: "acc", select: true },
  { name: "상승", en: "up", select: false },
  { name: "하락", en: "down", select: false },
];
export const sortOptionAtom = atom(options);
export const currentIndexAtom = atom(0);

// bottom tab
const menu = [
  { name: "마켓", icon: "home", routing: "/market" },
  { name: "지갑", icon: "wallet", routing: "/wallet" },
  { name: "커뮤니티", icon: "community", routing: "/community" },
  { name: "메뉴", icon: "menu", routing: "/menu" },
];
export const tabMenuAtom = atom(menu);
export const pathnameAtom = atom<string | null>(null);

// search
export const searchInputValueAtom = atom<string>("");

// websocket state
export const isTickerWebsocketOpenAtom = atom(false);
export const isTradeWebsocketOpenAtom = atom(false);
export const isOrderbookWebsocketOpenAtom = atom(false);

// chart controller
const lineChartControllerOptions = [
  { name: "1주", select: true, type: "minutes", count: 169, unit: 60 },
  { name: "1달", select: false, type: "minutes", count: 180, unit: 240 },
  { name: "3달", select: false, type: "days", count: 90, unit: 0 },
  { name: "1년", select: false, type: "days", count: 365, unit: 0 },
  { name: "3년", select: false, type: "weeks", count: 157, unit: 0 },
];
export const lineChartControllerOptionAtom = atom(lineChartControllerOptions);
export const selectedLineChartOptionAtom = atom((get) => {
  const options = get(lineChartControllerOptionAtom);
  return options.find((option) => option.select) || options[1];
});

// exchange header
export const isHeaderInfoVisibleAtom = atom(false);
export const isHeaderBorderVisibleAtom = atom(false);

// trade
export const tradeListVolumeDisplayModeAtom = atom(true);

// orderbook
export const orderbookVolumeDisplayModeAtom = atom(true);

// 주문
export const orderTypeAtom = atom<"ask" | "bid">("bid");
export const orderAmountOptionsAtom = atom([
  { name: "25%", select: false, value: 25 },
  { name: "50%", select: false, value: 50 },
  { name: "75%", select: false, value: 75 },
  { name: "100%", select: false, value: 100 },
]);
