export function getRoundedDecimal(number: number, limit: number) {
  const rounded = Math.pow(10, limit);

  return Math.floor(number * rounded) / rounded;
}
