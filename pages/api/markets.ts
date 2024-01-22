import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import {
  MarketListDataType,
  MarketType,
  CoinListResponseType,
} from "@/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoinListResponseType>
) {
  const type = req.query?.type || "KRW";

  try {
    const API_URL = process.env.MARKETS_API_URL || "";
    const response = await axios.get<MarketListDataType[]>(API_URL);
    const data = response.data;

    const filteredList = data.filter((coin) =>
      coin.market.includes(`${type}-`)
    );

    const codeList = filteredList.map((coin) => coin.market);

    res.status(200).json({ code: codeList, data: filteredList });
    console.log("리스트 fetch 호출됨");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
    res.status(500).json({ code: [], data: [] });
  }
}
