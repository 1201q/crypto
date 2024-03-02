import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isLoginAtom = atom(false);
export const isGoogleLoginLoadingAtom = atomWithStorage(
  "isGoogleLoginLoading",
  false
);
