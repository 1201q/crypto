type Funtciontype =
  | "price"
  | "change"
  | "acc"
  | "volume"
  | "code"
  | "changePrice"
  | "plus";

export default function f(
  type: Funtciontype,
  value: number | string,
  value2?: number
) {
  if (type === "price") {
    return getPrice(value as number);
  } else if (type === "change") {
    return getPercent(value as number);
  } else if (type === "acc") {
    return getAccPrice(value as number);
  } else if (type === "code") {
    return getCode(value as string);
  } else if (type === "changePrice") {
    return getChangePrice(value as number, value2 as number);
  } else if (type === "plus") {
    return getPlus(value as number);
  }
  return "Invalid type";
}

function getPrice(price: number): string {
  if (price < 1) {
    return price.toFixed(4);
  } else if (price < 100) {
    return price.toFixed(2);
  } else {
    return price.toLocaleString();
  }
}

function getChangePrice(price: number, changePrice: number): string {
  if (price < 1) {
    return changePrice.toFixed(4);
  } else if (price < 100) {
    return changePrice.toFixed(2);
  } else {
    return changePrice.toLocaleString();
  }
}

function getAccPrice(volume: number): string {
  return `${Math.round(volume / 1000000).toLocaleString()}`;
}

function getPercent(percent: number): string {
  return (percent * 100).toFixed(2);
}

function getCode(code: string): string {
  return code.replace("KRW-", "");
}

function getPlus(change: string): string {
  if (change === "RISE") {
    return "+";
  }
  return "";
}
