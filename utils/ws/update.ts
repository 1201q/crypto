import { SetAtomType } from "../../types/types";
import {
  ExtendedOrderBookDataType,
  ExtendedTradeDataType,
  ExtendedTickerDataType,
} from "@/types/types";

const TradeArray_MaxLength = 50;

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
  data: SingleDataType,
  setData: SetAtomType<SingleWsDataType>
) => {
  if (data.ty === "ticker") {
    setData((prev) => ({ ...prev, ticker: data as ExtendedTickerDataType }));
  } else if (data.ty === "orderbook") {
    setData((prev) => ({
      ...prev,
      orderbook: data as ExtendedOrderBookDataType,
    }));
  } else if (data.ty === "trade") {
    setData((prev) => {
      const updatedTrade = [
        data as ExtendedTradeDataType,
        ...(prev?.trade || []),
      ];

      if (updatedTrade.length > TradeArray_MaxLength) {
        updatedTrade.pop();
      }

      return {
        ...prev,
        trade: updatedTrade,
      };
    });
  }
};
