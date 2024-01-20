import axios from "axios";
import { MarketListDataType } from "@/types/types";

export default async function getMarketList() {
  try {
    const response = await axios.get<MarketListDataType[]>("/api/markets");
    const data = response.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError<MarketListDataType[], any>(error)) {
      console.log(error);
    }
    return null;
  }
}
