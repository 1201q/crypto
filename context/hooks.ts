import { useAtomValue, Atom, atom, SetStateAction } from "jotai";
import { useCallback } from "react";
import { selectTickerDataAtom } from "./atoms";
import { selectAtom } from "jotai/utils";
import dayjs from "dayjs";
import { ExtendedTickerDataType } from "@/types/types";

type DebounceAction<T> = {
  type: "debounce" | "immediate";
  value: T;
};

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

export function debounceAction<T>(
  value: T,
  immediate: boolean | undefined = false
): DebounceAction<T> {
  return {
    type: immediate ? "immediate" : "debounce",
    value,
  };
}

export function atomWithDebounce<T>(
  initialValue: T,
  delayMilliseconds = 500,
  shouldDebounceOnReset = false
) {
  const prevTimeoutAtom = atom<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // DO NOT EXPORT currentValueAtom as using this atom to set state can cause
  // inconsistent state between currentValueAtom and debouncedValueAtom
  const _currentValueAtom = atom(initialValue);
  const baseDebouncedValueAtom = atom(initialValue);
  const isDebouncingAtom = atom(false);

  const debouncedValueAtom = atom(
    (get) => get(baseDebouncedValueAtom),
    (get, set, update: DebounceAction<SetStateAction<T>>) => {
      clearTimeout(get(prevTimeoutAtom));

      const prevValue = get(_currentValueAtom);
      const nextValue =
        typeof update.value === "function"
          ? (update.value as (prev: T) => T)(prevValue)
          : update.value;

      const onDebounceStart = () => {
        set(_currentValueAtom, nextValue);
        set(isDebouncingAtom, true);
      };

      const onDebounceEnd = () => {
        set(baseDebouncedValueAtom, nextValue);
        set(isDebouncingAtom, false);
      };

      onDebounceStart();

      if (
        (!shouldDebounceOnReset && nextValue === initialValue) ||
        update.type === "immediate"
      ) {
        onDebounceEnd();
        return;
      }

      const nextTimeoutId = setTimeout(() => {
        onDebounceEnd();
      }, delayMilliseconds);

      // set previous timeout atom in case it needs to get cleared
      set(prevTimeoutAtom, nextTimeoutId);
    }
  );

  // exported atom setter to clear timeout if needed
  const clearTimeoutAtom = atom(null, (get, set, _arg) => {
    clearTimeout(get(prevTimeoutAtom));
    set(isDebouncingAtom, false);
  });

  return {
    currentValueAtom: atom((get) => get(_currentValueAtom)),
    isDebouncingAtom,
    clearTimeoutAtom,
    debouncedValueAtom,
  };
}
