export function absCeil (number: number): number {
  return number < 0 ? Math.floor(number) : Math.ceil(number);
}
