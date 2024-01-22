import { CoinListResponseType } from "@/types/types";
import useSWR from "swr";

interface ListHookResponse {
  coinList: CoinListResponseType;
  isValidating: boolean;
}

export const useList = (): ListHookResponse => {
  const { data, error, isValidating, mutate } = useSWR("/api/markets", {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    dedupingInterval: 1800000,
  });
  return { coinList: data as CoinListResponseType, isValidating: isValidating };
};
