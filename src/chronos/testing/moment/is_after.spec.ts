import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('is after', () => {

  it('is after without units', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, 'hour is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), true, 'hour is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, 'minute is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), true, 'minute is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, 'second is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), true, 'second is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'millisecond match');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, 'millisecond is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), true, 'millisecond is earlier');
    assertEq(m.isAfter(m), false, 'moments are not after themselves');
    assertEq(+m, +mCopy, 'isAfter second should not change moment');
  });

  it('is after year', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year match');
    assertEq(m.isAfter(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), false, 'exact start of year');
    assertEq(m.isAfter(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), false, 'exact end of year');
    assertEq(m.isAfter(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, 'start of next year');
    assertEq(m.isAfter(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), true, 'end of previous year');
    assertEq(m.isAfter(moment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'), true, 'end of year far before');
    assertEq(m.isAfter(m, 'year'), false, 'same moments are not after the same year');
    assertEq(+m, +mCopy, 'isAfter year should not change moment');
  });

  it('is after month', function () {
    var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, 'month match');
    assertEq(m.isAfter(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), false, 'exact start of month');
    assertEq(m.isAfter(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), false, 'exact end of month');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, 'start of next month');
    assertEq(m.isAfter(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), true, 'end of previous month');
    assertEq(m.isAfter(moment(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month'), true, 'later month but earlier year');
    assertEq(m.isAfter(m, 'month'), false, 'same moments are not after the same month');
    assertEq(+m, +mCopy, 'isAfter month should not change moment');
  });

  it('is after day', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'), false, 'day match');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'), false, 'exact start of day');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'), false, 'exact end of day');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'), false, 'start of next day');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'), true, 'end of previous day');
    assertEq(m.isAfter(moment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'), true, 'later day but earlier year');
    assertEq(m.isAfter(m, 'day'), false, 'same moments are not after the same day');
    assertEq(+m, +mCopy, 'isAfter day should not change moment');
  });

  it('is after hour', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour match');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hours'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'), false, 'hour is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'), false, 'exact start of hour');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'), false, 'exact end of hour');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'), false, 'start of next hour');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'), true, 'end of previous hour');
    assertEq(m.isAfter(m, 'hour'), false, 'same moments are not after the same hour');
    assertEq(+m, +mCopy, 'isAfter hour should not change moment');
  });

  it('is after minute', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'minute match');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minutes'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'), false, 'hour is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'), true, 'hour is earler');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'), false, 'minute is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'), true, 'minute is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'), false, 'exact start of minute');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'), false, 'exact end of minute');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'), false, 'start of next minute');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'), true, 'end of previous minute');
    assertEq(m.isAfter(m, 'minute'), false, 'same moments are not after the same minute');
    assertEq(+m, +mCopy, 'isAfter minute should not change moment');
  });

  it('is after second', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'), false, 'second match');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'seconds'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'), false, 'hour is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'), true, 'hour is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'), false, 'minute is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'), true, 'minute is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'), false, 'second is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'), true, 'second is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'), false, 'exact start of second');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'), false, 'exact end of second');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'), false, 'start of next second');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'), true, 'end of previous second');
    assertEq(m.isAfter(m, 'second'), false, 'same moments are not after the same second');
    assertEq(+m, +mCopy, 'isAfter second should not change moment');
  });

  it('is after millisecond', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'millisecond match');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, 'plural should work');
    assertEq(m.isAfter(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is later');
    assertEq(m.isAfter(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'year is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is later');
    assertEq(m.isAfter(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), true, 'month is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, 'day is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), true, 'day is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, 'hour is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), true, 'hour is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, 'minute is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), true, 'minute is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, 'second is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), true, 'second is earlier');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, 'millisecond is later');
    assertEq(m.isAfter(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), true, 'millisecond is earlier');
    assertEq(m.isAfter(m, 'millisecond'), false, 'same moments are not after the same millisecond');
    assertEq(+m, +mCopy, 'isAfter millisecond should not change moment');
  });

  it('is after invalid', function () {
    var m = moment(), invalid = moment.invalid();
    assertEq(m.isAfter(invalid), false, 'valid moment is not after invalid moment');
    assertEq(invalid.isAfter(m), false, 'invalid moment is not after valid moment');
    assertEq(m.isAfter(invalid, 'year'), false, 'invalid moment year');
    assertEq(m.isAfter(invalid, 'month'), false, 'invalid moment month');
    assertEq(m.isAfter(invalid, 'day'), false, 'invalid moment day');
    assertEq(m.isAfter(invalid, 'hour'), false, 'invalid moment hour');
    assertEq(m.isAfter(invalid, 'minute'), false, 'invalid moment minute');
    assertEq(m.isAfter(invalid, 'second'), false, 'invalid moment second');
    assertEq(m.isAfter(invalid, 'milliseconds'), false, 'invalid moment milliseconds');
  });
});
