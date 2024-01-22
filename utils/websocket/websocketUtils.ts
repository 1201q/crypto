import { MutableRefObject } from "react";
import {
  SetAtom,
  WebsocketType,
  TickerDataType,
  TradeDataType,
  OrderBookDataType,
} from "../../types/types";
import { SetStateAction } from "jotai";
import createWebsocket from "./createWebsocket";

type SetStateType = TickerDataType[] | TradeDataType[] | OrderBookDataType[];

export const openWebsocket = async (
  type: WebsocketType,
  code: string[] | string,
  wsRef: MutableRefObject<WebSocket | null | undefined>,
  setData:
    | SetAtom<[SetStateAction<any>], void>
    | React.Dispatch<React.SetStateAction<any>>,
  setIsOpen?:
    | SetAtom<[SetStateAction<any>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  const ws = await createWebsocket(type, code);

  if (ws) {
    wsRef.current = ws;
    getTickerData(wsRef.current, setData);

    if (setIsOpen) {
      setIsOpen(true);
    }
  }
};

export const closeWebsocket = (
  wsRef: MutableRefObject<WebSocket | null | undefined>,
  setState:
    | SetAtom<[SetStateAction<any>], void>
    | React.Dispatch<React.SetStateAction<any>>,
  setIsOpen?:
    | SetAtom<[SetStateAction<any>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  if (wsRef.current) {
    wsRef.current.close();
    setState([]);
    if (setIsOpen) {
      setIsOpen(false);
    }
  }
};

const getTickerData = (
  ws: WebSocket,
  setData:
    | SetAtom<[SetStateAction<any>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  ws.onmessage = async (event: any) => {
    const { data } = event;
    const blobToJson = await new Response(data).json();

    if (blobToJson.type === "ticker") {
      handleTickerUpdateEvent(blobToJson, setData);
    } else if (blobToJson.type === "trade") {
      handleTradeUpdateEvent(blobToJson, setData);
    } else if (blobToJson.type === "orderbook") {
      handleOrderbookUpdateEvent(blobToJson, setData);
    }
  };
};

const handleTickerUpdateEvent = (
  data: TickerDataType,
  setData:
    | SetAtom<[SetStateAction<TickerDataType[]>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  if (data.stream_type === "SNAPSHOT") {
    setData((prev) => [...prev, data]);
  } else {
    setData((prev) => {
      const updatedArr = prev.map((coin) => {
        if (coin.code === data.code) {
          return { ...data };
        }
        return coin;
      });
      return updatedArr;
    });
  }
};

const handleOrderbookUpdateEvent = (
  data: OrderBookDataType,
  setData:
    | SetAtom<[SetStateAction<SetStateType>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  setData([data]);
};

const handleTradeUpdateEvent = (
  data: TradeDataType,
  setData:
    | SetAtom<[SetStateAction<TradeDataType[]>], void>
    | React.Dispatch<React.SetStateAction<any>>
) => {
  setData((prev) => [...prev, data]);
};
