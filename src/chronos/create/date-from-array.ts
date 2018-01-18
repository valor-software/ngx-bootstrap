export function createUTCDate(y?: number,
                              m?: number,
                              d?: number): Date {
  const date = new Date(Date.UTC.apply(null, arguments));

  // the Date.UTC function remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
    date.setUTCFullYear(y);
  }

  return date;
}

export function createDate(y?: number,
                           m = 0,
                           d = 1,
                           h = 0,
                           M = 0,
                           s = 0,
                           ms = 0): Date {
  const date = new Date(y, m, d, h, M, s, ms);

  // the date constructor remaps years 0-99 to 1900-1999
  if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
    date.setFullYear(y);
  }

  return date;
}
