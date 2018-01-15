import { TimeUnit } from '../../chronos/types';
import { shiftDate } from '../../chronos/utils/date-setters';

export type CreateMatrixCb<T> = (date: Date) => T;

export interface MatrixOptions {
  height: number;
  width: number;
  initialDate: Date;
  shift: TimeUnit;
}

export function createMatrix<T>(
  options: MatrixOptions,
  fn: CreateMatrixCb<T>
): T[][] {
  let prevValue = options.initialDate;
  const matrix: T[][] = new Array(options.height);
  for (let i = 0; i < options.height; i++) {
    matrix[i] = new Array(options.width);
    for (let j = 0; j < options.width; j++) {
      matrix[i][j] = fn(prevValue);
      prevValue = shiftDate(prevValue, options.shift);
    }
  }

  return matrix;
}
