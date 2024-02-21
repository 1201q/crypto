import { useAtomValue, Atom } from "jotai";
import { useCallback, useMemo } from "react";
import { selectTickerDataAtom } from "./atoms";
import { selectAtom } from "jotai/utils";
import dayjs from "dayjs";
import { ExtendedTickerDataType } from "@/types/types";
import {
  selectOrderbookSizeAtom,
  selectOrderbookBarWidthAtom,
  selectOrderbookPriceAtom,
} from "@/context/orderbook";

const useSelectAtom = <T, R>(atom: Atom<T>, keyFn: (data: T) => R) => {
  return useAtomValue(selectAtom(atom, useCallback(keyFn, [])));
};

export const usePrice = <K extends keyof ExtendedTickerDataType>(
  key: K
): ExtendedTickerDataType[K] | undefined => {
  return useSelectAtom(selectTickerDataAtom, (d) => {
    return d?.[key];
  });
};

export const useLatest = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => {
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
  type: "size" | "width" | "price",
  index: number
) => {
  switch (type) {
    case "size":
      return useAtomValue(
        useMemo(() => selectOrderbookSizeAtom(index), [index])
      );
    case "width":
      return useAtomValue(
        useMemo(() => selectOrderbookBarWidthAtom(index), [index])
      );
    case "price":
      return useAtomValue(
        useMemo(() => selectOrderbookPriceAtom(index), [index])
      );
  }
};
