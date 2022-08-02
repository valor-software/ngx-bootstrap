import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('is before', () => {

  it('is after without units', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), true, 'hour is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, 'hour is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), true, 'minute is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, 'minute is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), true, 'second is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, 'second is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), false, 'millisecond match');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), true, 'millisecond is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, 'millisecond is earlier');
    assertEq(m.isBefore(m), false, 'moments are not before themselves');
    assertEq(+m, +mCopy, 'isBefore second should not change moment');
  });

  it('is before year', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year match');
    assertEq(m.isBefore(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), false, 'exact start of year');
    assertEq(m.isBefore(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), false, 'exact end of year');
    assertEq(m.isBefore(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), true, 'start of next year');
    assertEq(m.isBefore(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, 'end of previous year');
    assertEq(m.isBefore(moment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'), false, 'end of year far before');
    assertEq(m.isBefore(m, 'year'), false, 'same moments are not before the same year');
    assertEq(+m, +mCopy, 'isBefore year should not change moment');
  });

  it('is before month', function () {
    var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), false, 'month match');
    assertEq(m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'months'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), false, 'exact start of month');
    assertEq(m.isBefore(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), false, 'exact end of month');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), true, 'start of next month');
    assertEq(m.isBefore(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, 'end of previous month');
    assertEq(m.isBefore(moment(new Date(2010, 12, 31, 23, 59, 59, 999)), 'month'), false, 'later month but earlier year');
    assertEq(m.isBefore(m, 'month'), false, 'same moments are not before the same month');
    assertEq(+m, +mCopy, 'isBefore month should not change moment');
  });

  it('is before day', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'), false, 'day match');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'days'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'), false, 'exact start of day');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'), false, 'exact end of day');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'), true, 'start of next day');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'), false, 'end of previous day');
    assertEq(m.isBefore(moment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'), false, 'later day but earlier year');
    assertEq(m.isBefore(m, 'day'), false, 'same moments are not before the same day');
    assertEq(+m, +mCopy, 'isBefore day should not change moment');
  });

  it('is before hour', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour match');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hours'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'), true, 'hour is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'), false, 'hour is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'), false, 'exact start of hour');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'), false, 'exact end of hour');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'), true, 'start of next hour');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'), false, 'end of previous hour');
    assertEq(m.isBefore(m, 'hour'), false, 'same moments are not before the same hour');
    assertEq(+m, +mCopy, 'isBefore hour should not change moment');
  });

  it('is before minute', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'minute match');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minutes'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'), true, 'hour is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'), false, 'hour is earler');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'), true, 'minute is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'), false, 'minute is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'), false, 'exact start of minute');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'), false, 'exact end of minute');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'), true, 'start of next minute');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'), false, 'end of previous minute');
    assertEq(m.isBefore(m, 'minute'), false, 'same moments are not before the same minute');
    assertEq(+m, +mCopy, 'isBefore minute should not change moment');
  });

  it('is before second', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'), false, 'second match');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'seconds'), true, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'), true, 'hour is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'), false, 'hour is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'), true, 'minute is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'), false, 'minute is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'), true, 'second is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'), false, 'second is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'), false, 'exact start of second');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'), false, 'exact end of second');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'), true, 'start of next second');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'), false, 'end of previous second');
    assertEq(m.isBefore(m, 'second'), false, 'same moments are not before the same second');
    assertEq(+m, +mCopy, 'isBefore second should not change moment');
  });

  it('is before millisecond', function () {
    var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'millisecond match');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'milliseconds'), false, 'plural should work');
    assertEq(m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, 'year is later');
    assertEq(m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, 'year is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), true, 'month is later');
    assertEq(m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, 'month is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), true, 'day is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, 'day is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), true, 'hour is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, 'hour is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), true, 'minute is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, 'minute is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), true, 'second is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, 'second is earlier');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), true, 'millisecond is later');
    assertEq(m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, 'millisecond is earlier');
    assertEq(m.isBefore(m, 'millisecond'), false, 'same moments are not before the same millisecond');
    assertEq(+m, +mCopy, 'isBefore millisecond should not change moment');
  });

  it('is before invalid', function () {
    var m = moment(), invalid = moment.invalid();
    assertEq(m.isBefore(invalid), false, 'valid moment is not before invalid moment');
    assertEq(invalid.isBefore(m), false, 'invalid moment is not before valid moment');
    assertEq(m.isBefore(invalid, 'year'), false, 'invalid moment year');
    assertEq(m.isBefore(invalid, 'month'), false, 'invalid moment month');
    assertEq(m.isBefore(invalid, 'day'), false, 'invalid moment day');
    assertEq(m.isBefore(invalid, 'hour'), false, 'invalid moment hour');
    assertEq(m.isBefore(invalid, 'minute'), false, 'invalid moment minute');
    assertEq(m.isBefore(invalid, 'second'), false, 'invalid moment second');
    assertEq(m.isBefore(invalid, 'milliseconds'), false, 'invalid moment milliseconds');
  });
});
