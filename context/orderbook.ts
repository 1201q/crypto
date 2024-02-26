import { atom } from "jotai";
import { getRoundedDecimal } from "@/utils/common/decimal";

import { orderbookDataAtom } from "./websocket";

interface OrderbookUnitsType {
  price: number;
  size: number;
}

// 오더북  atom입니다.
// 값으로 price와 size를 가짐.
export const orderbookUnitsAtom = atom<OrderbookUnitsType[]>((get) => {
  const units = get(orderbookDataAtom)?.obu;

  const ask =
    units?.reverse().map((d, i) => {
      return { price: d.ap, size: d.as };
    }) || [];

  const bid =
    units
      ?.map((d, i) => {
        return { price: d.bp, size: d.bs };
      })
      .reverse() || [];

  return ask?.concat(bid);
});

// 오더북 bar의 width를 반환
const orderbookBarWidthAtom = atom<number[]>((get) => {
  const units = get(orderbookUnitsAtom);
  const size = get(orderbookSizeAtom);

  const array = units.map((u) => (u?.size / size?.sum) * 700);

  const maxOver100 = Math.max(...array.filter((width) => width > 100), 0);
  const calculateValue = maxOver100 > 0 ? 100 / maxOver100 : 1;

  const result = array.map(
    (width) => getRoundedDecimal(width * calculateValue, 0) || 0
  );

  return result;
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

// 오더북의 ask, bid, ask+bid 사이즈를 반환
export const orderbookSizeAtom = atom<any>((get) => {
  const units = get(orderbookDataAtom);

  return {
    ask: units?.tas,
    bid: units?.tbs,
    sum: (units && units?.tas + units?.tbs) || 0,
  };
});

export const selectOrderbookPriceAtom = (index: number) =>
  atom((get) => get(orderbookUnitsAtom)[index]?.price);

export const selectOrderbookSizeAtom = (index: number) =>
  atom((get) => get(orderbookUnitsAtom)[index]?.size);

export const selectOrderbookTotalAtom = (index: number) =>
  atom(
    (get) =>
      get(orderbookUnitsAtom)[index]?.price *
      get(orderbookUnitsAtom)[index]?.size
  );

export const selectOrderbookBarWidthAtom = (index: number) =>
  atom((get) => get(orderbookBarWidthAtom)[index]);

orderbookUnitsAtom.debugLabel = "units (price, size)";
orderbookBarWidthAtom.debugLabel = "units (bar width)";

orderbookPriceModeAtom.debugLabel = "price모드일때 가격총합";
orderbookSizeAtom.debugLabel = "ask, bid, sum ";
