import { MutableRefObject, useRef } from "react";
import { closeWebsocket, openWebsocket } from "./websocketUtils";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import {
  OrderBookDataType,
  TickerDataType,
  TradeDataType,
  WebsocketType,
} from "@/types/types";

interface HookReturnType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useUpbit = (
  type: WebsocketType,
  code: string[] | string,
  atom: PrimitiveAtom<any[]>,
  isOpenAtom: PrimitiveAtom<boolean>
): HookReturnType => {
  const [data, setData] = useAtom<
    TickerDataType[] | TradeDataType[] | OrderBookDataType[]
  >(atom);
  const [isOpen, setIsOpen] = useAtom<boolean>(isOpenAtom);
  const wsRef = useRef<WebSocket | null>(null);

  // 반환함수
  const closeWs = () => {
    if (wsRef.current) {
      closeWebsocket(wsRef, setData, setIsOpen);
    }
  };

  const openWs = () => {
    if (!wsRef.current || wsRef.current.readyState !== 1) {
      openWebsocket(type, code, wsRef, setData, setIsOpen);
    }
  };

  return { open: openWs, close: closeWs, isOpen: isOpen };
};
