import axios from "axios";
import dayjs from "dayjs";
import { CandleDataType } from "@/types/types";

interface OptionType {
  name: string;
  select: boolean;
  type: string;
  count: number;
  unit: number;
}

const getLineChartData = async (
  option: OptionType,
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
    throw error;
  }
};

const duplicated = (array: any) => {
  const timeSet = new Set();

  for (const obj of array) {
    if (timeSet.has(obj.time)) {
      return true;
    }
    timeSet.add(obj.time);
  }
  return false;
};

export default getLineChartData;
