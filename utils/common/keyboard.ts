const keyboardShortCutOptions = [
  { name: "+100억", value: 100000000000 },
  { name: "+10억", value: 10000000000 },
  { name: "+1억", value: 1000000000 },
  { name: "+1000만", value: 100000000 },
  { name: "+100만", value: 10000000 },
  { name: "+10만", value: 100000 },
  { name: "+1만", value: 10000 },
  { name: "+1천", value: 1000 },
  { name: "+1백", value: 100 },
  { name: "+10", value: 10 },
  { name: "+1", value: 1 },
  { name: "+0.1", value: 0.1 },
  { name: "+0.01", value: 0.01 },
];

const getStartIndex = (price: number): number => {
  if (price < 0.01) {
    return 0;
  } else if (price < 0.1) {
    return 1;
  } else if (price < 1) {
    return 2;
  } else if (price < 10) {
    return 3;
  } else if (price < 100) {
    return 4;
  } else if (price < 1000) {
    return 5;
  } else if (price < 10000) {
    return 6;
  } else if (price < 100000) {
    return 7;
  } else if (price < 1000000) {
    return 8;
  } else {
    return 9;
  }
};

export const getKeyboardKeys = (type: "amount" | "sum") => {
  if (type === "amount") {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "back"];
  } else {
    return [3, 2, 1, 6, 5, 4, 9, 8, 7, "back", 0];
  }
};

export const getKeyboardAmountOptions = (
  price: number
): { name: string; value: number }[] => {
  let startIndex = getStartIndex(price);
  return keyboardShortCutOptions.slice(startIndex, startIndex + 4);
};
