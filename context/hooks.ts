import { useAtomValue, Atom } from "jotai";
import { useCallback } from "react";
import { selectTickerDataAtom } from "./atoms";
import { selectAtom } from "jotai/utils";
import dayjs from "dayjs";

const useSelectAtom = <T, R>(atom: Atom<T>, keyFn: (data: T) => R) => {
  return useAtomValue(selectAtom(atom, useCallback(keyFn, [])));
};

export const usePrice = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => d?.trade_price);
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

export const useChange = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => d?.change);
};

export const useChangePrice = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => d?.signed_change_price);
};

export const useChangePercent = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => d?.signed_change_rate);
};

export const useAccPriceSum = () => {
  return useSelectAtom(selectTickerDataAtom, (d) => d?.acc_trade_price_24h);
};
