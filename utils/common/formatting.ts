type Functiontype =
  | "price"
  | "change"
  | "acc"
  | "volume"
  | "code"
  | "changePrice"
  | "plus"
  | "orderbookSize"
  | "fixedPrice"
  | "KRW"
  | "decimal";

export default function f(
  type: Functiontype,
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
  } else if (type === "fixedPrice") {
    return getFixedPrice(value as number);
  } else if (type === "KRW") {
    return getKRW(value as string);
  } else if (type === "decimal") {
    return getDecimal(value as number);
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
  } else if (price < 1000) {
    return price?.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  } else {
    return price?.toLocaleString();
  }
}

function getFixedPrice(price: number): string {
  return price?.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
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
  } else if (price < 1000) {
    return changePrice?.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
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
  return code?.replace("KRW-", "");
}

function getPlus(change: string): string {
  if (change === "RISE") {
    return "+";
  }
  return "";
}

function getKRW(price: string): string {
  const stringToNumber = Number(price);
  const scaledValue = stringToNumber / 100000000;

  if (scaledValue < 1) {
    return `${(scaledValue * 10).toFixed()} 천만`;
  } else if (scaledValue < 100) {
    const split = scaledValue.toFixed(1).split(".");
    return `${split[0]} 억 ${split[1]} 천만`;
  } else if (scaledValue < 10000) {
    return `${Math.round(scaledValue).toLocaleString()} 억`;
  } else {
    return `${(scaledValue / 10000).toFixed(1)} 조`;
  }
}

function getDecimal(amount: number): string {
  const isExistPoint = amount?.toString().includes(".");

  if (!isExistPoint) {
    return amount?.toLocaleString();
  } else {
    const split = amount.toString().split(".");
    const int = Number(split[0]).toLocaleString();
    const decimal = split[1];

    return `${int}.${decimal}`;
  }
}
