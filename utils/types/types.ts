export type WebsocketType = "ticker" | "trade" | "orderbook";
export type MarketType = "KRW" | "USDT" | "BTC";
export type CoinListType = string[] | string;

// https://velog.io/@leehyewon0531/Cannot-find-name-SetAtom
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

export interface ServerSideProps {
  isLogin?: boolean;
  uid?: string | null;
  coinList: CoinListResponseType;
  queryCode: string;
}

export interface CoinListResponseType {
  code: string[];
  data: MarketListDataType[];
}

export interface MarketListDataType {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface TickerDataType {
  acc_ask_volume: number;
  acc_bid_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  ask_bid: "ASK" | "BID";
  change: "EVEN" | "RISE" | "FALL";
  change_price: number;
  change_rate: number;
  code: string;
  delisting_date: string | null;
  high_price: number;
  highest_52_week_date: string;
  highest_52_week_price: number;
  is_trading_suspended: boolean;
  low_price: number;
  lowest_52_week_date: string;
  lowest_52_week_price: number;
  market_state: string;
  market_warning: string;
  opening_price: number;
  prev_closing_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  stream_type: "SNAPSHOT" | "REALTIME";
  timestamp: number;
  trade_date: string;
  trade_price: number;
  trade_time: string;
  trade_timestamp: number;
  trade_volume: number;
  type: "ticker";
}
