type Funtciontype = "price" | "change" | "acc" | "volume" | "code";

export default function f(type: Funtciontype, value: number | string) {
  if (type === "price") {
    return getPrice(value as number);
  } else if (type === "change") {
    return getPercent(value as number);
  } else if (type === "acc") {
    return getAccPrice(value as number);
  } else if (type === "code") {
    return getCode(value as string);
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

function getAccPrice(volume: number): string {
  return `${Math.round(volume / 1000000).toLocaleString()}`;
}

function getPercent(percent: number): string {
  return (percent * 100).toFixed(2);
}

function getCode(code: string): string {
  return code.replace("KRW-", "");
}
