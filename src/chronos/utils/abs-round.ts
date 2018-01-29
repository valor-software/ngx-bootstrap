export function absRound(num: number): number {
  return num < 0 ? Math.round(num * -1) * -1 : Math.round(num);
}
