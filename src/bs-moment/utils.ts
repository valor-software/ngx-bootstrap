export function zeroFill(
  num: number,
  targetLength: number,
  forceSign?: boolean
): string {
  const absNumber = `${Math.abs(num)}`;
  const zerosToFill = targetLength - absNumber.length;
  const sign = num >= 0;
  return (
    (sign ? (forceSign ? '+' : '') : '-') +
    Math.pow(10, Math.max(0, zerosToFill))
      .toString()
      .substr(1) +
    absNumber
  );
}

export function mod(n: number, x: number): number {
  return (n % x + x) % x;
}

export function absFloor(number: number): number {
  return number < 0 ? Math.ceil(number) || 0 : Math.floor(number);
}

export function createUTCDate(
  y?: number,
  m?: number,
  d?: number,
  h?: number,
  M?: number,
  s?: number,
  ms?: number
) {
  const date = new Date(Date.UTC.apply(null, arguments));

  // the Date.UTC function remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
    date.setUTCFullYear(y);
  }
  return date;
}
