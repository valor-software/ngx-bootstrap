import { getDayOfYear } from '../units/day-of-year';

describe('moment - units', () => {
  it('day of year', () => {
    expect(getDayOfYear(new Date(2000, 0, 1))).toBe(1);
    expect(getDayOfYear(new Date(2000, 1, 28))).toBe(59);
    expect(getDayOfYear(new Date(2000, 1, 29))).toBe(60);
    expect(getDayOfYear(new Date(2000, 11, 31))).toBe(366);
    expect(getDayOfYear(new Date(2001, 0, 1))).toBe(1);
    expect(getDayOfYear(new Date(2001, 1, 28))).toBe(59);
    expect(getDayOfYear(new Date(2001, 2, 1))).toBe(60);
    expect(getDayOfYear(new Date(2001, 11, 31))).toBe(365);
  });
});
