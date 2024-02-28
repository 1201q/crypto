import { atom } from "jotai";
import { singleWebsocketDataAtom } from "./websocket";

export const queryCodeAtom = atom<string | undefined>("");

export const isCorrectPage = atom(
  (get) => get(queryCodeAtom) === get(singleWebsocketDataAtom)?.ticker?.cd
);

// coinList
const options = [
  { name: "거래대금", en: "acc", select: true },
  { name: "상승", en: "up", select: false },
  { name: "하락", en: "down", select: false },
];
export const sortOptionAtom = atom(options);

// bottom tab
const menu = [
  { name: "마켓", icon: "home", routing: "/market" },
  { name: "지갑", icon: "wallet", routing: "/wallet" },
  { name: "커뮤니티", icon: "community", routing: "/community" },
  { name: "메뉴", icon: "menu", routing: "/menu" },
];
export const tabMenuAtom = atom(menu);
export const pathnameAtom = atom<string | null>(null);

// search
export const searchInputValueAtom = atom<string>("");

// exchange header
export const isHeaderInfoVisibleAtom = atom(false);
export const isHeaderBorderVisibleAtom = atom(false);

// trade
export const tradeListVolumeDisplayModeAtom = atom(true);

// orderbook
export const orderbookVolumeDisplayModeAtom = atom(true);

// chart controller
const lineChartControllerOptions = [
  { name: "1주", select: true, type: "minutes", count: 169, unit: 60 },
  { name: "1달", select: false, type: "minutes", count: 180, unit: 240 },
  { name: "3달", select: false, type: "days", count: 90, unit: 0 },
  { name: "1년", select: false, type: "days", count: 365, unit: 0 },
  { name: "3년", select: false, type: "weeks", count: 157, unit: 0 },
];
export const lineChartControllerOptionAtom = atom(lineChartControllerOptions);
export const selectedLineChartOptionAtom = atom((get) => {
  const options = get(lineChartControllerOptionAtom);
  return options.find((option) => option.select) || options[1];
});
