import { atom } from "jotai";

export const headerHeightAtom = atom(50);
export const bottomTabHeightAtom = atom(50);

// market

export const coinListControllerHeightAtom = atom(50);
export const coinListHeightAtom = atom((get) => {
  const otherComponentHeight =
    get(bottomTabHeightAtom) +
    get(headerHeightAtom) +
    get(coinListControllerHeightAtom);

  return `calc(100% - ${otherComponentHeight}px)`;
});
