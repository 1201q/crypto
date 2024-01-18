import { atom } from "jotai";

const menu = [
  { name: "마켓", icon: "home", routing: "/exchange" },
  { name: "지갑", icon: "wallet", routing: "/wallet" },
  { name: "커뮤니티", icon: "community", routing: "/community" },
  { name: "메뉴", icon: "menu", routing: "/menu" },
];

export const tabMenuAtom = atom(menu);
export const pathnameAtom = atom<string | null>(null);
