import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('utc', () => {

  it('utc and local', function () {
    var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6)), offset, expected;
    m.utc();
    // utc
    assertEq(m.date(), 2, 'the day should be correct for utc');
    assertEq(m.day(), 3, 'the date should be correct for utc');
    assertEq(m.hours(), 3, 'the hours should be correct for utc');

    // local
    m.local();
    if (m.utcOffset() < -180) {
      assertEq(m.date(), 1, 'the date should be correct for local');
      assertEq(m.day(), 2, 'the day should be correct for local');
    } else {
      assertEq(m.date(), 2, 'the date should be correct for local');
      assertEq(m.day(), 3, 'the day should be correct for local');
    }
    offset = Math.floor(m.utcOffset() / 60);
    expected = (24 + 3 + offset) % 24;
    assertEq(m.hours(), expected, 'the hours (' + m.hours() + ') should be correct for local');
    assertEq(moment().utc().utcOffset(), 0, 'timezone in utc should always be zero');
  });

  it('creating with utc and no arguments', function () {
    var startOfTest = new Date().valueOf(),
      momentDefaultUtcTime = moment.utc().valueOf(),
      afterMomentCreationTime = new Date().valueOf();

    assertOk(startOfTest <= momentDefaultUtcTime, 'moment UTC default time should be now, not in the past');
    assertOk(momentDefaultUtcTime <= afterMomentCreationTime, 'moment UTC default time should be now, not in the future');
  });

  it('creating with utc and a date parameter array', function () {
    var m = moment.utc([2011, 1, 2, 3, 4, 5, 6]);
    assertEq(m.date(), 2, 'the day should be correct for utc array');
    assertEq(m.hours(), 3, 'the hours should be correct for utc array');

    m = moment.utc('2011-02-02 3:04:05', 'YYYY-MM-DD HH:mm:ss');
    assertEq(m.date(), 2, 'the day should be correct for utc parsing format');
    assertEq(m.hours(), 3, 'the hours should be correct for utc parsing format');

    m = moment.utc('2011-02-02T03:04:05+00:00');
    assertEq(m.date(), 2, 'the day should be correct for utc parsing iso');
    assertEq(m.hours(), 3, 'the hours should be correct for utc parsing iso');
  });

  it('creating with utc without timezone', function () {
    var m = moment.utc('2012-01-02T08:20:00');
    assertEq(m.date(), 2, 'the day should be correct for utc parse without timezone');
    assertEq(m.hours(), 8, 'the hours should be correct for utc parse without timezone');

    m = moment.utc('2012-01-02T08:20:00+09:00');
    assertEq(m.date(), 1, 'the day should be correct for utc parse with timezone');
    assertEq(m.hours(), 23, 'the hours should be correct for utc parse with timezone');
  });

  it('cloning with utc offset', function () {
    var m = moment.utc('2012-01-02T08:20:00');
    assertEq(moment.utc(m)._isUTC, true, 'the local offset should be converted to UTC');
    assertEq(moment.utc(m.clone().utc())._isUTC, true, 'the local offset should stay in UTC');

    m.utcOffset(120);
    assertEq(moment.utc(m)._isUTC, true, 'the explicit utc offset should stay in UTC');
    assertEq(moment.utc(m).utcOffset(), 0, 'the explicit utc offset should have an offset of 0');
  });

  it('weekday with utc', function () {
    assertEq(
      moment('2013-09-15T00:00:00Z').utc().weekday(), // first minute of the day
      moment('2013-09-15T23:59:00Z').utc().weekday(), // last minute of the day
      'a UTC-moment\'s .weekday() should not be affected by the local timezone'
    );
  });
});
