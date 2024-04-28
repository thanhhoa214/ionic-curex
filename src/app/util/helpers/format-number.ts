export function roundNumber(num: number, precision = 6): number {
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
}
