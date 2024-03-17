import { WalletTradeDataType } from "@/types/types";
import dayjs from "dayjs";
import { atom } from "jotai";

export const walletTradeDataAtom = atom<WalletTradeDataType | null>(null);
export const walletTradeListDataAtom = atom((get) => {
  const tradeData = get(walletTradeDataAtom);
  const krw = tradeData?.krw || [];
  const trade = tradeData?.trade || [];
  const merge = [...krw, ...trade];
  return merge.sort(
    (a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix()
  );
});
