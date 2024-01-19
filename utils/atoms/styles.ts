import { atom } from "jotai";

export const headerHeightAtom = atom(50);
export const bottomTabHeightAtom = atom(50);

// market
export const pageHeaderHeightAtom = atom(50);
export const coinListControllerHeightAtom = atom(55);
export const coinListHeightAtom = atom((get) => {
  const otherComponentHeight =
    get(bottomTabHeightAtom) +
    get(headerHeightAtom) +
    get(pageHeaderHeightAtom) +
    get(coinListControllerHeightAtom);

  return `calc(100% - ${otherComponentHeight}px)`;
});
