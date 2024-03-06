import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const authStore = createStore();

export const isLoginAtom = atom(false);
export const isFirstLoginAtom = atom(false);

export const isGoogleLoginLoadingAtom = atomWithStorage(
  "isGoogleLoginLoading",
  false
);

export const isLoginPlzPopupDisplayAtom = atomWithStorage(
  "isLoginPlzPopupDisplay",
  true
);
