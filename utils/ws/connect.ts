import { WebsocketType } from "@/types/types";
import { v4 as uuid_v4 } from "uuid";

export default async function connectWebsocket(
  type: WebsocketType[],
  coinList: string[] | string
): Promise<WebSocket> {
  const WS_URL = "wss://api.upbit.com/websocket/v1";

  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(WS_URL);
      const initData = `[{"ticket" : ${uuid_v4()}}, ${getFields(
        type,
        coinList
      )} {"format" : SIMPLE }]`;

      ws.onopen = () => {
        ws.send(initData);
        resolve(ws);
        console.error(`[${type}] 웹소켓 열림: `, ws);
      };

      ws.onerror = (error) => {
        console.error(`[${type}] 웹소켓 오류: `, error);
        reject(error);
      };
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

const getFields = (type: WebsocketType[], coinList: string[] | string) => {
  const types = type.map((ty) => `{"type" : ${ty}, "codes":[${coinList}]},`);
  return types.join(" ");
};
