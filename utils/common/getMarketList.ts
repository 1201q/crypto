import axios from "axios";
import { MarketListDataType } from "@/utils/types/types";

type MarketType = "KRW" | "USDT" | "BTC";
interface CoinListResponseType {
  code: string[];
  data: MarketListDataType[];
}

export default async function getMarketList(
  type: MarketType
): Promise<CoinListResponseType> {
  try {
    const API_URL = "http://localhost:3000/api/markets";
    const response = await axios.get<MarketListDataType[]>(API_URL);
    const data = response.data;

    const filteredList = data.filter((coin) =>
      coin.market.includes(`${type}-`)
    );

    const codeList = filteredList.map((coin) => coin.market);

    return { code: codeList, data: filteredList };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return { code: [], data: [] };
  }
}
