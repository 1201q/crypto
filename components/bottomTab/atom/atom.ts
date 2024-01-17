import { atom } from "jotai";

const menu = [
  { name: "관심", select: false, icon: "star" },
  { name: "지갑", select: false, icon: "wallet" },
  { name: "마켓", select: true, icon: "chart" },
  { name: "커뮤니티", select: false, icon: "world" },
  { name: "메뉴", select: false, icon: "menu" },
];

export const tabMenuAtom = atom(menu);
