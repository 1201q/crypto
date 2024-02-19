import { PrimitiveAtom, useAtom } from "jotai";
import createWebsocket from "./createWebsocket";
import {
  ExtendedOrderBookDataType,
  ExtendedTradeDataType,
  WebsocketType,
  SetAtomType,
  ExtendedTickerDataType,
} from "@/types/types";
import { useRef } from "react";

const TradeArray_MaxLength = 50;

interface HookReturnType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useUpbit = <T>(
  type: WebsocketType,
  code: string[] | string,
  atom: PrimitiveAtom<T>,
  isWsOpenAtom: PrimitiveAtom<boolean>
): HookReturnType => {
  const wsRef = useRef<WebSocket | null>(null);
  const [, setData] = useAtom(atom);
  const [isOpen, setIsOpen] = useAtom(isWsOpenAtom);

  const open = async () => {
    if (!wsRef.current || wsRef.current.readyState !== 1) {
      const ws = await openWebsocket(type, code);

      if (ws?.readyState === 1) {
        wsRef.current = ws;
        setIsOpen(true);
        getTickerData(wsRef.current, setData);
      }
    }
  };

  const close = async () => {
    if (wsRef.current) {
      wsRef.current.close();
      setData([] as T);
      setIsOpen(false);
    }
  };

  return { open, close, isOpen };
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
    const type = blobToJson?.ty;

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

const handleOrderbookUpdateEvent = (
  data: ExtendedOrderBookDataType,
  setData: SetAtomType<ExtendedOrderBookDataType[]>
) => {
  setData([data]);
};

const handleTradeUpdateEvent = (
  data: ExtendedTradeDataType,
  setData: SetAtomType<ExtendedTradeDataType[]>
) => {
  setData((prev) => {
    const updateData = [data, ...prev];

    if (updateData.length > TradeArray_MaxLength) {
      updateData.pop();
    }
    return updateData;
  });
};
