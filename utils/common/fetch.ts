import axios from "axios";
import dayjs from "dayjs";
import { CandleDataType } from "@/types/types";

export interface BongOptionType {
  name: string;
  select: boolean;
  type: string;
  count: number;
  unit: number;
}

export const fetcher = async (url: string) => {
  const URL = process.env.NEXT_PUBLIC_API_URL + url;
  return axios.get(URL).then((res) => res.data);
};

export const LineChartFetcher = async (url: string) => {
  const URL = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const res = await axios.get(URL);
    const data = res.data;
    const formatting = data.map((d: CandleDataType) => {
      return {
        time: dayjs(d.candle_date_time_utc).unix(),
        value: d.trade_price,
        close: d.trade_price,
        high: d.high_price,
        low: d.low_price,
        open: d.opening_price,
        volume: d.candle_acc_trade_volume,
      };
    });
    const reverse = formatting.reverse();

    return reverse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getBongFetchURL = (
  option: BongOptionType,
  selectCode: string | undefined
) => {
  const URL =
    option.type === "minutes"
      ? `/api/bong/minutes?minutes=${option.unit}`
      : `/api/bong/${option.type}`;
  const Param = `?market=${selectCode}&count=${option.count}`;
  return `${URL}${Param}`;
};

export const getLineChartData = async (
  option: BongOptionType,
  selectCode: string | undefined
) => {
  const URL =
    option.type === "minutes"
      ? `/api/bong/minutes?minutes=${option.unit}`
      : `/api/bong/${option.type}`;

  try {
    const res = await axios.get(
      `${URL}?market=${selectCode}&count=${option.count}`
    );
    const data = res.data;
    const formatting = data.map((d: CandleDataType) => {
      return {
        time: dayjs(d.candle_date_time_utc).unix(),
        value: d.trade_price,
      };
    });
    const reverse = formatting.reverse();

    return reverse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
