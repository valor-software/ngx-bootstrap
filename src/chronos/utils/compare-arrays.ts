// compare two arrays, return the number of differences
import { toInt } from './type-checks';

export function compareArrays<T>(array1: T[], array2: T[], dontConvert: boolean) {
  const len = Math.min(array1.length, array2.length);
  const lengthDiff = Math.abs(array1.length - array2.length);
  let diffs = 0;
  let i;
  for (i = 0; i < len; i++) {
    if ((dontConvert && array1[i] !== array2[i])
      || (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
      diffs++;
    }
  }

  return diffs + lengthDiff;
}
