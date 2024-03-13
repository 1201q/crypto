import { atom } from "jotai";
import { queryCodeAtom } from "./atoms";
import { tickerDataAtom } from "./websocket";

// 현재 선택한 섹션이 판매인지 구매인지
export const orderSideAtom = atom<"buy" | "sell">("buy");
export const orderAmountOptionsAtom = atom([
  { name: "25%", select: false, value: 25 },
  { name: "50%", select: false, value: 50 },
  { name: "75%", select: false, value: 75 },
  { name: "100%", select: false, value: 100 },
]);

// 노출할 키보드 타입
export const orderKeyboardTypeAtom = atom<"total" | "amount">("total");

// amount
export const orderAmountAtom = atom<string>("0");

// total
export const orderTotalAtom = atom<string>("0");

// input에 보일 display용 amount
export const displayOrderAmountAtom = atom((get) => {
  const amount = get(orderAmountAtom);
  const incluesPoint = amount.includes(".");
  const int = Number(amount.split(".")[0]).toLocaleString();
  const decimal =
    incluesPoint && amount.split(".")[1] === ""
      ? "."
      : `.${amount.split(".")[1]}`;

  return !incluesPoint ? int : int + decimal;
});

export const buyOrderDataAtom = atom((get) => {
  const side = get(orderSideAtom);
  const queryCode = get(queryCodeAtom);
  const type = "market";
  const price = get(tickerDataAtom)?.tp || 0;
  const total = Number(get(orderTotalAtom));

  return { code: queryCode, type, side, price, total };
});

export const sellOrderDataAtom = atom((get) => {
  const side = get(orderSideAtom);
  const queryCode = get(queryCodeAtom);
  const type = "market";
  const price = get(tickerDataAtom)?.tp || 0;
  const total = Number(get(orderAmountAtom));

  return { code: queryCode, type, side, price, total };
});
