import { MutableRefObject, useEffect } from "react";
import { closeWebsocket, openWebsocket } from "./websocketUtils";
import { useAtom } from "jotai";
import {
  OrderBookDataType,
  TickerDataType,
  TradeDataType,
  WebsocketType,
} from "@/types/types";

interface HookReturnType {
  data: TickerDataType[] | TradeDataType[] | OrderBookDataType[];
  open: () => void;
  close: () => void;
}

export const useUpbit = (
  type: WebsocketType,
  code: string[] | string,
  wsRef: MutableRefObject<WebSocket | null | undefined>,
  atom: ReturnType<typeof useAtom>[0]
): HookReturnType => {
  const [data, setData] = useAtom<
    TickerDataType[] | TradeDataType[] | OrderBookDataType[]
  >(atom);

  // 반환함수
  const closeWs = () => {
    if (wsRef.current) {
      closeWebsocket(wsRef, setData);
    }
  };

  const openWs = () => {
    if (!wsRef.current || wsRef.current.readyState !== 1) {
      openWebsocket(type, code, wsRef, setData);
    }
  };

  return { data: data, open: openWs, close: closeWs };
};
