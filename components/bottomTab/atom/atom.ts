import { atom } from "jotai";

const menu = [
  { name: "마켓", select: false, icon: "home" },
  { name: "지갑", select: false, icon: "wallet" },
  { name: "커뮤니티", select: false, icon: "community" },
  { name: "메뉴", select: false, icon: "menu" },
];

export const tabMenuAtom = atom(menu);
