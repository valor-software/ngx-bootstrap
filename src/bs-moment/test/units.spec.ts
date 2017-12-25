// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line
import { getDayOfYear } from '../units/day-of-year';

describe('moment - units', () => {
  it('day of year', () => {
    expect(getDayOfYear(new Date(2000, 0, 1))).toBe(
      1,
      'Jan  1 2000 should be day 1 of the year'
    );
    expect(getDayOfYear(new Date(2000, 1, 28))).toBe(
      59,
      'Feb 28 2000 should be day 59 of the year'
    );
    expect(getDayOfYear(new Date(2000, 1, 29))).toBe(
      60,
      'Feb 28 2000 should be day 60 of the year'
    );
    expect(getDayOfYear(new Date(2000, 11, 31))).toBe(
      366,
      'Dec 31 2000 should be day 366 of the year'
    );
    expect(getDayOfYear(new Date(2001, 0, 1))).toBe(
      1,
      'Jan  1 2001 should be day 1 of the year'
    );
    expect(getDayOfYear(new Date(2001, 1, 28))).toBe(
      59,
      'Feb 28 2001 should be day 59 of the year'
    );
    expect(getDayOfYear(new Date(2001, 2, 1))).toBe(
      60,
      'Mar  1 2001 should be day 60 of the year'
    );
    expect(getDayOfYear(new Date(2001, 11, 31))).toBe(
      365,
      'Dec 31 2001 should be day 365 of the year'
    );
  });
});
