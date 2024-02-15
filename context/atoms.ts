import { atom } from "jotai";
import {
  OrderBookDataType,
  TickerDataType,
  TradeDataType,
  MarketListDataType,
} from "../types/types";

// https://velog.io/@bnb8419/Jotai-%EC%82%AC%EC%9A%A9%EB%B2%95#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%82%B4%EC%97%90%EC%84%9C-atom%EC%83%9D%EC%84%B1

// coin data
export const allTickerDataAtom = atom<TickerDataType[]>([]);
export const selectTickerDataAtom = atom((get) => {
  const allTickerData = get(allTickerDataAtom);
  const queryCode = get(queryCodeAtom);

  return allTickerData.find((coin) => coin?.code === queryCode);
});

export const tradeDataAtom = atom<TradeDataType[]>([]);

// orderbook
export const orderbookDataAtom = atom<OrderBookDataType[]>([]);

// 오더북 렌더 atom입니다.
// 값으로 price와 size를 가짐.
export const orderbookUnitsAtom = atom<any[]>((get) => {
  const units = get(orderbookDataAtom)[0]?.orderbook_units;

  const ask =
    units?.reverse().map((d, i) => {
      return { price: d.ask_price, size: d.ask_size };
    }) || [];

  const bid =
    units
      ?.map((d, i) => {
        return { price: d.bid_price, size: d.bid_size };
      })
      .reverse() || [];

  return ask?.concat(bid);
});

// 오더북의 ask, bid, ask+bid 사이즈를 반환
export const orderbookSizeAtom = atom<any>((get) => {
  const units = get(orderbookDataAtom)[0];

  return {
    ask: units?.total_ask_size,
    bid: units?.total_bid_size,
    sum: units?.total_ask_size + units?.total_bid_size,
  };
});

// 오더북 헤더가 가격모드일때 표시되는 가격
// 판매측 총액, 구매측 총액
export const orderbookPriceModeAtom = atom<any>((get) => {
  const units = get(orderbookUnitsAtom);
  const length = units?.length / 2;
  const array =
    units?.map((d) => {
      return d?.price * d?.size;
    }) || [];

  const ask =
    array.slice(0, length).reduce((acc, unit) => {
      return acc + unit;
    }, 0) || undefined;
  const bid =
    array.slice(length).reduce((acc, unit) => {
      return acc + unit;
    }, 0) || undefined;

  return { ask, bid };
});

// 오더북 bar의 width를 반환
export const orderbookBarWidthAtom = atom<any>((get) => {
  const units = get(orderbookUnitsAtom);
  const size = get(orderbookSizeAtom);
  let over100Array: number[] = [];

  const array = units.map((u) => {
    const width = (u?.size / size?.sum) * 700;

    if (width > 100) {
      over100Array.push(width);
    }
    return width;
  });

  const calculateValue =
    over100Array.length === 0 ? 1 : 100 / Math.max(...over100Array);

  const result = array.map((u) => {
    return u * calculateValue;
  });

  return result;
});

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
