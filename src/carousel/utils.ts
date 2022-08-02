/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;

  while (l--) {
    if (predicate(array[l], l, array)) {
      return l;
    }
  }

  return -1;
}

export function chunkByNumber<T>(array: T[], size: number): T[][] {
  const out = [];
  const n = Math.ceil((array.length) / size);
  let i = 0;

  while (i < n) {
    const chunk = array.splice(
      0,
      (i === n - 1) && size < array.length ? array.length : size
    );

    out.push(chunk);
    i++;
  }

  return out;
}

export function isNumber(value?: any): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}
