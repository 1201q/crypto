import useSWR from "swr";
import lineChartFetcher from "../common/lineChartFetcher";
import { LineChartPropsType } from "@/types/types";

interface ResponseType {
  data: LineChartPropsType[];
  isValidating: boolean;
}

export const useLineChart = (URL: string): ResponseType => {
  const { data, isValidating } = useSWR(URL, lineChartFetcher, {
    suspense: false,
    revalidateOnFocus: false,
    dedupingInterval: 20000,
  });
  return { data: data, isValidating };
};
