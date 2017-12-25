

export function mod(n: number, x: number): number {
  return (n % x + x) % x;
}

export function absFloor(num: number): number {
  return num < 0 ? Math.ceil(num) || 0 : Math.floor(num);
}

export function createUTCDate(y?: number,
                              m?: number,
                              d?: number,
                              h?: number,
                              M?: number,
                              s?: number,
                              ms?: number): Date {
  const date = new Date(Date.UTC.apply(null, arguments));

  // the Date.UTC function remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
    date.setUTCFullYear(y);
  }

  return date;
}
