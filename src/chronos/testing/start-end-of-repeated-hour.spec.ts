/**
 * @jest-environment <rootDir>/testing/timezone-environment.js
 * @timezone Europe/London
 */
import { endOf, startOf } from '../index';

// https://github.com/valor-software/ngx-bootstrap/issues/6841
// Europe/London ends DST on 2026-10-25 at 02:00 -> 01:00, so 01:00 - 01:59 happens twice:
// first at GMT+0100 (00:xx UTC), then at GMT+0000 (01:xx UTC).
describe('start and end of units inside the hour repeated when DST ends', () => {
  const firstPass = new Date('2026-10-25T00:30:15.500Z'); // 01:30:15.500 GMT+0100
  const secondPass = new Date('2026-10-25T01:30:15.500Z'); // 01:30:15.500 GMT+0000

  it('runs in a zone where the hour is repeated', () => {
    expect([firstPass.getHours(), secondPass.getHours()]).toEqual([1, 1]);
  });

  it('start of seconds stays in the second pass', () => {
    expect(startOf(secondPass, 'seconds').toISOString()).toBe('2026-10-25T01:30:15.000Z');
  });

  it('start of minutes stays in the second pass', () => {
    expect(startOf(secondPass, 'minutes').toISOString()).toBe('2026-10-25T01:30:00.000Z');
  });

  it('start of hours stays in the second pass', () => {
    expect(startOf(secondPass, 'hours').toISOString()).toBe('2026-10-25T01:00:00.000Z');
  });

  it('end of minutes stays in the second pass', () => {
    expect(endOf(secondPass, 'minutes').toISOString()).toBe('2026-10-25T01:30:59.999Z');
  });

  it('end of hours stays in the second pass', () => {
    expect(endOf(secondPass, 'hours').toISOString()).toBe('2026-10-25T01:59:59.999Z');
  });

  it('start of hours stays in the first pass', () => {
    expect(startOf(firstPass, 'hours').toISOString()).toBe('2026-10-25T00:00:00.000Z');
  });

  it('end of hours stays in the first pass', () => {
    expect(endOf(firstPass, 'hours').toISOString()).toBe('2026-10-25T00:59:59.999Z');
  });

  it('start of day is midnight', () => {
    expect(startOf(secondPass, 'day').toISOString()).toBe('2026-10-24T23:00:00.000Z');
  });

  it('end of day is the last millisecond of the 25 hour day', () => {
    expect(endOf(secondPass, 'day').toISOString()).toBe('2026-10-25T23:59:59.999Z');
  });
});
