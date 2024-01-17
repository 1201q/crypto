import { atom } from "jotai";

const options = [
  { name: "거래대금", en: "acc", select: true },
  { name: "상승", en: "up", select: false },
  { name: "하락", en: "down", select: false },
];

export const sortOptionAtom = atom(options);
