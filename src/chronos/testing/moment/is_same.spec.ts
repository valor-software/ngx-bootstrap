import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('is same', () => {

  it('is same without units', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, 'year is later');
    assertEq(m.isSame(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, 'year is earlier');
    assertEq(m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, 'month is later');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, 'month is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, 'day is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, 'day is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, 'hour is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, 'hour is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, 'minute is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, 'minute is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, 'second is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, 'second is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), true, 'millisecond match');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, 'millisecond is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, 'millisecond is earlier');
    assertEq(m.isSame(m), true, 'moments are the same as themselves');
    assertEq(+m, +mCopy, 'isSame second should not change moment');
  });

  it('is same year', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year match');
    assertEq(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), true, 'exact start of year');
    assertEq(m.isSame(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), true, 'exact end of year');
    assertEq(m.isSame(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, 'start of next year');
    assertEq(m.isSame(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, 'end of previous year');
    assertEq(m.isSame(m, 'year'), true, 'same moments are in the same year');
    assertEq(+m, +mCopy, 'isSame year should not change moment');
  });

  it('is same month', function () {
    var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), true, 'month match');
    assertEq(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, 'month mismatch');
    assertEq(m.isSame(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, 'exact start of month');
    assertEq(m.isSame(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), true, 'exact end of month');
    assertEq(m.isSame(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, 'start of next month');
    assertEq(m.isSame(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, 'end of previous month');
    assertEq(m.isSame(m, 'month'), true, 'same moments are in the same month');
    assertEq(+m, +mCopy, 'isSame month should not change moment');
  });

  it('is same day', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), true, 'day match');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, 'month mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), false, 'day mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'), true, 'exact start of day');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'), true, 'exact end of day');
    assertEq(m.isSame(moment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'), false, 'start of next day');
    assertEq(m.isSame(moment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'), false, 'end of previous day');
    assertEq(m.isSame(m, 'day'), true, 'same moments are in the same day');
    assertEq(+m, +mCopy, 'isSame day should not change moment');
  });

  it('is same hour', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, 'hour match');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour'), false, 'month mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour'), false, 'day mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour'), false, 'hour mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour'), true, 'exact start of hour');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour'), true, 'exact end of hour');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), false, 'start of next hour');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour'), false, 'end of previous hour');
    assertEq(m.isSame(m, 'hour'), true, 'same moments are in the same hour');
    assertEq(+m, +mCopy, 'isSame hour should not change moment');
  });

  it('is same minute', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), true, 'minute match');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, 'month mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute'), false, 'day mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute'), false, 'hour mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute'), false, 'minute mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute'), true, 'exact start of minute');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute'), true, 'exact end of minute');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), false, 'start of next minute');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), false, 'end of previous minute');
    assertEq(m.isSame(m, 'minute'), true, 'same moments are in the same minute');
    assertEq(+m, +mCopy, 'isSame minute should not change moment');
  });

  it('is same second', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), true, 'second match');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second'), false, 'year mismatch');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, 'month mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second'), false, 'day mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second'), false, 'hour mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second'), false, 'minute mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second'), false, 'second mismatch');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second'), true, 'exact start of second');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second'), true, 'exact end of second');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), false, 'start of next second');
    assertEq(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), false, 'end of previous second');
    assertEq(m.isSame(m, 'second'), true, 'same moments are in the same second');
    assertEq(+m, +mCopy, 'isSame second should not change moment');
  });

  it('is same millisecond', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'millisecond match');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, 'plural should work');
    assertEq(m.isSame(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is later');
    assertEq(m.isSame(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is earlier');
    assertEq(m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is later');
    assertEq(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, 'day is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, 'day is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, 'hour is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, 'hour is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, 'minute is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, 'minute is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, 'second is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, 'second is earlier');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, 'millisecond is later');
    assertEq(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, 'millisecond is earlier');
    assertEq(m.isSame(m, 'millisecond'), true, 'same moments are in the same millisecond');
    assertEq(+m, +mCopy, 'isSame millisecond should not change moment');
  });

  it('is same with utc offset moments', function () {
    assertOk(moment.parseZone('2013-02-01T00:00:00-05:00').isSame(moment('2013-02-01'), 'year'), 'zoned vs local moment');
    assertOk(moment('2013-02-01').isSame(moment('2013-02-01').utcOffset('-05:00'), 'year'), 'local vs zoned moment');
    assertOk(moment.parseZone('2013-02-01T00:00:00-05:00').isSame(moment.parseZone('2013-02-01T00:00:00-06:30'), 'year'),
      'zoned vs (differently) zoned moment');
  });

  it('is same with invalid moments', function () {
    assertEq(moment.invalid().isSame(moment.invalid()), false, 'invalid moments are not considered equal');
  });
});
