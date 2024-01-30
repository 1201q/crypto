import axios from "axios";
import dayjs from "dayjs";
import { CandleDataType } from "@/types/types";

const LineChartFetcher = async (url: string) => {
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

export default LineChartFetcher;
