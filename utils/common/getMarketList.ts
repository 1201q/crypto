import axios from "axios";
import { MarketListDataType } from "@/utils/types/types";

type MarketType = "KRW" | "USDT" | "BTC";

export default async function getMarketList(type: MarketType) {
  try {
    const response = await axios.get<MarketListDataType[]>(
      "http://localhost:3000/api/markets"
    );
    const data = response.data;

    const filteredList = data.filter((coin) =>
      coin.market.includes(`${type}-`)
    );

    return filteredList;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    return null;
  }
}
