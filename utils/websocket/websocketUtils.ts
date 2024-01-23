import { PrimitiveAtom, useAtom } from "jotai";
import createWebsocket from "./createWebsocket";
import {
  OrderBookDataType,
  TickerDataType,
  TradeDataType,
  WebsocketType,
  SetAtomType,
} from "@/types/types";
import { useRef } from "react";

interface HookReturnType {
  open: () => void;
  close: () => void;
  isWsOpen: boolean;
}

export const useUpbit = <T>(
  type: WebsocketType,
  code: string[] | string,
  atom: PrimitiveAtom<T>,
  isWsOpenAtom: PrimitiveAtom<boolean>
): HookReturnType => {
  const wsRef = useRef<WebSocket | null>(null);
  const [, setData] = useAtom(atom);
  const [isWsOpen, setIsWsOpen] = useAtom(isWsOpenAtom);

  const open = async () => {
    if (!wsRef.current || wsRef.current.readyState !== 1) {
      const ws = await openWebsocket(type, code);

      if (ws?.readyState === 1) {
        wsRef.current = ws;
        setIsWsOpen(true);
        getTickerData(wsRef.current, setData);
      }
    }
  };

  const close = async () => {
    if (wsRef.current) {
      wsRef.current.close();
      setData([] as T);
      setIsWsOpen(false);
    }
  };

  return { open, close, isWsOpen };
};

const openWebsocket = async (type: WebsocketType, code: string[] | string) => {
  const websocket = await createWebsocket(type, code);
  if (websocket.readyState === 1) {
    return websocket;
  }
};

const getTickerData = (ws: WebSocket, setData: SetAtomType<any>) => {
  ws.onmessage = async (event: any) => {
    const { data } = event;
    const blobToJson = await new Response(data).json();
    const type = blobToJson?.type;

    switch (type) {
      case "ticker":
        handleTickerUpdateEvent(blobToJson, setData);
        return;
      case "orderbook":
        handleOrderbookUpdateEvent(blobToJson, setData);
        return;
      case "trade":
        handleTradeUpdateEvent(blobToJson, setData);
        return;
      default:
        return;
    }
  };
};

const handleTickerUpdateEvent = (
  data: TickerDataType,
  setData: SetAtomType<TickerDataType[]>
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
  setData: SetAtomType<OrderBookDataType[]>
) => {
  setData([data]);
};

const handleTradeUpdateEvent = (
  data: TradeDataType,
  setData: SetAtomType<TradeDataType[]>
) => {
  setData((prev) => [...prev, data]);
};
