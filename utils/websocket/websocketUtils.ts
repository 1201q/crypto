import { MutableRefObject } from "react";
import {
  SetAtom,
  WebsocketType,
  TickerDataType,
  TradeDataType,
  OrderBookDataType,
} from "../types/types";
import { SetStateAction } from "jotai";
import createWebsocket from "./createWebsocket";

type SetStateType = TickerDataType[] | TradeDataType[] | OrderBookDataType[];

export const openWebsocket = async (
  type: WebsocketType,
  code: string[] | string,
  wsRef: MutableRefObject<WebSocket | null>,
  setState: SetAtom<[SetStateAction<any>], void>
) => {
  const ws = await createWebsocket(type, code);

  if (ws) {
    wsRef.current = ws;
    getTickerData(wsRef.current, setState);
  }
};

export const closeWebsocket = (
  wsRef: MutableRefObject<WebSocket | null>,
  setState: SetAtom<[SetStateAction<any>], void>
) => {
  if (wsRef.current) {
    wsRef.current.close();
    setState([]);
  }
};

const getTickerData = (
  ws: WebSocket,
  setState: SetAtom<[SetStateAction<any>], void>
) => {
  ws.onmessage = async (event: any) => {
    const { data } = event;
    const blobToJson = await new Response(data).json();

    if (blobToJson.type === "ticker") {
      handleTickerUpdateEvent(blobToJson, setState);
    } else if (blobToJson.type === "trade") {
      handleTradeUpdateEvent(blobToJson, setState);
    } else if (blobToJson.type === "orderbook") {
      handleOrderbookUpdateEvent(blobToJson, setState);
    }
  };
};

const handleTickerUpdateEvent = (
  data: TickerDataType,
  setState: SetAtom<[SetStateAction<TickerDataType[]>], void>
) => {
  if (data.stream_type === "SNAPSHOT") {
    setState((prev) => [...prev, data]);
  } else {
    setState((prev) => {
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
  setState: SetAtom<[SetStateAction<SetStateType>], void>
) => {
  setState([data]);
};

const handleTradeUpdateEvent = (
  data: TradeDataType,
  setState: SetAtom<[SetStateAction<TradeDataType[]>], void>
) => {
  setState((prev) => [...prev, data]);
};
