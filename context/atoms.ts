import { atom } from "jotai";
import { singleWebsocketDataAtom } from "./websocket";
import { MarketListDataType } from "@/types/types";
import { atomWithHash } from "jotai-location";

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
const defaultSortOptionAtom = atom(options);
export const sortOptionAtom = atom(
  (get) => get(defaultSortOptionAtom),
  (_get, set, index) => {
    set(defaultSortOptionAtom, (prev: typeof options) => {
      return prev.map((o, oi) => ({
        ...o,
        select: oi === index,
      }));
    });
  }
);

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
const defaultLineChartControllerOptionAtom = atom(lineChartControllerOptions);
export const lineChartControllerOptionAtom = atom(
  (get) => get(defaultLineChartControllerOptionAtom),
  (_get, set, index) => {
    set(defaultLineChartControllerOptionAtom, (prev) => {
      return prev.map((o, oi) => ({
        ...o,
        select: oi === index,
      }));
    });
  }
);
export const selectedLineChartOptionAtom = atom((get) => {
  const options = get(lineChartControllerOptionAtom);
  return options.find((option) => option.select) || options[1];
});

const assetOption = [
  { name: "평가금액순", select: true },
  { name: "수익률순", select: false },
  { name: "평가손익순", select: false },
  { name: "이름순", select: false },
];
const defaultAssetSortOptionAtom = atom(assetOption);
export const assetSortOptionAtom = atom(
  (get) => get(defaultAssetSortOptionAtom),
  (_get, set, index) => {
    set(defaultAssetSortOptionAtom, (prev: typeof assetOption) => {
      return prev.map((o, oi) => ({
        ...o,
        select: oi === index,
      }));
    });
  }
);
const tradeOption = [
  { name: "전체", select: true },
  { name: "매수", select: false },
  { name: "매도", select: false },
  { name: "입금(원화)", select: false },
];
const defaultTradeSortOptionAtom = atom(tradeOption);
export const tradeSortOptionAtom = atom(
  (get) => get(defaultTradeSortOptionAtom),
  (_get, set, index) => {
    set(defaultTradeSortOptionAtom, (prev: typeof tradeOption) => {
      return prev.map((o, oi) => ({
        ...o,
        select: oi === index,
      }));
    });
  }
);
export const selectTradeSortOption = atom((get) =>
  get(tradeSortOptionAtom).find((option) => option.select)
);
export const selectAssetSortOption = atom((get) =>
  get(assetSortOptionAtom).find((option) => option.select)
);
export const selectTradeCoinOption = atom(null);

export const selectSortCoinAtom = atom<null | MarketListDataType>(null);

export const modalAtom = atomWithHash("modal", "");
