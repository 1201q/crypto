import { SetAtomType } from "../../types/types";
import {
  ExtendedOrderBookDataType,
  ExtendedTradeDataType,
  ExtendedTickerDataType,
} from "@/types/types";

type SingleDataType =
  | ExtendedTickerDataType
  | ExtendedOrderBookDataType
  | ExtendedTradeDataType;

interface SingleWsDataType {
  ticker: ExtendedTickerDataType | null;
  orderbook: ExtendedOrderBookDataType | null;
  trade: ExtendedTradeDataType[];
}

export default function updateWebsocketData(
  ws: WebSocket,
  wsType: "all" | "single",
  setData: SetAtomType<any>
) {
  ws.onmessage = async (event: any) => {
    const blob = event.data;
    const data = await new Response(blob).json();

    if (wsType === "all") {
      handleAllDataUpdateEvent(data, setData);
    } else if (wsType === "single") {
      handleSingleDataUpdateEvent(data, setData);
    }
  };
}

const handleAllDataUpdateEvent = (
  data: ExtendedTickerDataType,
  setData: SetAtomType<ExtendedTickerDataType[]>
) => {
  if (data.st === "SNAPSHOT") {
    setData((prev) => [...prev, data]);
  } else {
    setData((prev) => {
      const updatedArr = prev.map((coin) => {
        if (coin.cd === data.cd) {
          return { ...data };
        }
        return coin;
      });
      return updatedArr;
    });
  }
};

const handleSingleDataUpdateEvent = (
  data: SingleWsDataType,
  setData: SetAtomType<SingleWsDataType>
) => {
  setData(data);
};
