import { atom } from "jotai";

interface OrderFormType {
  side: "buy" | "sell";
  type: "market" | "limit";
  code: string;
  volume: number;
  price: number;
  uid: string;
  oid: string;
  createdAt: string;
}
