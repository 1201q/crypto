import { v4 as uuid_v4 } from "uuid";
import { WebsocketType, CoinListType } from "../types/types";

export default async function createWebsocket(
  type: WebsocketType,
  coinList: CoinListType
): Promise<WebSocket> {
  const WS_URL = "wss://api.upbit.com/websocket/v1";

  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(WS_URL);
      const initData = `[{"ticket" : ${uuid_v4()}}, {"type" : ${type}, "codes": [${coinList}]}]`;

      ws.onopen = () => {
        ws.send(initData);
        resolve(ws);
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
