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
    const width = u * calculateValue;
    return getRoundedDecimal(width, 0) || 0;
  });

  return result;
});

// 렌더용 atom입니다.
// price만 가짐.
export const orderbookPriceArrayAtom = atom((get) => {
  const units = get(orderbookUnitsAtom);
  return units.map((data) => {
    return data.price;
  });
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

export const selectOrderbookBarWidthAtom = (index: number) =>
  atom((get) => get(orderbookBarWidthAtom)[index]);
