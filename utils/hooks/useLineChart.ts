import useSWR from "swr";
import { LineChartFetcher } from "../common/fetch";
import { LineChartPropsType } from "@/types/types";

interface ResponseType {
  data: LineChartPropsType[];
  isValidating: boolean;
}

export const useLineChart = (URL: string): ResponseType => {
  const { data, isValidating } = useSWR(URL, LineChartFetcher, {
    suspense: false,
    revalidateOnFocus: false,
    dedupingInterval: 20000,
  });
  return { data: data, isValidating };
};
