import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import dayjs from "dayjs";
import { CandleDataType } from "@/types/types";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MAX_REQUEST = 200;

interface ParamsType {
  market: string;
  count: number;
  to: string;
}

interface QueryType {
  type?: string;
  market?: string;
  count?: number;
  minutes?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, market, count, minutes } = req.query as QueryType;
  const isMinutes = type === "minutes";
  const unit = typeof minutes === "number" ? minutes : 1;

  const params: ParamsType = {
    market: market as string,
    count: typeof count === "string" ? parseInt(count, 10) || 1 : 1,
    to: dayjs().tz().format(""),
  };

  const API_URL = process.env.BONG_API_URL;

  try {
    let returnData: CandleDataType[] = [];

    while (params.count > 0) {
      const URL = isMinutes
        ? `${API_URL}/${type}/${minutes}`
        : `${API_URL}/${type}`;
      const date = isMinutes ? -unit : type === "days" ? -23 : -1;
      const dateType = isMinutes
        ? `minutes`
        : type === "days"
        ? "hours"
        : "days";

      const response = await axios.get(URL, { params });
      const data = response.data;

      returnData = [...returnData, ...data];

      params.to = dayjs(data[data.length - 1].candle_date_time_kst)
        .tz()
        .add(date, dateType)
        .format("");

      params.count = params.count - MAX_REQUEST;
    }

    console.log(returnData[returnData.length - 1]);
    res.status(200).json(returnData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
}
