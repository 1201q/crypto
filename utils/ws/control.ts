import connectWebsocket from "./connect";
import { WebsocketType } from "@/types/types";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import updateWebsocketData from "./update";
import {
  allWebsocketAtom,
  allWebsocketDataAtom,
  singleWebsocketAtom,
  singleWebsocketDataAtom,
} from "@/context/websocket";
import { useResetAtom } from "jotai/utils";

const getWebsocket = (
  connectType: "all" | "single",
  code: string[] | string,
  wsAtom: PrimitiveAtom<WebSocket | null>,
  dataAtom: PrimitiveAtom<any>
) => {
  const [websocket, setWebsocket] = useAtom(wsAtom);
  const setData = useSetAtom(dataAtom);
  const ResetData = useResetAtom(dataAtom);

  const wsType: WebsocketType[] =
    connectType === "all" ? ["ticker"] : ["ticker", "orderbook", "trade"];

  const open = async () => {
    if (websocket && connectType !== "single") {
      await close();
    }

    if (!websocket) {
      const ws = await connectWebsocket(wsType, code);
      setWebsocket(ws);
      updateWebsocketData(ws, connectType, setData);
    }
  };

  const close = async () => {
    if (websocket?.readyState === 1) {
      websocket?.close();
      setWebsocket(null);
      ResetData();
    }
  };

  useEffect(() => {
    return () => {
      if (connectType === "all") {
        close();
      }
    };
  }, [websocket]);

  return { open, close };
};

export const useUpbitSingle = (code: string) => {
  return {
    single: getWebsocket(
      "single",
      code,
      singleWebsocketAtom,
      singleWebsocketDataAtom
    ),
  };
};

export const useUpbitAll = (codes: string[]) => {
  return {
    all: getWebsocket("all", codes, allWebsocketAtom, allWebsocketDataAtom),
  };
};
