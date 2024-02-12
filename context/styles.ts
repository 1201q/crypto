import { atom } from "jotai";

export const headerHeightAtom = atom(50);
export const bottomTabHeightAtom = atom(50);
export const tradeListHeaderHeightAtom = atom(45);
export const orderbookTopHeaderHeightAtom = atom(50);

// market
export const coinListControllerHeightAtom = atom(50);
export const coinListHeightAtom = atom((get) => {
  const otherComponentHeight =
    get(bottomTabHeightAtom) +
    get(headerHeightAtom) +
    get(coinListControllerHeightAtom);

  return `calc(100% - ${otherComponentHeight}px)`;
});

export const tradeListHeightAtom = atom((get) => {
  const otherComponentHeight =
    get(tradeListHeaderHeightAtom) + get(headerHeightAtom);

  return `calc(100% - ${otherComponentHeight}px)`;
});

export const orderbookListHeightAtom = atom((get) => {
  const otherComponentHeight =
    get(orderbookTopHeaderHeightAtom) + get(headerHeightAtom);

  return `calc(100% - ${otherComponentHeight}px)`;
});
