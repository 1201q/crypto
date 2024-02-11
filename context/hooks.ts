import { useAtomValue, Atom } from "jotai";
import { useCallback } from "react";
import { selectTickerDataAtom } from "./atoms";
import { selectAtom } from "jotai/utils";
import dayjs from "dayjs";
import { TickerDataType } from "@/types/types";

const useSelectAtom = <T, R>(atom: Atom<T>, keyFn: (data: T) => R) => {
  return useAtomValue(selectAtom(atom, useCallback(keyFn, [])));
};

export const usePrice = <K extends keyof TickerDataType>(
  key: K
): TickerDataType[K] | undefined => {
  return useSelectAtom(selectTickerDataAtom, (d) => {
    return d?.[key];
  });
};

export const useLatest = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => {
    return {
      value: d?.trade_price || 0,
      time: dayjs(d?.trade_timestamp).add(-9, "hour").unix(),
      open: d?.opening_price || 0,
      close: d?.trade_price || 0,
      high: d?.high_price || 0,
      low: d?.low_price || 0,
    };
  });
};
