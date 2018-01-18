// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
import { isArray, isDateValid } from '../utils/type-checks';
import { isAfter, isBefore } from '../utils/date-compare';

function pickBy(fn: Function, dates: Date[] | Date[][]): Date {
  let _dates: Date[];
  const _firstArg = dates[0];
  if (isArray<Date>(_firstArg) && dates.length === 1) {
    _dates = _firstArg;
  } else if (isArray<Date>(dates)) {
    _dates = dates;
  }

  if (!_dates || !_dates.length) {
    return new Date();
  }
  let res = _dates[0];
  for (let i = 1; i < _dates.length; ++i) {
    // if (!moments[i].isValid() || moments[i][fn](res)) {
    if (!isDateValid(_dates[i]) || fn.call(null, _dates[i], res)) {
      res = _dates[i];
    }
  }

  return res;
}

// TODO: Use [].sort instead?
export function min(...args: Date[]): Date {
  // const args = [].slice.call(arguments, 0);

  return pickBy(isBefore, args);
}

export function max(...args: Date[]): Date {
  // const args = [].slice.call(arguments, 0);

  return pickBy(isAfter, args);
}
