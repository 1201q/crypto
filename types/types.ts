import { WritableAtom } from "jotai";
import { SetStateAction } from "jotai";

export type WebsocketType = "ticker" | "trade" | "orderbook";
export type MarketType = "KRW" | "USDT" | "BTC";
export type CoinListType = string[] | string;

// https://velog.io/@leehyewon0531/Cannot-find-name-SetAtom
export type SetAtomType<T> = SetAtom<[SetStateAction<T>], void>;
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
export type ServerSideInitialValues = [
  WritableAtom<unknown, any[], any>,
  unknown
][];

export interface ServerSideProps {
  isLogin?: boolean;
  uid?: string | null;
  coinList?: CoinListResponseType;
  queryCode?: string;
  currentTab?: "asset" | "trade";
  access?: boolean;
  pathname?: string;
  keyword?: string | undefined;
  isFirstLogin?: boolean;
  tradeItemId?: string;
  fallback?: { [key: string]: CoinListResponseType };
}

export interface RedirectProps {
  destination: string;
  permanent: boolean;
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

// websocket에서 받아온 데이터의 타입
// *****************************************************************
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

export interface ExtendedTickerDataType extends TickerDataType {
  ty: string;
  cd: string;
  op: number;
  hp: number;
  lp: number;
  tp: number;
  pcp: number;
  c: "RISE" | "EVEN" | "FALL";
  cp: number;
  scp: number;
  cr: number;
  scr: number;
  tv: number;
  atv: number;
  atv24h: number;
  atp: number;
  atp24h: number;
  tdt: string;
  ttm: string;
  ttms: number;
  ab: "ASK" | "BID";
  aav: number;
  abv: number;
  h52wp: number;
  h52wdt: string;
  l52wp: number;
  l52wdt: string;
  ts?: string;
  ms: "PREVIEW" | "ACTIVE" | "DELISTED";
  msfi?: string;
  its: boolean;
  dd: string | null;
  mw: "NONE" | "CAUTION";
  tms: number;
  st: "SNAPSHOT" | "REALTIME";
}

export interface TradeDataType {
  ask_bid: "ASK" | "BID";
  change: "EVEN" | "RISE" | "FALL";
  change_price: number;
  code: string;
  prev_closing_price: number;
  sequential_id: number;
  stream_type: "SNAPSHOT" | "REALTIME";
  timestamp: number;
  trade_date: string;
  trade_price: number;
  trade_time: string;
  trade_timestamp: number;
  trade_volume: number;
  type: "trade";
}

export interface ExtendedTradeDataType extends TradeDataType {
  ab: "ASK" | "BID";
  c: "EVEN" | "RISE" | "FALL";
  cp: number;
  cd: string;
  pcp: number;
  sid: number;
  st: "SNAPSHOT" | "REALTIME";
  tms: number;
  td: string;
  tp: number;
  ttm: string;
  ttms: number;
  tv: number;
  ty: "trade";
}

type ExtendedOrderBookUnit = {
  ap: number;
  bp: number;
  as: number;
  bs: number;
};

export interface OrderBookDataType {
  code: string;
  orderbook_units: ExtendedOrderBookUnit[];
  stream_type: "SNAPSHOT" | "REALTIME";
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  type: "orderbook";
}

export interface ExtendedOrderBookDataType extends OrderBookDataType {
  ty: "orderbook";
  cd: string;
  tas: number;
  tbs: number;
  obu: ExtendedOrderBookUnit[];
  ap: number;
  bp: number;
  bs: number;
  tms: number;
  st: "SNAPSHOT" | "REALTIME";
}

export type AtomType =
  | ExtendedTickerDataType[]
  | ExtendedTradeDataType[]
  | ExtendedOrderBookDataType[];
// *****************************************************************

// candle 타입
export interface CandleDataType {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
}

// 라인 차트 타입
export interface LineChartPropsType {
  time: number;
  value: number;
  open?: number;
  close?: number;
  high?: number;
  low?: number;
  volume?: number;
}

// // db

export interface WalletTradeItemDataType {
  amount?: number;
  code: string;
  id: string;
  price: number;
  side: "buy" | "sell" | "krw";
  timestamp: string;
  total: number;
  type?: "market";
}

export interface WalletTradeDataType {
  krw?: WalletTradeItemDataType[];
  trade?: WalletTradeItemDataType[];
}
