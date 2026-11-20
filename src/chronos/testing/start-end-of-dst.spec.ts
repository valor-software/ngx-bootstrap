/**
 * @jest-environment <rootDir>/testing/timezone-environment.js
 * @timezone Africa/Cairo
 */
import { endOf, isBefore, isSame, startOf } from '../index';

// https://github.com/valor-software/ngx-bootstrap/issues/6841
// Africa/Cairo starts DST on 2026-04-24 at 00:00 -> 01:00, so that day has no local midnight.
describe('start and end of units when DST starts at local midnight', () => {
  const transitionDay = new Date('2026-04-24T10:00:00Z'); // Fri Apr 24 2026 13:00 GMT+0300
  const nextDay = new Date('2026-04-24T21:30:00Z'); // Sat Apr 25 2026 00:30 GMT+0300

  it('runs in a zone where the transition day starts at 01:00', () => {
    expect(new Date(2026, 3, 24, 0, 0, 0).getHours()).toBe(1);
  });

  it('start of day is the first existing instant of the day', () => {
    expect(startOf(transitionDay, 'day').toISOString()).toBe('2026-04-23T22:00:00.000Z');
  });

  it('end of day stays within the same day', () => {
    expect(endOf(transitionDay, 'day').toISOString()).toBe('2026-04-24T20:59:59.999Z');
  });

  it('start of week is midnight of the first day of the week', () => {
    expect(startOf(transitionDay, 'week').toISOString()).toBe('2026-04-18T22:00:00.000Z');
  });

  it('end of week stays within the same week', () => {
    expect(endOf(transitionDay, 'week').toISOString()).toBe('2026-04-25T20:59:59.999Z');
  });

  it('start of isoWeek is midnight of monday', () => {
    expect(startOf(transitionDay, 'isoWeek').toISOString()).toBe('2026-04-19T22:00:00.000Z');
  });

  it('end of isoWeek stays within the same isoWeek', () => {
    expect(endOf(transitionDay, 'isoWeek').toISOString()).toBe('2026-04-26T20:59:59.999Z');
  });

  it('the first hour of the next day is not the same day', () => {
    expect(isSame(transitionDay, nextDay, 'day')).toBe(false);
  });

  it('the transition day is before the first hour of the next day', () => {
    expect(isBefore(transitionDay, nextDay, 'day')).toBe(true);
  });
});
