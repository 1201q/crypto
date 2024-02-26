import { useAtomValue, Atom } from "jotai";
import { useCallback, useMemo, useDeferredValue } from "react";
import { selectAtom } from "jotai/utils";
import dayjs from "dayjs";
import { ExtendedTickerDataType } from "@/types/types";
import {
  selectOrderbookSizeAtom,
  selectOrderbookBarWidthAtom,
  selectOrderbookPriceAtom,
  selectOrderbookTotalAtom,
} from "@/context/orderbook";

import { selectPriceAtom, tickerDataAtom } from "./websocket";

const useSelectAtom = <T, R>(atom: Atom<T>, keyFn: (data: T) => R) => {
  return useAtomValue(selectAtom(atom, useCallback(keyFn, [])));
};

export const usePrice = <K extends keyof ExtendedTickerDataType>(
  key: K
): ExtendedTickerDataType[K] | undefined => {
  return useAtomValue(useMemo(() => selectPriceAtom(key), [])) as
    | ExtendedTickerDataType[K]
    | undefined;
};

export const useLatest = () => {
  return useSelectAtom(tickerDataAtom, (d) => {
    return {
      value: d?.tp || 0,
      time: dayjs(d?.tms).add(-9, "hour").unix(),
      open: d?.op || 0,
      close: d?.tp || 0,
      high: d?.hp || 0,
      low: d?.lp || 0,
    };
  });
};

export const useOrderbook = (
  type: "size" | "width" | "price" | "total",
  index: number
) => {
  switch (type) {
    case "size":
      return useDeferredValue(
        useAtomValue(useMemo(() => selectOrderbookSizeAtom(index), []))
      );
    case "width":
      return useDeferredValue(
        useAtomValue(useMemo(() => selectOrderbookBarWidthAtom(index), []))
      );
    case "price":
      return useDeferredValue(
        useAtomValue(useMemo(() => selectOrderbookPriceAtom(index), []))
      );
    case "total":
      return useDeferredValue(
        useAtomValue(useMemo(() => selectOrderbookTotalAtom(index), []))
      );
  }
};
