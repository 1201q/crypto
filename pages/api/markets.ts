import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { MarketListDataType } from "@/utils/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const API_URL = "https://api.upbit.com/v1/market/all";
    const response = await axios.get<MarketListDataType[]>(API_URL);
    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
