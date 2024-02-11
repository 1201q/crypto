type Funtciontype =
  | "price"
  | "change"
  | "acc"
  | "volume"
  | "code"
  | "changePrice"
  | "plus"
  | "orderbookSize";

export default function f(
  type: Funtciontype,
  value: number | string | undefined,
  value2?: number | undefined
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
    return getPlus(value as string);
  } else if (type === "orderbookSize") {
    return getOrderbookSize(value as number, value2 as number);
  }
  return "Invalid type";
}

function getPrice(price: number): string {
  if (price < 0.0001) {
    return price?.toFixed(8);
  } else if (price < 0.001) {
    return price?.toFixed(7);
  } else if (price < 0.01) {
    return price?.toFixed(6);
  } else if (price < 0.1) {
    return price?.toFixed(5);
  } else if (price < 1) {
    return price?.toFixed(4);
  } else if (price < 10) {
    return price?.toFixed(3);
  } else if (price < 100) {
    return price?.toFixed(2);
  } else {
    return price?.toLocaleString();
  }
}

function getOrderbookSize(price: number, size: number): string {
  if (price > 10) {
    return size?.toLocaleString(undefined, { minimumFractionDigits: 3 });
  } else {
    return size?.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}

function getChangePrice(price: number, changePrice: number): string {
  if (price < 0.0001) {
    return changePrice?.toFixed(8);
  } else if (price < 0.001) {
    return changePrice?.toFixed(7);
  } else if (price < 0.01) {
    return changePrice?.toFixed(6);
  } else if (price < 0.1) {
    return changePrice?.toFixed(5);
  } else if (price < 1) {
    return changePrice?.toFixed(4);
  } else if (price < 10) {
    return changePrice?.toFixed(3);
  } else if (price < 100) {
    return changePrice?.toFixed(2);
  } else {
    return changePrice?.toLocaleString();
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
