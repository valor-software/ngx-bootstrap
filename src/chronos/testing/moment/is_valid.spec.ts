import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

xdescribe('is valid', () => {

  it('array bad month', function () {
    assertEq(moment([2010, -1]).isValid(), false, 'month -1 invalid');
    assertEq(moment([2100, 12]).isValid(), false, 'month 12 invalid');
  });

  it('array good month', function () {
    for (var i = 0; i < 12; i++) {
      assertEq(moment([2010, i]).isValid(), true, 'month ' + i);
      assertEq(moment.utc([2010, i]).isValid(), true, 'month ' + i);
    }
  });

  it('Feb 29 0000 is valid', function () {
    // https://github.com/moment/moment/issues/3358
    assertOk(moment({ year: 0, month: 1, date: 29 }).isValid(), 'Feb 29 0000 must be valid');
    assertOk(moment({ year: 0, month: 1, date: 28 }).add(1, 'd').isValid(), 'Feb 28 0000 + 1 day must be valid');
  });

  it('array bad date', function () {
    var tests = [
        moment([2010, 0, 0]),
        moment([2100, 0, 32]),
        moment.utc([2010, 0, 0]),
        moment.utc([2100, 0, 32])
      ],
      i, m;

    for (i in tests) {
      m = tests[i];
      assertEq(m.isValid(), false);
    }
  });

  it('h/hh with hour > 12', function () {
    assertOk(moment('06/20/2014 11:51 PM', 'MM/DD/YYYY hh:mm A', true).isValid(), '11 for hh');
    assertOk(moment('06/20/2014 11:51 AM', 'MM/DD/YYYY hh:mm A', true).isValid(), '11 for hh');
    assertOk(moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A').isValid(), 'non-strict validity 23 for hh');
    // assertOk(moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A').parsingFlags().bigHour, 'non-strict bigHour 23 for hh');
    assertOk(!moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A', true).isValid(), 'validity 23 for hh');
    // assertOk(moment('06/20/2014 23:51 PM', 'MM/DD/YYYY hh:mm A', true).parsingFlags().bigHour, 'bigHour 23 for hh');
  });

  it('array bad date leap year', function () {
    assertEq(moment([2010, 1, 29]).isValid(), false, '2010 feb 29');
    assertEq(moment([2100, 1, 29]).isValid(), false, '2100 feb 29');
    assertEq(moment([2008, 1, 30]).isValid(), false, '2008 feb 30');
    assertEq(moment([2000, 1, 30]).isValid(), false, '2000 feb 30');

    assertEq(moment.utc([2010, 1, 29]).isValid(), false, 'utc 2010 feb 29');
    assertEq(moment.utc([2100, 1, 29]).isValid(), false, 'utc 2100 feb 29');
    assertEq(moment.utc([2008, 1, 30]).isValid(), false, 'utc 2008 feb 30');
    assertEq(moment.utc([2000, 1, 30]).isValid(), false, 'utc 2000 feb 30');
  });

  it('string + formats bad date', function () {
    assertEq(moment('2020-00-00', []).isValid(), false, 'invalid on empty array');
    assertEq(moment('2020-00-00', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), false, 'invalid on all in array');
    assertEq(moment('2020-00-00', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'invalid on all in array');
    assertEq(moment('2020-01-01', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), true, 'valid on first');
    assertEq(moment('2020-01-01', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), true, 'valid on last');
    assertEq(moment('2020-01-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on both');
    assertEq(moment('2020-13-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on last');

    assertEq(moment('12-13-2012', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'month rollover');
    assertEq(moment('12-13-2012', ['DD-MM-YYYY', 'DD-MM-YYYY']).isValid(), false, 'month rollover');
    assertEq(moment('38-12-2012', ['DD-MM-YYYY']).isValid(), false, 'day rollover');
  });

  it('string nonsensical with format', function () {
    assertEq(moment('fail', 'MM-DD-YYYY').isValid(), false, 'string \'fail\' with format \'MM-DD-YYYY\'');
    assertEq(moment('xx-xx-2001', 'DD-MM-YYY').isValid(), true, 'string \'xx-xx-2001\' with format \'MM-DD-YYYY\'');
  });

  it('string with bad month name', function () {
    assertEq(moment('01-Nam-2012', 'DD-MMM-YYYY').isValid(), false, '\'Nam\' is an invalid month');
    assertEq(moment('01-Aug-2012', 'DD-MMM-YYYY').isValid(), true, '\'Aug\' is a valid month');
  });

  it('string with spaceless format', function () {
    assertEq(moment('10Sep2001', 'DDMMMYYYY').isValid(), true, 'Parsing 10Sep2001 should result in a valid date');
  });

  it('invalid string iso 8601', function () {
    var tests = [
      '2010-00-00',
      '2010-01-00',
      '2010-01-40',
      '2010-01-01T24:01',  // 24:00:00 is actually valid
      '2010-01-01T23:60',
      '2010-01-01T23:59:60'
    ], i;

    for (i = 0; i < tests.length; i++) {
      assertEq(moment(tests[i], moment.ISO_8601).isValid(), false, tests[i] + ' should be invalid');
      assertEq(moment.utc(tests[i], moment.ISO_8601).isValid(), false, tests[i] + ' should be invalid');
    }
  });

  it('invalid string iso 8601 + timezone', function () {
    var tests = [
      '2010-00-00T+00:00',
      '2010-01-00T+00:00',
      '2010-01-40T+00:00',
      '2010-01-40T24:01+00:00',
      '2010-01-40T23:60+00:00',
      '2010-01-40T23:59:60+00:00',
      '2010-01-40T23:59:59.9999+00:00',
      '2010-01-40T23:59:59,9999+00:00'
    ], i;

    for (i = 0; i < tests.length; i++) {
      assertEq(moment(tests[i], moment.ISO_8601).isValid(), false, tests[i] + ' should be invalid');
      assertEq(moment.utc(tests[i], moment.ISO_8601).isValid(), false, tests[i] + ' should be invalid');
    }
  });

  it('valid string iso 8601 - not strict', function () {
    var tests = [
      '2010-01-30 00:00:00,000Z',
      '20100101',
      '20100130',
      '20100130T23+00:00',
      '20100130T2359+0000',
      '20100130T235959+0000',
      '20100130T235959,999+0000',
      '20100130T235959,999-0700',
      '20100130T000000,000+0700',
      '20100130 000000,000Z'
    ];

    for (var i = 0; i < tests.length; i++) {
      assertEq(moment(tests[i]).isValid(), true, tests[i] + ' should be valid in normal');
      assertEq(moment.utc(tests[i]).isValid(), true, tests[i] + ' should be valid in normal');
    }
  });

  it('valid string iso 8601 + timezone', function () {
    var tests = [
      '2010-01-01',
      '2010-01-30',
      '2010-01-30T23+00:00',
      '2010-01-30T23:59+00:00',
      '2010-01-30T23:59:59+00:00',
      '2010-01-30T23:59:59.999+00:00',
      '2010-01-30T23:59:59.999-07:00',
      '2010-01-30T00:00:00.000+07:00',
      '2010-01-30T23:59:59.999-07',
      '2010-01-30T00:00:00.000+07',
      '2010-01-30 00:00:00.000Z'
    ], i;

    for (i = 0; i < tests.length; i++) {
      assertEq(moment(tests[i]).isValid(), true, tests[i] + ' should be valid in normal');
      assertEq(moment.utc(tests[i]).isValid(), true, tests[i] + ' should be valid in normal');
      assertEq(moment(tests[i], moment.ISO_8601, true).isValid(), true, tests[i] + ' should be valid in strict');
      assertEq(moment.utc(tests[i], moment.ISO_8601, true).isValid(), true, tests[i] + ' should be valid in strict');
    }
  });

/*
  it('invalidAt', function () {
    assertEq(moment([2000, 12]).invalidAt(), 1, 'month 12 is invalid: 0-11');
    assertEq(moment([2000, 1, 30]).invalidAt(), 2, '30 is not a valid february day');
    assertEq(moment([2000, 1, 29, 25]).invalidAt(), 3, '25 is invalid hour');
    assertEq(moment([2000, 1, 29, 24, 1]).invalidAt(), 3, '24:01 is invalid hour');
    assertEq(moment([2000, 1, 29, 23, 60]).invalidAt(), 4, '60 is invalid minute');
    assertEq(moment([2000, 1, 29, 23, 59, 60]).invalidAt(), 5, '60 is invalid second');
    assertEq(moment([2000, 1, 29, 23, 59, 59, 1000]).invalidAt(), 6, '1000 is invalid millisecond');
    assertEq(moment([2000, 1, 29, 23, 59, 59, 999]).invalidAt(), -1, '-1 if everything is fine');
  });
*/

  it('valid Unix timestamp', function () {
    assertEq(moment(1371065286, 'X').isValid(), true, 'number integer');
    assertEq(moment(1379066897.0, 'X').isValid(), true, 'number whole 1dp');
    assertEq(moment(1379066897.7, 'X').isValid(), true, 'number 1dp');
    assertEq(moment(1379066897.00, 'X').isValid(), true, 'number whole 2dp');
    assertEq(moment(1379066897.07, 'X').isValid(), true, 'number 2dp');
    assertEq(moment(1379066897.17, 'X').isValid(), true, 'number 2dp');
    assertEq(moment(1379066897.000, 'X').isValid(), true, 'number whole 3dp');
    assertEq(moment(1379066897.007, 'X').isValid(), true, 'number 3dp');
    assertEq(moment(1379066897.017, 'X').isValid(), true, 'number 3dp');
    assertEq(moment(1379066897.157, 'X').isValid(), true, 'number 3dp');
    assertEq(moment('1371065286', 'X').isValid(), true, 'string integer');
    assertEq(moment('1379066897.', 'X').isValid(), true, 'string trailing .');
    assertEq(moment('1379066897.0', 'X').isValid(), true, 'string whole 1dp');
    assertEq(moment('1379066897.7', 'X').isValid(), true, 'string 1dp');
    assertEq(moment('1379066897.00', 'X').isValid(), true, 'string whole 2dp');
    assertEq(moment('1379066897.07', 'X').isValid(), true, 'string 2dp');
    assertEq(moment('1379066897.17', 'X').isValid(), true, 'string 2dp');
    assertEq(moment('1379066897.000', 'X').isValid(), true, 'string whole 3dp');
    assertEq(moment('1379066897.007', 'X').isValid(), true, 'string 3dp');
    assertEq(moment('1379066897.017', 'X').isValid(), true, 'string 3dp');
    assertEq(moment('1379066897.157', 'X').isValid(), true, 'string 3dp');
  });

  it('invalid Unix timestamp', function () {
    assertEq(moment(undefined, 'X').isValid(), false, 'undefined');
    assertEq(moment('undefined', 'X').isValid(), false, 'string undefined');
    try {
      assertEq(moment(null, 'X').isValid(), false, 'null');
    } catch (e) {
      assertOk(true, 'null');
    }

    assertEq(moment('null', 'X').isValid(), false, 'string null');
    assertEq(moment([], 'X').isValid(), false, 'array');
    assertEq(moment('{}', 'X').isValid(), false, 'object');
    try {
      assertEq(moment('', 'X').isValid(), false, 'string empty');
    } catch (e) {
      assertOk(true, 'string empty');
    }

    assertEq(moment(' ', 'X').isValid(), false, 'string space');
  });

  it('valid Unix offset milliseconds', function () {
    assertEq(moment(1234567890123, 'x').isValid(), true, 'number integer');
    assertEq(moment('1234567890123', 'x').isValid(), true, 'string integer');
  });

  it('invalid Unix offset milliseconds', function () {
    assertEq(moment(undefined, 'x').isValid(), false, 'undefined');
    assertEq(moment('undefined', 'x').isValid(), false, 'string undefined');
    try {
      assertEq(moment(null, 'x').isValid(), false, 'null');
    } catch (e) {
      assertOk(true, 'null');
    }

    assertEq(moment('null', 'x').isValid(), false, 'string null');
    assertEq(moment([], 'x').isValid(), false, 'array');
    assertEq(moment('{}', 'x').isValid(), false, 'object');
    try {
      assertEq(moment('', 'x').isValid(), false, 'string empty');
    } catch (e) {
      assertOk(true, 'string empty');
    }

    assertEq(moment(' ', 'x').isValid(), false, 'string space');
  });

  it('empty', function () {
    assertEq(moment(null).isValid(), false, 'null');
    assertEq(moment('').isValid(), false, 'empty string');
    assertEq(moment(null, 'YYYY').isValid(), false, 'format + null');
    assertEq(moment('', 'YYYY').isValid(), false, 'format + empty string');
    assertEq(moment(' ', 'YYYY').isValid(), false, 'format + empty when trimmed');
  });

  it('days of the year', function () {
    assertEq(moment('2010 300', 'YYYY DDDD').isValid(), true, 'day 300 of year valid');
    assertEq(moment('2010 365', 'YYYY DDDD').isValid(), true, 'day 365 of year valid');
    assertEq(moment('2010 366', 'YYYY DDDD').isValid(), false, 'day 366 of year invalid');
    assertEq(moment('2012 365', 'YYYY DDDD').isValid(), true, 'day 365 of leap year valid');
    assertEq(moment('2012 366', 'YYYY DDDD').isValid(), true, 'day 366 of leap year valid');
    assertEq(moment('2012 367', 'YYYY DDDD').isValid(), false, 'day 367 of leap year invalid');
  });

  it('24:00:00.000 is valid', function () {
    assertEq(moment('2014-01-01 24', 'YYYY-MM-DD HH').isValid(), true, '24 is valid');
    assertEq(moment('2014-01-01 24:00', 'YYYY-MM-DD HH:mm').isValid(), true, '24:00 is valid');
    assertEq(moment('2014-01-01 24:01', 'YYYY-MM-DD HH:mm').isValid(), false, '24:01 is not valid');
  });

  it('oddball permissiveness', function () {
    // https://github.com/moment/moment/issues/1128
    assertOk(moment('2010-10-3199', ['MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD']).isValid());

    // https://github.com/moment/moment/issues/1122
    assertOk(moment('3:25', ['h:mma', 'hh:mma', 'H:mm', 'HH:mm']).isValid());
  });

  it('0 hour is invalid in strict', function () {
    assertEq(moment('00:01', 'hh:mm', true).isValid(), false, '00 hour is invalid in strict');
    assertEq(moment('00:01', 'hh:mm').isValid(), true, '00 hour is valid in normal');
    assertEq(moment('0:01', 'h:mm', true).isValid(), false, '0 hour is invalid in strict');
    assertEq(moment('0:01', 'h:mm').isValid(), true, '0 hour is valid in normal');
  });
});
