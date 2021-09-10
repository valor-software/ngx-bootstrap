import { assertEq, assertDeepEq, assertOk, assertNotEqual } from '../test-helpers';
import { Khronos, moment } from '../chain';
import { ruLocale } from '../../i18n/ru';

describe('create', () => {

  it('array', function () {
    assertOk(moment([2010]).toDate() instanceof Date, '[2010]');
    assertOk(moment([2010, 1]).toDate() instanceof Date, '[2010, 1]');
    assertOk(moment([2010, 1, 12]).toDate() instanceof Date, '[2010, 1, 12]');
    assertOk(moment([2010, 1, 12, 1]).toDate() instanceof Date, '[2010, 1, 12, 1]');
    assertOk(moment([2010, 1, 12, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1]');
    assertOk(moment([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1, 1]');
    assertOk(moment([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date, '[2010, 1, 12, 1, 1, 1, 1]');
    assertEq(
      +moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      +moment([2010, 1, 14, 15, 25, 50, 125]),
      'constructing with array === constructing with new Date()');
  });

  /** it will be valid with raw Date */
  it('array with invalid arguments', function () {
    assertOk(moment([2010, null, null]).isValid(), '[2010, null, null]');
    assertOk(moment([1945, null, null]).isValid(), '[1945, null, null] (pre-1970)');
  });

  it('array copying', function () {
    const importantArray = [2009, 11];
    moment(importantArray);
    assertDeepEq(importantArray, [2009, 11], 'initializer should not mutate the original array');
  });

  it('object', function () {
    const fmt = 'YYYY-MM-DD HH:mm:ss.SSS';
    const tests = [
      [{ year: 2010 }, '2010-01-01 00:00:00.000'],
      [{ year: 2010, month: 1 }, '2010-02-01 00:00:00.000'],
      [{ year: 2010, month: 1, day: 12 }, '2010-02-12 00:00:00.000'],
      [{ year: 2010, month: 1, date: 12 }, '2010-02-12 00:00:00.000'],
      [{ year: 2010, month: 1, day: 12, hours: 1 }, '2010-02-12 01:00:00.000'],
      [{ year: 2010, month: 1, date: 12, hours: 1 }, '2010-02-12 01:00:00.000'],
      [{ year: 2010, month: 1, day: 12, hours: 1, minutes: 1 }, '2010-02-12 01:01:00.000'],
      [{ year: 2010, month: 1, date: 12, hours: 1, minutes: 1 }, '2010-02-12 01:01:00.000'],
      [{ year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1 }, '2010-02-12 01:01:01.000'],
      [{
        year: 2010,
        month: 1,
        day: 12,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1
      }, '2010-02-12 01:01:01.001'],
      [{
        years: 2010,
        months: 1,
        days: 14,
        hours: 15,
        minutes: 25,
        seconds: 50,
        milliseconds: 125
      }, '2010-02-14 15:25:50.125'],
      [{
        year: 2010,
        month: 1,
        day: 14,
        hour: 15,
        minute: 25,
        second: 50,
        millisecond: 125
      }, '2010-02-14 15:25:50.125'],
      [{ y: 2010, M: 1, d: 14, h: 15, m: 25, s: 50, ms: 125 }, '2010-02-14 15:25:50.125']
    ];
    let i;
    for (i = 0; i < tests.length; ++i) {
      assertEq(moment(tests[i][0]).format(fmt), tests[i][1]);
    }
  });

  it('multi format array copying', function () {
    const importantArray = ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'];
    moment('1999-02-13', importantArray);
    assertDeepEq(importantArray, ['MM/DD/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY'], 'initializer should not mutate the original array');
  });

  it('number', function () {
    assertOk(moment(1000).toDate() instanceof Date, '1000');
    assertEq(moment(1000).valueOf(), 1000, 'asserting valueOf');
    assertEq(moment.utc(1000).valueOf(), 1000, 'asserting valueOf');
  });

  it('unix', function () {
    assertEq(moment.unix(1).valueOf(), 1000, '1 unix timestamp == 1000 Date.valueOf');
    assertEq(moment(1000).unix(), 1, '1000 Date.valueOf == 1 unix timestamp');
    assertEq(moment.unix(1000).valueOf(), 1000000, '1000 unix timestamp == 1000000 Date.valueOf');
    assertEq(moment(1500).unix(), 1, '1500 Date.valueOf == 1 unix timestamp');
    assertEq(moment(1900).unix(), 1, '1900 Date.valueOf == 1 unix timestamp');
    assertEq(moment(2100).unix(), 2, '2100 Date.valueOf == 2 unix timestamp');
    assertEq(moment(1333129333524).unix(), 1333129333, '1333129333524 Date.valueOf == 1333129333 unix timestamp');
    assertEq(moment(1333129333524000).unix(), 1333129333524, '1333129333524000 Date.valueOf == 1333129333524 unix timestamp');
  });

  it('date', function () {
    assertOk(moment(new Date()).toDate() instanceof Date, 'new Date()');
    assertEq(moment(new Date(2016, 0, 1), 'YYYY-MM-DD').format('YYYY-MM-DD'), '2016-01-01', 'If date is provided, format string is ignored');
  });

  it('date with a format as an array', function () {
    const tests = [
      new Date(2016, 9, 27),
      new Date(2016, 9, 28),
      new Date(2016, 9, 29),
      new Date(2016, 9, 30),
      new Date(2016, 9, 31)
    ];
    let i;

    for (i = 0; i < tests.length; i++) {
      assertEq(moment(tests[i]).format(), moment(tests[i], ['MM/DD/YYYY'], false).format(), 'Passing date with a format array should still return the correct date');
    }
  });

  it('date mutation', function () {
    const a = new Date();
    assertOk(moment(a).toDate() !== a, 'the date moment uses should not be the date passed in');
  });

  it('moment', function () {
    assertOk(moment(moment()).toDate() instanceof Date, 'moment(moment())');
    assertOk(moment(moment(moment())).toDate() instanceof Date, 'moment(moment(moment()))');
  });

  it('cloning moment should only copy own properties', function () {
    // eslint-disable-next-line no-prototype-builtins
    assertOk(!moment().clone().hasOwnProperty('month'), 'Should not clone prototype methods');
  });

  // todo: for...in doesn't list methods of b
  xit('cloning moment works with weird clones', function () {
    const extend = function (a, b): Khronos {
      for (let i in b) {
        a[i] = b[i];
      }

      return a;
    };
    const now = moment();
    const nowu = moment.utc();

    assertEq(+extend({}, now).clone(), +now, 'cloning extend-ed now is now');
    assertEq(+extend({}, nowu).clone(), +nowu, 'cloning extend-ed utc now is utc now');
  });

  /*
    it('cloning respects moment.momentProperties', function () {
      const m = moment();

      assertEq(m.clone()._special, undefined, 'cloning ignores extra properties');
      m._special = 'bacon';
      moment.momentProperties.push('_special');
      assertEq(m.clone()._special, 'bacon', 'cloning respects momentProperties');
      moment.momentProperties.pop();
    });
  */

  it('undefined', function () {
    assertOk(moment().toDate() instanceof Date, 'undefined');
  });

  it('iso with bad input', function () {
    assertOk(!moment('a', moment.ISO_8601).isValid(), 'iso parsing with invalid string');
    assertOk(!moment('a', moment.ISO_8601, true).isValid(), 'iso parsing with invalid string, strict');
  });

  it('iso format 24hrs', function () {
    assertEq(moment('2014-01-01T24:00:00.000').format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      '2014-01-02T00:00:00.000', 'iso format with 24:00 localtime');
    assertEq(moment.utc('2014-01-01T24:00:00.000').format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      '2014-01-02T00:00:00.000', 'iso format with 24:00 utc');
  });

  it('string without format - json', function () {
    assertEq(moment('Date(1325132654000)').valueOf(), 1325132654000, 'Date(1325132654000)');
    assertEq(moment('Date(-1325132654000)').valueOf(), -1325132654000, 'Date(-1325132654000)');
    assertEq(moment('/Date(1325132654000)/').valueOf(), 1325132654000, '/Date(1325132654000)/');
    assertEq(moment('/Date(1325132654000+0700)/').valueOf(), 1325132654000, '/Date(1325132654000+0700)/');
    assertEq(moment('/Date(1325132654000-0700)/').valueOf(), 1325132654000, '/Date(1325132654000-0700)/');
  });

  it('string with format dropped am/pm bug', function () {
    moment.locale('en');

    assertEq(moment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
    assertEq(moment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');
    assertEq(moment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').format('MM/DD/YYYY'), '05/01/2012', 'should not break if am/pm is left off from the parsing tokens');

    assertOk(moment('05/1/2012 12:25:00', 'MM/DD/YYYY h:m:s a').isValid());
    assertOk(moment('05/1/2012 12:25:00 am', 'MM/DD/YYYY h:m:s a').isValid());
    assertOk(moment('05/1/2012 12:25:00 pm', 'MM/DD/YYYY h:m:s a').isValid());
  });

  it('empty string with formats', function () {
    assertEq(moment('', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
    assertEq(moment(' ', 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
    assertEq(moment(' ', 'DD').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
    assertEq(moment(' ', ['MM', 'DD']).format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');

    assertOk(!moment('', 'MM').isValid());
    assertOk(!moment(' ', 'MM').isValid());
    assertOk(!moment(' ', 'DD').isValid());
    assertOk(!moment(' ', ['MM', 'DD']).isValid());
  });

  it('undefined argument with formats', function () {
    assertEq(moment(undefined, 'MM').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
    assertEq(moment(undefined, 'DD').format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');
    assertEq(moment(undefined, ['MM', 'DD']).format('YYYY-MM-DD HH:mm:ss'), 'Invalid date');

    assertOk(!moment(undefined, 'MM').isValid());
    assertOk(!moment(undefined, 'MM').isValid());
    assertOk(!moment(undefined, 'DD').isValid());
    assertOk(!moment(undefined, ['MM', 'DD']).isValid());
  });

  it('defaulting to current date', function () {
    const now = moment();
    assertEq(moment('12:13:14', 'hh:mm:ss').format('YYYY-MM-DD hh:mm:ss'),
      now.clone().hours(12).minutes(13).seconds(14).format('YYYY-MM-DD hh:mm:ss'),
      'given only time default to current date');
    assertEq(moment('05', 'DD').format('YYYY-MM-DD'),
      now.clone().date(5).format('YYYY-MM-DD'),
      'given day of month default to current month, year');
    assertEq(moment('05', 'MM').format('YYYY-MM-DD'),
      now.clone().month(4).date(1).format('YYYY-MM-DD'),
      'given month default to current year');
    assertEq(moment('1996', 'YYYY').format('YYYY-MM-DD'),
      now.clone().year(1996).month(0).date(1).format('YYYY-MM-DD'),
      'given year do not default');
  });

  it('matching am/pm', function () {
    assertEq(moment('2012-09-03T03:00PM', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for PM');
    assertEq(moment('2012-09-03T03:00P.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P.M.');
    assertEq(moment('2012-09-03T03:00P', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for P');
    assertEq(moment('2012-09-03T03:00pm', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for pm');
    assertEq(moment('2012-09-03T03:00p.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p.m.');
    assertEq(moment('2012-09-03T03:00p', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00PM', 'am/pm should parse correctly for p');

    assertEq(moment('2012-09-03T03:00AM', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for AM');
    assertEq(moment('2012-09-03T03:00A.M.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A.M.');
    assertEq(moment('2012-09-03T03:00A', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for A');
    assertEq(moment('2012-09-03T03:00am', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for am');
    assertEq(moment('2012-09-03T03:00a.m.', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a.m.');
    assertEq(moment('2012-09-03T03:00a', 'YYYY-MM-DDThh:mmA').format('YYYY-MM-DDThh:mmA'), '2012-09-03T03:00AM', 'am/pm should parse correctly for a');

    assertEq(moment('5:00p.m.March 4 2012', 'h:mmAMMMM D YYYY').format('YYYY-MM-DDThh:mmA'), '2012-03-04T05:00PM', 'am/pm should parse correctly before month names');
  });

  it('string with format', function () {
    moment.locale('en');
    let a = [
      ['YYYY-Q', '2014-4'],
      ['MM-DD-YYYY', '12-02-1999'],
      ['DD-MM-YYYY', '12-02-1999'],
      ['DD/MM/YYYY', '12/02/1999'],
      ['DD_MM_YYYY', '12_02_1999'],
      ['DD:MM:YYYY', '12:02:1999'],
      ['D-M-YY', '2-2-99'],
      ['YY', '99'],
      ['DDD-YYYY', '300-1999'],
      ['DD-MM-YYYY h:m:s', '12-02-1999 2:45:10'],
      ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 am'],
      ['DD-MM-YYYY h:m:s a', '12-02-1999 2:45:10 pm'],
      ['h:mm a', '12:00 pm'],
      ['h:mm a', '12:30 pm'],
      ['h:mm a', '12:00 am'],
      ['h:mm a', '12:30 am'],
      ['HH:mm', '12:00'],
      ['kk:mm', '12:00'],
      ['YYYY-MM-DDTHH:mm:ss', '2011-11-11T11:11:11'],
      ['MM-DD-YYYY [M]', '12-02-1999 M'],
      ['ddd MMM DD HH:mm:ss YYYY', 'Tue Apr 07 22:52:51 2009'],
      ['HH:mm:ss', '12:00:00'],
      ['HH:mm:ss', '12:30:00'],
      ['HH:mm:ss', '00:00:00'],
      ['HH:mm:ss S', '00:30:00 1'],
      ['HH:mm:ss SS', '00:30:00 12'],
      ['HH:mm:ss SSS', '00:30:00 123'],
      ['HH:mm:ss S', '00:30:00 7'],
      ['HH:mm:ss SS', '00:30:00 78'],
      ['HH:mm:ss SSS', '00:30:00 789'],
      ['kk:mm:ss', '12:00:00'],
      ['kk:mm:ss', '12:30:00'],
      ['kk:mm:ss', '24:00:00'],
      ['kk:mm:ss S', '24:30:00 1'],
      ['kk:mm:ss SS', '24:30:00 12'],
      ['kk:mm:ss SSS', '24:30:00 123'],
      ['kk:mm:ss S', '24:30:00 7'],
      ['kk:mm:ss SS', '24:30:00 78'],
      ['kk:mm:ss SSS', '24:30:00 789'],
      ['X', '1234567890'],
      ['x', '1234567890123'],
      ['LT', '12:30 AM'],
      ['LTS', '12:30:29 AM'],
      ['L', '09/02/1999'],
      ['l', '9/2/1999'],
      ['LL', 'September 2, 1999'],
      ['ll', 'Sep 2, 1999'],
      ['LLL', 'September 2, 1999 12:30 AM'],
      ['lll', 'Sep 2, 1999 12:30 AM'],
      ['LLLL', 'Thursday, September 2, 1999 12:30 AM'],
      ['llll', 'Thu, Sep 2, 1999 12:30 AM']
    ];
    let m;
    let i;

    for (i = 0; i < a.length; i++) {
      m = moment(a[i][1], a[i][0]);
      assertOk(m.isValid());
      assertEq(m.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('2 digit year with YYYY format', function () {
    assertEq(moment('9/2/99', 'D/M/YYYY').format('DD/MM/YYYY'), '09/02/1999', 'D/M/YYYY ---> 9/2/99');
    assertEq(moment('9/2/1999', 'D/M/YYYY').format('DD/MM/YYYY'), '09/02/1999', 'D/M/YYYY ---> 9/2/1999');
    assertEq(moment('9/2/68', 'D/M/YYYY').format('DD/MM/YYYY'), '09/02/2068', 'D/M/YYYY ---> 9/2/68');
    assertEq(moment('9/2/69', 'D/M/YYYY').format('DD/MM/YYYY'), '09/02/1969', 'D/M/YYYY ---> 9/2/69');
  });

  it('unix timestamp format', function () {
    let formats = ['X', 'X.S', 'X.SS', 'X.SSS'], i, format;

    for (i = 0; i < formats.length; i++) {
      format = formats[i];
      assertEq(moment('1234567890', format).valueOf(), 1234567890 * 1000, format + ' matches timestamp without milliseconds');
      assertEq(moment('1234567890.1', format).valueOf(), 1234567890 * 1000 + 100, format + ' matches timestamp with deciseconds');
      assertEq(moment('1234567890.12', format).valueOf(), 1234567890 * 1000 + 120, format + ' matches timestamp with centiseconds');
      assertEq(moment('1234567890.123', format).valueOf(), 1234567890 * 1000 + 123, format + ' matches timestamp with milliseconds');
    }
  });

  it('unix offset milliseconds', function () {
    assertEq(moment('1234567890123', 'x').valueOf(), 1234567890123, 'x matches unix offset in milliseconds');
  });

  it('milliseconds format', function () {
    assertEq(moment('1', 'S').get('ms'), 100, 'deciseconds');
    // assertEq(moment('10', 'S', true).isValid(), false, 'deciseconds with two digits');
    // assertEq(moment('1', 'SS', true).isValid(), false, 'centiseconds with one digits');
    assertEq(moment('12', 'SS').get('ms'), 120, 'centiseconds');
    // assertEq(moment('123', 'SS', true).isValid(), false, 'centiseconds with three digits');
    assertEq(moment('123', 'SSS').get('ms'), 123, 'milliseconds');
    assertEq(moment('1234', 'SSSS').get('ms'), 123, 'milliseconds with SSSS');
    assertEq(moment('123456789101112', 'SSSS').get('ms'), 123, 'milliseconds with SSSS');
  });

  it('string with format no separators', function () {
    moment.locale('en');
    let a = [
      ['MMDDYYYY', '12021999'],
      ['DDMMYYYY', '12021999'],
      ['YYYYMMDD', '19991202'],
      ['DDMMMYYYY', '10Sep2001']
    ], i;

    for (i = 0; i < a.length; i++) {
      assertEq(moment(a[i][1], a[i][0]).format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('string with format (timezone)', function () {
    assertEq(moment('5 -0700', 'H ZZ').toDate().getUTCHours(), 12, 'parse hours \'5 -0700\' ---> \'H ZZ\'');
    assertEq(moment('5 -07:00', 'H Z').toDate().getUTCHours(), 12, 'parse hours \'5 -07:00\' ---> \'H Z\'');
    assertEq(moment('5 -0730', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours \'5 -0730\' ---> \'H ZZ\'');
    assertEq(moment('5 -07:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours \'5 -07:0\' ---> \'H Z\'');
    assertEq(moment('5 +0100', 'H ZZ').toDate().getUTCHours(), 4, 'parse hours \'5 +0100\' ---> \'H ZZ\'');
    assertEq(moment('5 +01:00', 'H Z').toDate().getUTCHours(), 4, 'parse hours \'5 +01:00\' ---> \'H Z\'');
    assertEq(moment('5 +0130', 'H ZZ').toDate().getUTCMinutes(), 30, 'parse hours \'5 +0130\' ---> \'H ZZ\'');
    assertEq(moment('5 +01:30', 'H Z').toDate().getUTCMinutes(), 30, 'parse hours \'5 +01:30\' ---> \'H Z\'');
  });

  it('string with format (timezone offset)', function () {
    let a = new Date(Date.UTC(2011, 0, 1, 1));
    let b = moment('2011 1 1 0 -01:00', 'YYYY MM DD HH Z');
    assertEq(a.getHours(), b.hours(), 'date created with utc == parsed string with timezone offset');
    assertEq(+a, +b, 'date created with utc == parsed string with timezone offset');
    let c = moment('2011 2 1 10 -05:00', 'YYYY MM DD HH Z');
    let d = moment('2011 2 1 8 -07:00', 'YYYY MM DD HH Z');
    assertEq(c.hours(), d.hours(), '10 am central time == 8 am pacific time');
    let e = moment.utc('Fri, 20 Jul 2012 17:15:00', 'ddd, DD MMM YYYY HH:mm:ss');
    let f = moment.utc('Fri, 20 Jul 2012 10:15:00 -0700', 'ddd, DD MMM YYYY HH:mm:ss ZZ');
    assertEq(e.hours(), f.hours(), 'parse timezone offset in utc');
  });

  it('string with timezone around start of year', function () {
    assertEq(moment('2000-01-01T00:00:00.000+01:00').toISOString(), '1999-12-31T23:00:00.000Z', '+1:00 around 2000');
    assertEq(moment('2000-01-01T00:00:00.000-01:00').toISOString(), '2000-01-01T01:00:00.000Z', '-1:00 around 2000');
    assertEq(moment('1970-01-01T00:00:00.000+01:00').toISOString(), '1969-12-31T23:00:00.000Z', '+1:00 around 1970');
    assertEq(moment('1970-01-01T00:00:00.000-01:00').toISOString(), '1970-01-01T01:00:00.000Z', '-1:00 around 1970');
    assertEq(moment('1200-01-01T00:00:00.000+01:00').toISOString(), '1199-12-31T23:00:00.000Z', '+1:00 around 1200');
    assertEq(moment('1200-01-01T00:00:00.000-01:00').toISOString(), '1200-01-01T01:00:00.000Z', '-1:00 around 1200');
  });

  it('string with array of formats', function () {
    const thursdayForCurrentWeek = moment()
      .day(4)
      .format('YYYY MM DD');

    assertEq(moment('11-02-1999', ['MM-DD-YYYY', 'DD-MM-YYYY']).format('MM DD YYYY'), '11 02 1999', 'switching month and day');
    assertEq(moment('02-11-1999', ['MM/DD/YYYY', 'YYYY MM DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
    assertEq(moment('1999-02-11', ['MM/DD/YYYY', 'YYYY MM DD', 'MM-DD-YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

    assertEq(moment('02-11-1999', ['MM/DD/YYYY', 'YYYY MM DD']).format('MM DD YYYY'), '02 11 1999', 'year last');
    assertEq(moment('1999-02-11', ['MM/DD/YYYY', 'YYYY MM DD']).format('MM DD YYYY'), '02 11 1999', 'year first');
    assertEq(moment('02-11-1999', ['YYYY MM DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year last');
    assertEq(moment('1999-02-11', ['YYYY MM DD', 'MM/DD/YYYY']).format('MM DD YYYY'), '02 11 1999', 'year first');

    assertEq(moment('13-11-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'second must be month');
    assertEq(moment('11-13-1999', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '11 13 1999', 'first must be month');
    assertEq(moment('01-02-2000', ['MM/DD/YYYY', 'DD/MM/YYYY']).format('MM DD YYYY'), '01 02 2000', 'either can be a month, month first format');
    assertEq(moment('02-01-2000', ['DD/MM/YYYY', 'MM/DD/YYYY']).format('MM DD YYYY'), '01 02 2000', 'either can be a month, day first format');

    assertEq(moment('11-02-10', ['MM/DD/YY', 'YY MM DD', 'DD-MM-YY']).format('MM DD YYYY'), '02 11 2010', 'all unparsed substrings have influence on format penalty');
    assertEq(moment('11-02-10', ['MM-DD-YY HH:mm', 'YY MM DD']).format('MM DD YYYY'), '02 10 2011', 'prefer formats without extra tokens');
    assertEq(moment('11-02-10 junk', ['MM-DD-YY', 'YY.MM.DD [junk]']).format('MM DD YYYY'), '02 10 2011', 'prefer formats that dont result in extra characters');
    assertEq(moment('11-22-10', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'), '10 22 2011', 'prefer valid results');

    assertEq(moment('gibberish', ['YY-MM-DD', 'YY-DD-MM']).format('MM DD YYYY'), 'Invalid date', 'doest throw for invalid strings');
    assertEq(moment('gibberish', []).format('MM DD YYYY'), 'Invalid date', 'doest throw for an empty array');

    // https://github.com/moment/moment/issues/1143
    assertEq(moment(
      'System Administrator and Database Assistant (7/1/2011), System Administrator and Database Assistant (7/1/2011), Database Coordinator (7/1/2011), Vice President (7/1/2011), System Administrator and Database Assistant (5/31/2012), Database Coordinator (7/1/2012), System Administrator and Database Assistant (7/1/2013)',
      ['MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ssZ'])
      .format('YYYY-MM-DD'), '2011-07-01', 'Works for long strings');

    assertEq(moment('11-02-10', ['MM.DD.YY', 'DD-MM-YY']).format('MM DD YYYY'), '02 11 2010', 'escape RegExp special characters on comparing');

    // assertEq(moment('13-10-98', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YY', 'use two digit year');
    // assertEq(moment('13-10-1998', ['DD MM YY', 'DD MM YYYY'])._f, 'DD MM YYYY', 'use four digit year');

    // assertEq(moment('01', ['MM', 'DD'])._f, 'MM', 'Should use first valid format');

    assertEq(moment('Thursday 8:30pm', ['dddd h:mma']).format('YYYY MM DD dddd h:mma'), thursdayForCurrentWeek + ' Thursday 8:30pm', 'Default to current week');
  });

  it('string with array of formats + ISO', function () {
    assertEq(moment('1994', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).year(), 1994, 'iso: assert parse YYYY');
    assertEq(moment('17:15', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).hours(), 17, 'iso: assert parse HH:mm (1)');
    assertEq(moment('24:15', [moment.ISO_8601, 'MM', 'kk:mm', 'YYYY']).hours(), 0, 'iso: assert parse kk:mm');
    assertEq(moment('17:15', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).minutes(), 15, 'iso: assert parse HH:mm (2)');
    assertEq(moment('06', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).month(), 6 - 1, 'iso: assert parse MM');
    // assertEq(moment('2012-06-01', [moment.ISO_8601, 'MM', 'HH:mm', 'YYYY']).parsingFlags().iso, true, 'iso: assert parse iso');
    // assertEq(moment('2014-05-05', [moment.ISO_8601, 'YYYY-MM-DD']).parsingFlags().iso, true, 'iso: edge case array precedence iso');
    // assertEq(moment('2014-05-05', ['YYYY-MM-DD', moment.ISO_8601]).parsingFlags().iso, false, 'iso: edge case array precedence not iso');
  });

  it('string with format - years', function () {
    assertEq(moment('67', 'YY').format('YYYY'), '2067', '67 > 2067');
    assertEq(moment('68', 'YY').format('YYYY'), '2068', '68 > 2068');
    assertEq(moment('69', 'YY').format('YYYY'), '1969', '69 > 1969');
    assertEq(moment('70', 'YY').format('YYYY'), '1970', '70 > 1970');
  });

  it('implicit cloning', function () {
    const momentA = moment([2011, 10, 10]),
      momentB = moment(momentA);
    momentA.month(5);
    assertNotEqual(momentA.month(), momentB.month(), 'Calling moment() on a moment will create a clone');
  });

  it('explicit cloning', function () {
    const momentA = moment([2011, 10, 10]),
      momentB = momentA.clone();
    momentA.month(5);
    assertNotEqual(momentA.month(), momentB.month(), 'Calling clone() on a moment will create a clone');
  });

  it('cloning carrying over utc mode', function () {
    assertEq(moment().local().clone()._isUTC, false, 'An explicit cloned local moment should have _isUTC == false');
    assertEq(moment().utc().clone()._isUTC, true, 'An cloned utc moment should have _isUTC == true');
    assertEq(moment().clone()._isUTC, false, 'An explicit cloned local moment should have _isUTC == false');
    assertEq(moment.utc().clone()._isUTC, true, 'An explicit cloned utc moment should have _isUTC == true');
    assertEq(moment(moment().local())._isUTC, false, 'An implicit cloned local moment should have _isUTC == false');
    assertEq(moment(moment().utc())._isUTC, true, 'An implicit cloned utc moment should have _isUTC == true');
    assertEq(moment(moment())._isUTC, false, 'An implicit cloned local moment should have _isUTC == false');
    assertEq(moment(moment.utc())._isUTC, true, 'An implicit cloned utc moment should have _isUTC == true');
  });

  it('parsing RFC 2822', function () {
    const testCases = {
      'Tue, 01 Nov 2016 01:23:45 UT': [2016, 10, 1, 1, 23, 45, 0],
      'Sun, 12 Apr 2015 05:06:07 GMT': [2015, 3, 12, 5, 6, 7, 0],
      'Tue, 01 Nov 2016 01:23:45 +0000': [2016, 10, 1, 1, 23, 45, 0],
      'Tue, 01 Nov 16 04:23:45 Z': [2016, 10, 1, 4, 23, 45, 0],
      '01 Nov 2016 05:23:45 z': [2016, 10, 1, 5, 23, 45, 0],
      '(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)': [2016, 10, 1, 7, 23, 45, 0],
      'Mon, 02 Jan 2017 06:00:00 -0800': [2017, 0, 2, 6, 0, 0, -8 * 60],
      'Mon, 02 Jan 2017 06:00:00 +0800': [2017, 0, 2, 6, 0, 0, +8 * 60],
      'Mon, 02 Jan 2017 06:00:00 +0330': [2017, 0, 2, 6, 0, 0, +(3 * 60 + 30)],
      'Mon, 02 Jan 2017 06:00:00 -0330': [2017, 0, 2, 6, 0, 0, -(3 * 60 + 30)],
      'Mon, 02 Jan 2017 06:00:00 PST': [2017, 0, 2, 6, 0, 0, -8 * 60],
      'Mon, 02 Jan 2017 06:00:00 PDT': [2017, 0, 2, 6, 0, 0, -7 * 60],
      'Mon, 02 Jan 2017 06:00:00 MST': [2017, 0, 2, 6, 0, 0, -7 * 60],
      'Mon, 02 Jan 2017 06:00:00 MDT': [2017, 0, 2, 6, 0, 0, -6 * 60],
      'Mon, 02 Jan 2017 06:00:00 CST': [2017, 0, 2, 6, 0, 0, -6 * 60],
      'Mon, 02 Jan 2017 06:00:00 CDT': [2017, 0, 2, 6, 0, 0, -5 * 60],
      'Mon, 02 Jan 2017 06:00:00 EST': [2017, 0, 2, 6, 0, 0, -5 * 60],
      'Mon, 02 Jan 2017 06:00:00 EDT': [2017, 0, 2, 6, 0, 0, -4 * 60]
    };

    let inp, tokens, parseResult, expResult;

    for (inp in testCases) {
      tokens = testCases[inp];
      parseResult = moment(inp, moment.RFC_2822, true).parseZone();
      expResult = moment.utc(tokens.slice(0, 6)).utcOffset(tokens[6], true);
      assertOk(parseResult.isValid(), inp);
      // assertOk(parseResult.parsingFlags().rfc2822, inp + ' - rfc2822 parsingFlag');
      assertEq(parseResult.utcOffset(), expResult.utcOffset(), inp + ' - zone');
      assertEq(parseResult.valueOf(), expResult.valueOf(), inp + ' - correctness');
    }
  });


  it('non RFC 2822 strings', function () {
    const testCases = {
      'RFC2822 datetime with all options but invalid day delimiter': 'Tue. 01 Nov 2016 01:23:45 GMT',
      'RFC2822 datetime with mismatching Day (weekday v date)': 'Mon, 01 Nov 2016 01:23:45 GMT'
    };
    let testCase;

    for (testCase in testCases) {
      const testResult = moment(testCases[testCase], moment.RFC_2822, true);
      assertOk(!testResult.isValid(), testCase + ': ' + testResult + ' - is invalid rfc2822');
      // assertOk(!testResult.parsingFlags().rfc2822, testCase + ': ' + testResult + ' - rfc2822 parsingFlag');
    }
  });


  it('parsing RFC 2822 in a different locale', function () {
    const testCases = {
      'clean RFC2822 datetime with all options': 'Tue, 01 Nov 2016 01:23:45 UT',
      'clean RFC2822 datetime without comma': 'Tue 01 Nov 2016 02:23:45 GMT',
      'clean RFC2822 datetime without seconds': 'Tue, 01 Nov 2016 03:23 +0000',
      'clean RFC2822 datetime without century': 'Tue, 01 Nov 16 04:23:45 Z',
      'clean RFC2822 datetime without day': '01 Nov 2016 05:23:45 z',
      'clean RFC2822 datetime with single-digit day-of-month': 'Tue, 1 Nov 2016 06:23:45 GMT',
      'RFC2822 datetime with CFWSs': '(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)'
    };
    let testCase;

    try {
      moment.locale('ru', ruLocale);
      for (testCase in testCases) {
        const testResult = moment(testCases[testCase], moment.RFC_2822, true);
        assertOk(testResult.isValid(), testResult.toString());
        // assertOk(testResult.parsingFlags().rfc2822, testResult + ' - rfc2822 parsingFlag');
      }
    } finally {
      moment.locale('en');
    }
  });

  it('non RFC 2822 strings in a different locale', function () {
    const testCases = {
      'RFC2822 datetime with all options but invalid day delimiter': 'Tue. 01 Nov 2016 01:23:45 GMT',
      'RFC2822 datetime with mismatching Day (week v date)': 'Mon, 01 Nov 2016 01:23:45 GMT'
    };
    let testCase;

    try {
      moment.locale('ru', ruLocale);
      for (testCase in testCases) {
        const testResult = moment(testCases[testCase], moment.RFC_2822, true);
        assertOk(!testResult.isValid(), testResult.toString());
        // assertOk(!testResult.parsingFlags().rfc2822, testResult + ' - rfc2822 parsingFlag');
      }
    }
    finally {
      moment.locale('en');
    }
  });

  it('parsing iso', function () {
    let offset = moment([2011, 9, 8]).utcOffset(),
      pad = function (input) {
        if (input < 10) {
          return '0' + input;
        }
        return '' + input;
      },
      hourOffset = (offset > 0 ? Math.floor(offset / 60) : Math.ceil(offset / 60)),
      minOffset = offset - (hourOffset * 60),
      tz = (offset >= 0) ?
        '+' + pad(hourOffset) + ':' + pad(minOffset) :
        '-' + pad(-hourOffset) + ':' + pad(-minOffset),
      tz2 = tz.replace(':', ''),
      tz3 = tz2.slice(0, 3),
      // Tz3 removes minutes digit so will break the tests when parsed if they all use the same minutes digit
      minutesForTz3 = pad((4 + minOffset) % 60),
      minute = pad(4 + minOffset),

      formats = [
        ['2011-10-08', '2011-10-08T00:00:00.000' + tz],
        ['2011-10-08T18', '2011-10-08T18:00:00.000' + tz],
        ['2011-10-08T18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08T18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08T18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-10-08T18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-10-08T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-10-08T18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-10-08T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011-10-08 18', '2011-10-08T18:00:00.000' + tz],
        ['2011-10-08 18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08 18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-10-08 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-10-08 18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-10-08 18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-10-08 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-10-08 18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-10-08 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011-W40', '2011-10-03T00:00:00.000' + tz],
        ['2011-W40-6', '2011-10-08T00:00:00.000' + tz],
        ['2011-W40-6T18', '2011-10-08T18:00:00.000' + tz],
        ['2011-W40-6T18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6T18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6T18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-W40-6T18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-W40-6T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-W40-6T18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-W40-6T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011-W40-6 18', '2011-10-08T18:00:00.000' + tz],
        ['2011-W40-6 18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6 18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-W40-6 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-W40-6 18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-W40-6 18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-W40-6 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-W40-6 18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-W40-6 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011-281', '2011-10-08T00:00:00.000' + tz],
        ['2011-281T18', '2011-10-08T18:00:00.000' + tz],
        ['2011-281T18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-281T18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-281T18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-281T18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-281T18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-281T18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-281T18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-281T18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-281T18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-281T18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-281T18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011-281 18', '2011-10-08T18:00:00.000' + tz],
        ['2011-281 18:04', '2011-10-08T18:04:00.000' + tz],
        ['2011-281 18:04:20', '2011-10-08T18:04:20.000' + tz],
        ['2011-281 18:04' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011-281 18:04:20' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011-281 18:04' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011-281 18:04:20' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011-281 18:04' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011-281 18:04:20' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011-281 18:04:20.1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011-281 18:04:20.11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011-281 18:04:20.111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['20111008T18', '2011-10-08T18:00:00.000' + tz],
        ['20111008T1804', '2011-10-08T18:04:00.000' + tz],
        ['20111008T180420', '2011-10-08T18:04:20.000' + tz],
        ['20111008T1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['20111008T180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['20111008T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['20111008T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['20111008T1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['20111008T180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['20111008T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['20111008T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['20111008T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['20111008 18', '2011-10-08T18:00:00.000' + tz],
        ['20111008 1804', '2011-10-08T18:04:00.000' + tz],
        ['20111008 180420', '2011-10-08T18:04:20.000' + tz],
        ['20111008 1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['20111008 180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['20111008 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['20111008 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['20111008 1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['20111008 180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['20111008 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['20111008 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['20111008 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011W40', '2011-10-03T00:00:00.000' + tz],
        ['2011W406', '2011-10-08T00:00:00.000' + tz],
        ['2011W406T18', '2011-10-08T18:00:00.000' + tz],
        ['2011W406T1804', '2011-10-08T18:04:00.000' + tz],
        ['2011W406T180420', '2011-10-08T18:04:20.000' + tz],
        ['2011W406 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011W406T1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011W406T180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011W406T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011W406T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011W406T1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011W406T180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011W406T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011W406T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011W406T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011W406 18', '2011-10-08T18:00:00.000' + tz],
        ['2011W406 1804', '2011-10-08T18:04:00.000' + tz],
        ['2011W406 180420', '2011-10-08T18:04:20.000' + tz],
        ['2011W406 1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011W406 180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011W406 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011W406 1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011W406 180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011W406 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011W406 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011W406 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011281', '2011-10-08T00:00:00.000' + tz],
        ['2011281T18', '2011-10-08T18:00:00.000' + tz],
        ['2011281T1804', '2011-10-08T18:04:00.000' + tz],
        ['2011281T180420', '2011-10-08T18:04:20.000' + tz],
        ['2011281T1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011281T180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011281T1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011281T180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011281T1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011281T180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011281T180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011281T180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011281T180420,111' + tz2, '2011-10-08T18:04:20.111' + tz],
        ['2011281 18', '2011-10-08T18:00:00.000' + tz],
        ['2011281 1804', '2011-10-08T18:04:00.000' + tz],
        ['2011281 180420', '2011-10-08T18:04:20.000' + tz],
        ['2011281 1804' + tz, '2011-10-08T18:04:00.000' + tz],
        ['2011281 180420' + tz, '2011-10-08T18:04:20.000' + tz],
        ['2011281 1804' + tz2, '2011-10-08T18:04:00.000' + tz],
        ['2011281 180420' + tz2, '2011-10-08T18:04:20.000' + tz],
        ['2011281 1804' + tz3, '2011-10-08T18:' + minutesForTz3 + ':00.000' + tz],
        ['2011281 180420' + tz3, '2011-10-08T18:' + minutesForTz3 + ':20.000' + tz],
        ['2011281 180420,1' + tz2, '2011-10-08T18:04:20.100' + tz],
        ['2011281 180420,11' + tz2, '2011-10-08T18:04:20.110' + tz],
        ['2011281 180420,111' + tz2, '2011-10-08T18:04:20.111' + tz]
      ], i;
    for (i = 0; i < formats.length; i++) {
      assertEq(moment(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        formats[i][1], 'moment should be able to parse ISO ' + formats[i][0]);
      assertEq(moment(formats[i][0], moment.ISO_8601).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        formats[i][1], 'moment should be able to parse specified ISO ' + formats[i][0]);
      assertEq(moment(formats[i][0], moment.ISO_8601, true).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        formats[i][1], 'moment should be able to parse specified strict ISO ' + formats[i][0]);
    }
  });

  it('non iso 8601 strings', function () {
    assertOk(!moment('2015-10T10:15', moment.ISO_8601, true).isValid(), 'incomplete date with time');
    assertOk(!moment('2015-W10T10:15', moment.ISO_8601, true).isValid(), 'incomplete week date with time');
    assertOk(!moment('201510', moment.ISO_8601, true).isValid(), 'basic YYYYMM is not allowed');
    assertOk(!moment('2015W10T1015', moment.ISO_8601, true).isValid(), 'incomplete week date with time (basic)');
    assertOk(!moment('2015-10-08T1015', moment.ISO_8601, true).isValid(), 'mixing extended and basic format');
    assertOk(!moment('20151008T10:15', moment.ISO_8601, true).isValid(), 'mixing basic and extended format');
    assertOk(!moment('2015-10-1', moment.ISO_8601, true).isValid(), 'missing zero padding for day');
  });

  it('parsing iso week year/week/weekday', function () {
    assertEq(moment.utc('2007-W01').format(), '2007-01-01T00:00:00Z', '2008 week 1 (1st Jan Mon)');
    assertEq(moment.utc('2008-W01').format(), '2007-12-31T00:00:00Z', '2008 week 1 (1st Jan Tue)');
    assertEq(moment.utc('2003-W01').format(), '2002-12-30T00:00:00Z', '2008 week 1 (1st Jan Wed)');
    assertEq(moment.utc('2009-W01').format(), '2008-12-29T00:00:00Z', '2009 week 1 (1st Jan Thu)');
    assertEq(moment.utc('2010-W01').format(), '2010-01-04T00:00:00Z', '2010 week 1 (1st Jan Fri)');
    assertEq(moment.utc('2011-W01').format(), '2011-01-03T00:00:00Z', '2011 week 1 (1st Jan Sat)');
    assertEq(moment.utc('2012-W01').format(), '2012-01-02T00:00:00Z', '2012 week 1 (1st Jan Sun)');
  });

  it('parsing weekdays verifies the day', function () {
    // string with format
    assertOk(!moment('Wed 08-10-2017', 'ddd MM-DD-YYYY').isValid(), 'because day of week is incorrect for the date');
    assertOk(moment('Thu 08-10-2017', 'ddd MM-DD-YYYY').isValid(), 'because day of week is correct for the date');
  });

  it('parsing weekday on utc dates verifies day acccording to utc time', function () {
    assertOk(moment.utc('Mon 03:59', 'ddd HH:mm').isValid(), 'Monday 03:59');
  });

  it('parsing weekday on local dates verifies day acccording to local time', function () {
    // this doesn't do much useful if you're not in the US or at least close to it
    assertOk(moment('Mon 03:59', 'ddd HH:mm').isValid(), 'Monday 03:59');
  });

  it('parsing weekday on utc dates with specified offsets verifies day acccording to that offset', function () {
    assertOk(moment.utc('Mon 03:59 +12:00', 'ddd HH:mm Z', true).isValid(), 'Monday 03:59');
  });

  it('parsing weekday on local dates with specified offsets verifies day acccording to that offset', function () {
    // if you're in the US, these times will all be sometime Sunday, but they shoud parse as Monday
    assertOk(moment('Mon 03:59 +12:00', 'ddd HH:mm Z', true).isValid(), 'Monday 03:59');
  });

  it('parsing week year/week/weekday (dow 1, doy 4)', function () {
    moment.locale('dow:1,doy:4', { week: { dow: 1, doy: 4 } });

    assertEq(moment.utc('2007-01', 'gggg-ww').format(), '2007-01-01T00:00:00Z', '2007 week 1 (1st Jan Mon)');
    assertEq(moment.utc('2008-01', 'gggg-ww').format(), '2007-12-31T00:00:00Z', '2008 week 1 (1st Jan Tue)');
    assertEq(moment.utc('2003-01', 'gggg-ww').format(), '2002-12-30T00:00:00Z', '2003 week 1 (1st Jan Wed)');
    assertEq(moment.utc('2009-01', 'gggg-ww').format(), '2008-12-29T00:00:00Z', '2009 week 1 (1st Jan Thu)');
    assertEq(moment.utc('2010-01', 'gggg-ww').format(), '2010-01-04T00:00:00Z', '2010 week 1 (1st Jan Fri)');
    assertEq(moment.utc('2011-01', 'gggg-ww').format(), '2011-01-03T00:00:00Z', '2011 week 1 (1st Jan Sat)');
    assertEq(moment.utc('2012-01', 'gggg-ww').format(), '2012-01-02T00:00:00Z', '2012 week 1 (1st Jan Sun)');

    moment.defineLocale('dow:1,doy:4', null);
  });

  it('parsing week year/week/weekday (dow 1, doy 7)', function () {
    moment.locale('dow:1,doy:7', { week: { dow: 1, doy: 7 } });

    assertEq(moment.utc('2007-01', 'gggg-ww').format(), '2007-01-01T00:00:00Z', '2007 week 1 (1st Jan Mon)');
    assertEq(moment.utc('2008-01', 'gggg-ww').format(), '2007-12-31T00:00:00Z', '2008 week 1 (1st Jan Tue)');
    assertEq(moment.utc('2003-01', 'gggg-ww').format(), '2002-12-30T00:00:00Z', '2003 week 1 (1st Jan Wed)');
    assertEq(moment.utc('2009-01', 'gggg-ww').format(), '2008-12-29T00:00:00Z', '2009 week 1 (1st Jan Thu)');
    assertEq(moment.utc('2010-01', 'gggg-ww').format(), '2009-12-28T00:00:00Z', '2010 week 1 (1st Jan Fri)');
    assertEq(moment.utc('2011-01', 'gggg-ww').format(), '2010-12-27T00:00:00Z', '2011 week 1 (1st Jan Sat)');
    assertEq(moment.utc('2012-01', 'gggg-ww').format(), '2011-12-26T00:00:00Z', '2012 week 1 (1st Jan Sun)');
    moment.defineLocale('dow:1,doy:7', null);
  });

  it('parsing week year/week/weekday (dow 0, doy 6)', function () {
    moment.locale('dow:0,doy:6', { week: { dow: 0, doy: 6 } });

    assertEq(moment.utc('2007-01', 'gggg-ww').format(), '2006-12-31T00:00:00Z', '2007 week 1 (1st Jan Mon)');
    assertEq(moment.utc('2008-01', 'gggg-ww').format(), '2007-12-30T00:00:00Z', '2008 week 1 (1st Jan Tue)');
    assertEq(moment.utc('2003-01', 'gggg-ww').format(), '2002-12-29T00:00:00Z', '2003 week 1 (1st Jan Wed)');
    assertEq(moment.utc('2009-01', 'gggg-ww').format(), '2008-12-28T00:00:00Z', '2009 week 1 (1st Jan Thu)');
    assertEq(moment.utc('2010-01', 'gggg-ww').format(), '2009-12-27T00:00:00Z', '2010 week 1 (1st Jan Fri)');
    assertEq(moment.utc('2011-01', 'gggg-ww').format(), '2010-12-26T00:00:00Z', '2011 week 1 (1st Jan Sat)');
    assertEq(moment.utc('2012-01', 'gggg-ww').format(), '2012-01-01T00:00:00Z', '2012 week 1 (1st Jan Sun)');
    moment.defineLocale('dow:0,doy:6', null);
  });

  it('parsing week year/week/weekday (dow 6, doy 12)', function () {
    moment.locale('dow:6,doy:12', { week: { dow: 6, doy: 12 } });

    assertEq(moment.utc('2007-01', 'gggg-ww').format(), '2006-12-30T00:00:00Z', '2007 week 1 (1st Jan Mon)');
    assertEq(moment.utc('2008-01', 'gggg-ww').format(), '2007-12-29T00:00:00Z', '2008 week 1 (1st Jan Tue)');
    assertEq(moment.utc('2003-01', 'gggg-ww').format(), '2002-12-28T00:00:00Z', '2003 week 1 (1st Jan Wed)');
    assertEq(moment.utc('2009-01', 'gggg-ww').format(), '2008-12-27T00:00:00Z', '2009 week 1 (1st Jan Thu)');
    assertEq(moment.utc('2010-01', 'gggg-ww').format(), '2009-12-26T00:00:00Z', '2010 week 1 (1st Jan Fri)');
    assertEq(moment.utc('2011-01', 'gggg-ww').format(), '2011-01-01T00:00:00Z', '2011 week 1 (1st Jan Sat)');
    assertEq(moment.utc('2012-01', 'gggg-ww').format(), '2011-12-31T00:00:00Z', '2012 week 1 (1st Jan Sun)');
    moment.defineLocale('dow:6,doy:12', null);
  });

  it('parsing ISO with Z', function () {
    let i, mom, formats = [
      ['2011-10-08T18:04', '2011-10-08T18:04:00.000'],
      ['2011-10-08T18:04:20', '2011-10-08T18:04:20.000'],
      ['2011-10-08T18:04:20.1', '2011-10-08T18:04:20.100'],
      ['2011-10-08T18:04:20.11', '2011-10-08T18:04:20.110'],
      ['2011-10-08T18:04:20.111', '2011-10-08T18:04:20.111'],
      ['2011-W40-6T18', '2011-10-08T18:00:00.000'],
      ['2011-W40-6T18:04', '2011-10-08T18:04:00.000'],
      ['2011-W40-6T18:04:20', '2011-10-08T18:04:20.000'],
      ['2011-W40-6T18:04:20.1', '2011-10-08T18:04:20.100'],
      ['2011-W40-6T18:04:20.11', '2011-10-08T18:04:20.110'],
      ['2011-W40-6T18:04:20.111', '2011-10-08T18:04:20.111'],
      ['2011-281T18', '2011-10-08T18:00:00.000'],
      ['2011-281T18:04', '2011-10-08T18:04:00.000'],
      ['2011-281T18:04:20', '2011-10-08T18:04:20.000'],
      ['2011-281T18:04:20', '2011-10-08T18:04:20.000'],
      ['2011-281T18:04:20.1', '2011-10-08T18:04:20.100'],
      ['2011-281T18:04:20.11', '2011-10-08T18:04:20.110'],
      ['2011-281T18:04:20.111', '2011-10-08T18:04:20.111']
    ];

    for (i = 0; i < formats.length; i++) {
      mom = moment(formats[i][0] + 'Z').utc();
      assertEq(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], 'moment should be able to parse ISO in UTC ' + formats[i][0] + 'Z');

      mom = moment(formats[i][0] + ' Z').utc();
      assertEq(mom.format('YYYY-MM-DDTHH:mm:ss.SSS'), formats[i][1], 'moment should be able to parse ISO in UTC ' + formats[i][0] + ' Z');
    }
  });


/*  it('parsing iso with T', function () {
    assertEq(moment('2011-10-08T18')._f, 'YYYY-MM-DDTHH', 'should include \'T\' in the format');
    assertEq(moment('2011-10-08T18:20')._f, 'YYYY-MM-DDTHH:mm', 'should include \'T\' in the format');
    assertEq(moment('2011-10-08T18:20:13')._f, 'YYYY-MM-DDTHH:mm:ss', 'should include \'T\' in the format');
    assertEq(moment('2011-10-08T18:20:13.321')._f, 'YYYY-MM-DDTHH:mm:ss.SSSS', 'should include \'T\' in the format');

    assertEq(moment('2011-10-08 18')._f, 'YYYY-MM-DD HH', 'should not include \'T\' in the format');
    assertEq(moment('2011-10-08 18:20')._f, 'YYYY-MM-DD HH:mm', 'should not include \'T\' in the format');
    assertEq(moment('2011-10-08 18:20:13')._f, 'YYYY-MM-DD HH:mm:ss', 'should not include \'T\' in the format');
    assertEq(moment('2011-10-08 18:20:13.321')._f, 'YYYY-MM-DD HH:mm:ss.SSSS', 'should not include \'T\' in the format');
  });*/

  it('parsing iso Z timezone', function () {
    let i,
      formats = [
        ['2011-10-08T18:04Z', '2011-10-08T18:04:00.000+00:00'],
        ['2011-10-08T18:04:20Z', '2011-10-08T18:04:20.000+00:00'],
        ['2011-10-08T18:04:20.111Z', '2011-10-08T18:04:20.111+00:00']
      ];
    for (i = 0; i < formats.length; i++) {
      assertEq(moment.utc(formats[i][0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), formats[i][1], 'moment should be able to parse ISO ' + formats[i][0]);
    }
  });

  it('parsing iso Z timezone into local', function () {
    const m = moment('2011-10-08T18:04:20.111Z');

    assertEq(m.utc().format('YYYY-MM-DDTHH:mm:ss.SSS'), '2011-10-08T18:04:20.111', 'moment should be able to parse ISO 2011-10-08T18:04:20.111Z');
  });

  it('parsing iso with more subsecond precision digits', function () {
    assertEq(moment.utc('2013-07-31T22:00:00.0000000Z').format(), '2013-07-31T22:00:00Z', 'more than 3 subsecond digits');
  });

  it('null or empty', function () {
    assertEq(moment('').isValid(), false, 'moment(\'\') is not valid');
    assertEq(moment(null).isValid(), false, 'moment(null) is not valid');
    assertEq(moment(null, 'YYYY-MM-DD').isValid(), false, 'moment(\'\', \'format\') is not valid');
    assertEq(moment('', 'YYYY-MM-DD').isValid(), false, 'moment(\'\', \'format\') is not valid');
    assertEq(moment.utc('').isValid(), false, 'moment.utc(\'\') is not valid');
    assertEq(moment.utc(null).isValid(), false, 'moment.utc(null) is not valid');
    assertEq(moment.utc(null, 'YYYY-MM-DD').isValid(), false, 'moment.utc(null) is not valid');
    assertEq(moment.utc('', 'YYYY-MM-DD').isValid(), false, 'moment.utc(\'\', \'YYYY-MM-DD\') is not valid');
  });

  it('first century', function () {
    assertEq(moment([0, 0, 1]).format('YYYY-MM-DD'), '0000-01-01', 'Year AD 0');
    assertEq(moment([99, 0, 1]).format('YYYY-MM-DD'), '0099-01-01', 'Year AD 99');
    assertEq(moment([999, 0, 1]).format('YYYY-MM-DD'), '0999-01-01', 'Year AD 999');
    assertEq(moment('0 1 1', 'YYYY MM DD').format('YYYY-MM-DD'), '0000-01-01', 'Year AD 0');
    assertEq(moment('999 1 1', 'YYYY MM DD').format('YYYY-MM-DD'), '0999-01-01', 'Year AD 999');
    assertEq(moment('0 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00000-01-01', 'Year AD 0');
    assertEq(moment('99 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00099-01-01', 'Year AD 99');
    assertEq(moment('999 1 1', 'YYYYY MM DD').format('YYYYY-MM-DD'), '00999-01-01', 'Year AD 999');
  });

  it('six digit years', function () {
    assertEq(moment([-270000, 0, 1]).format('YYYYY-MM-DD'), '-270000-01-01', 'format BC 270,001');
    assertEq(moment([270000, 0, 1]).format('YYYYY-MM-DD'), '270000-01-01', 'format AD 270,000');
    assertEq(moment('-270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), -270000, 'parse BC 270,001');
    assertEq(moment('270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), 270000, 'parse AD 270,000');
    assertEq(moment('+270000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), 270000, 'parse AD +270,000');
    assertEq(moment.utc('-270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), -270000, 'parse utc BC 270,001');
    assertEq(moment.utc('270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), 270000, 'parse utc AD 270,000');
    assertEq(moment.utc('+270000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), 270000, 'parse utc AD +270,000');
  });

  it('negative four digit years', function () {
    assertEq(moment('-1000-01-01', 'YYYYY-MM-DD').toDate().getFullYear(), -1000, 'parse BC 1,001');
    assertEq(moment.utc('-1000-01-01', 'YYYYY-MM-DD').toDate().getUTCFullYear(), -1000, 'parse utc BC 1,001');
  });

  xit('strict parsing', function () {
    assertEq(moment('2014-', 'YYYY-Q', true).isValid(), false, 'fail missing quarter');

    assertEq(moment('2012-05', 'YYYY-MM', true).format('YYYY-MM'), '2012-05', 'parse correct string');
    assertEq(moment(' 2012-05', 'YYYY-MM', true).isValid(), false, 'fail on extra whitespace');
    assertEq(moment('foo 2012-05', '[foo] YYYY-MM', true).format('YYYY-MM'), '2012-05', 'handle fixed text');
    assertEq(moment('2012 05', 'YYYY-MM', true).isValid(), false, 'fail on different separator');
    assertEq(moment('2012 05', 'YYYY MM DD', true).isValid(), false, 'fail on too many tokens');

    assertEq(moment('05 30 2010', ['DD MM YYYY', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with bad date');
    assertEq(moment('05 30 2010', ['', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with invalid format');
    assertEq(moment('05 30 2010', [' DD MM YYYY', 'MM DD YYYY'], true).format('MM DD YYYY'), '05 30 2010', 'array with non-matching format');

    assertEq(moment('2010.*...', 'YYYY.*', true).isValid(), false, 'invalid format with regex chars');
    assertEq(moment('2010.*', 'YYYY.*', true).year(), 2010, 'valid format with regex chars');
    assertEq(moment('.*2010.*', '.*YYYY.*', true).year(), 2010, 'valid format with regex chars on both sides');

    //strict tokens
    assertEq(moment('-5-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid negative year');
    assertEq(moment('2-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit year');
    assertEq(moment('20-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid two-digit year');
    assertEq(moment('201-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid three-digit year');
    assertEq(moment('2010-05-25', 'YYYY-MM-DD', true).isValid(), true, 'valid four-digit year');
    assertEq(moment('22010-05-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid five-digit year');

    assertEq(moment('12-05-25', 'YY-MM-DD', true).isValid(), true, 'valid two-digit year');
    assertEq(moment('2012-05-25', 'YY-MM-DD', true).isValid(), false, 'invalid four-digit year');

    assertEq(moment('-5-05-25', 'Y-MM-DD', true).isValid(), true, 'valid negative year');
    assertEq(moment('2-05-25', 'Y-MM-DD', true).isValid(), true, 'valid one-digit year');
    assertEq(moment('20-05-25', 'Y-MM-DD', true).isValid(), true, 'valid two-digit year');
    assertEq(moment('201-05-25', 'Y-MM-DD', true).isValid(), true, 'valid three-digit year');

    assertEq(moment('2012-5-25', 'YYYY-M-DD', true).isValid(), true, 'valid one-digit month');
    assertEq(moment('2012-5-25', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit month');
    assertEq(moment('2012-05-25', 'YYYY-M-DD', true).isValid(), true, 'valid one-digit month');
    assertEq(moment('2012-05-25', 'YYYY-MM-DD', true).isValid(), true, 'valid one-digit month');

    assertEq(moment('2012-05-2', 'YYYY-MM-D', true).isValid(), true, 'valid one-digit day');
    assertEq(moment('2012-05-2', 'YYYY-MM-DD', true).isValid(), false, 'invalid one-digit day');
    assertEq(moment('2012-05-02', 'YYYY-MM-D', true).isValid(), true, 'valid two-digit day');
    assertEq(moment('2012-05-02', 'YYYY-MM-DD', true).isValid(), true, 'valid two-digit day');

    assertEq(moment('+002012-05-25', 'YYYYY-MM-DD', true).isValid(), true, 'valid six-digit year');
    assertEq(moment('+2012-05-25', 'YYYYY-MM-DD', true).isValid(), false, 'invalid four-digit year');

    //thse are kinda pointless, but they should work as expected
    assertEq(moment('1', 'S', true).isValid(), true, 'valid one-digit milisecond');
    assertEq(moment('12', 'S', true).isValid(), false, 'invalid two-digit milisecond');
    assertEq(moment('123', 'S', true).isValid(), false, 'invalid three-digit milisecond');

    assertEq(moment('1', 'SS', true).isValid(), false, 'invalid one-digit milisecond');
    assertEq(moment('12', 'SS', true).isValid(), true, 'valid two-digit milisecond');
    assertEq(moment('123', 'SS', true).isValid(), false, 'invalid three-digit milisecond');

    assertEq(moment('1', 'SSS', true).isValid(), false, 'invalid one-digit milisecond');
    assertEq(moment('12', 'SSS', true).isValid(), false, 'invalid two-digit milisecond');
    assertEq(moment('123', 'SSS', true).isValid(), true, 'valid three-digit milisecond');

    // strict parsing respects month length
    assertOk(moment('1 January 2000', 'D MMMM YYYY', true).isValid(), 'capital long-month + MMMM');
    assertOk(!moment('1 January 2000', 'D MMM YYYY', true).isValid(), 'capital long-month + MMM');
    assertOk(!moment('1 Jan 2000', 'D MMMM YYYY', true).isValid(), 'capital short-month + MMMM');
    assertOk(moment('1 Jan 2000', 'D MMM YYYY', true).isValid(), 'capital short-month + MMM');
    assertOk(moment('1 january 2000', 'D MMMM YYYY', true).isValid(), 'lower long-month + MMMM');
    assertOk(!moment('1 january 2000', 'D MMM YYYY', true).isValid(), 'lower long-month + MMM');
    assertOk(!moment('1 jan 2000', 'D MMMM YYYY', true).isValid(), 'lower short-month + MMMM');
    assertOk(moment('1 jan 2000', 'D MMM YYYY', true).isValid(), 'lower short-month + MMM');
  });

  it('parsing into a locale', function () {
    moment.defineLocale('parselocale', {
      months: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
      monthsShort: 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_')
    });

    moment.locale('en');

    assertEq(moment('2012 seven', 'YYYY MMM', 'parselocale').month(), 6, 'should be able to parse in a specific locale');

    moment.locale('parselocale');

    assertEq(moment('2012 july', 'YYYY MMM', 'en').month(), 6, 'should be able to parse in a specific locale');

    moment.defineLocale('parselocale', null);
  });

  function getVerifier() {
    return function (input: string, format: string, expected: string, description: string, asymetrical?: boolean): void {
      const m = moment(input, format);
      assertEq(m.format('YYYY MM DD'), expected, 'compare: ' + description);

      //testing round trip
      if (!asymetrical) {
        assertEq(m.format(format), input, 'round trip: ' + description);
      }
    };
  }

  it('parsing week and weekday information', function () {
    const ver = getVerifier();
    const currentWeekOfYear = moment().week();
    const expectedDate2012 = moment([2012, 0, 1])
      .day(0)
      .add((currentWeekOfYear - 1), 'weeks')
      .format('YYYY MM DD');
    const expectedDate1999 = moment([1999, 0, 1])
      .day(0)
      .add((currentWeekOfYear - 1), 'weeks')
      .format('YYYY MM DD');

    // year
    ver('12', 'gg', expectedDate2012, 'week-year two digits');
    ver('2012', 'gggg', expectedDate2012, 'week-year four digits');
    ver('99', 'gg', expectedDate1999, 'week-year two digits previous year');
    ver('1999', 'gggg', expectedDate1999, 'week-year four digits previous year');

    ver('99', 'GG', '1999 01 04', 'iso week-year two digits');
    ver('1999', 'GGGG', '1999 01 04', 'iso week-year four digits');

    ver('13', 'GG', '2012 12 31', 'iso week-year two digits previous year');
    ver('2013', 'GGGG', '2012 12 31', 'iso week-year four digits previous year');

    // year + week
    ver('1999 37', 'gggg w', '1999 09 05', 'week');
    ver('1999 37', 'gggg ww', '1999 09 05', 'week double');
    ver('1999 37', 'GGGG W', '1999 09 13', 'iso week');
    ver('1999 37', 'GGGG WW', '1999 09 13', 'iso week double');

    ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso day');
    ver('1999 37 04', 'GGGG WW E', '1999 09 16', 'iso day wide', true);

    ver('1999 37 4', 'gggg ww e', '1999 09 09', 'day');
    ver('1999 37 04', 'gggg ww e', '1999 09 09', 'day wide', true);

    // year + week + day
    ver('1999 37 4', 'gggg ww d', '1999 09 09', 'd');
    ver('1999 37 Th', 'gggg ww dd', '1999 09 09', 'dd');
    ver('1999 37 Thu', 'gggg ww ddd', '1999 09 09', 'ddd');
    ver('1999 37 Thursday', 'gggg ww dddd', '1999 09 09', 'dddd');

    // lower-order only
    assertEq(moment('22', 'ww').week(), 22, 'week sets the week by itself');
    assertEq(moment('22', 'ww').weekYear(), moment().weekYear(), 'week keeps this year');
    assertEq(moment('2012 22', 'YYYY ww').weekYear(), 2012, 'week keeps parsed year');

    assertEq(moment('22', 'WW').isoWeek(), 22, 'iso week sets the week by itself');
    assertEq(moment('2012 22', 'YYYY WW').weekYear(), 2012, 'iso week keeps parsed year');
    assertEq(moment('22', 'WW').isoWeekYear(), moment().isoWeekYear(), 'iso week keeps this year');

    // order
    ver('6 2013 2', 'e gggg w', '2013 01 12', 'order doesn\'t matter');
    ver('6 2013 2', 'E GGGG W', '2013 01 12', 'iso order doesn\'t matter');

    //can parse other stuff too
    assertEq(moment('1999-W37-4 3:30', 'GGGG-[W]WW-E HH:mm').format('YYYY MM DD HH:mm'), '1999 09 16 03:30', 'parsing weeks and hours');

    // In safari, all years before 1300 are shifted back with one day.
    // http://stackoverflow.com/questions/20768975/safari-subtracts-1-day-from-dates-before-1300
    if (new Date('1300-01-01').getUTCFullYear() === 1300) {
      // Years less than 100
      ver('0098-06', 'GGGG-WW', '0098 02 03', 'small years work', true);
    }
  });

  it('parsing localized weekdays', function () {
    const ver = getVerifier();
    try {
      moment.locale('dow:1,doy:4', {
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        week: { dow: 1, doy: 4 }
      });
      ver('1999 37 4', 'GGGG WW E', '1999 09 16', 'iso ignores locale');
      ver('1999 37 7', 'GGGG WW E', '1999 09 19', 'iso ignores locale');

      ver('1999 37 0', 'gggg ww e', '1999 09 13', 'localized e uses local doy and dow: 0 = monday');
      ver('1999 37 4', 'gggg ww e', '1999 09 17', 'localized e uses local doy and dow: 4 = friday');

      ver('1999 37 1', 'gggg ww d', '1999 09 13', 'localized d uses 0-indexed days: 1 = monday');
      ver('1999 37 Lu', 'gggg ww dd', '1999 09 13', 'localized d uses 0-indexed days: Mo');
      ver('1999 37 lun.', 'gggg ww ddd', '1999 09 13', 'localized d uses 0-indexed days: Mon');
      ver('1999 37 lundi', 'gggg ww dddd', '1999 09 13', 'localized d uses 0-indexed days: Monday');
      ver('1999 37 4', 'gggg ww d', '1999 09 16', 'localized d uses 0-indexed days: 4');

      //sunday goes at the end of the week
      ver('1999 37 0', 'gggg ww d', '1999 09 19', 'localized d uses 0-indexed days: 0 = sund');
      ver('1999 37 Di', 'gggg ww dd', '1999 09 19', 'localized d uses 0-indexed days: 0 = sund');
    } finally {
      moment.defineLocale('dow:1,doy:4', null);
      moment.locale('en');
    }
  });

  // todo: use sinon
  it('parsing with customized two-digit year', function () {
    const original = moment.parseTwoDigitYear;
    try {
      assertEq(moment('68', 'YY').year(), 2068);
      assertEq(moment('69', 'YY').year(), 1969);
/*      moment.parseTwoDigitYear = function (input) {
        return +input + (+input > 30 ? 1900 : 2000);
      };
      assertEq(moment('68', 'YY').year(), 1968);
      assertEq(moment('67', 'YY').year(), 1967);
      assertEq(moment('31', 'YY').year(), 1931);
      assertEq(moment('30', 'YY').year(), 2030);*/
    }
    finally {
      moment.parseTwoDigitYear = original;
    }
  });

  it('array with strings', function () {
    assertEq(moment(['2014', '7', '31']).isValid(), true, 'string array + isValid');
  });

  // should not be supported
  // xit('object with strings', function () {
    // assertEq(moment({ year: '2014', month: '7', day: '31' }).isValid(), true, 'string object + isValid');
  // });

  it('utc with array of formats', function () {
    assertEq(moment.utc('2014-01-01', ['YYYY-MM-DD', 'YYYY-MM']).format(), '2014-01-01T00:00:00Z', 'moment.utc works with array of formats');
  });

  it('parsing invalid string weekdays', function () {
    assertEq(false, moment('a', 'dd').isValid(),
      'dd with invalid weekday, non-strict');
    assertEq(false, moment('a', 'dd', true).isValid(),
      'dd with invalid weekday, strict');
    assertEq(false, moment('a', 'ddd').isValid(),
      'ddd with invalid weekday, non-strict');
    assertEq(false, moment('a', 'ddd', true).isValid(),
      'ddd with invalid weekday, strict');
    assertEq(false, moment('a', 'dddd').isValid(),
      'dddd with invalid weekday, non-strict');
    assertEq(false, moment('a', 'dddd', true).isValid(),
      'dddd with invalid weekday, strict');
  });

  it('milliseconds', function () {
    assertEq(moment('1', 'S').milliseconds(), 100);
    assertEq(moment('12', 'SS').milliseconds(), 120);
    assertEq(moment('123', 'SSS').milliseconds(), 123);
    assertEq(moment('1234', 'SSSS').milliseconds(), 123);
    assertEq(moment('12345', 'SSSSS').milliseconds(), 123);
    assertEq(moment('123456', 'SSSSSS').milliseconds(), 123);
    assertEq(moment('1234567', 'SSSSSSS').milliseconds(), 123);
    assertEq(moment('12345678', 'SSSSSSSS').milliseconds(), 123);
    assertEq(moment('123456789', 'SSSSSSSSS').milliseconds(), 123);
  });

  it('hmm', function () {
    assertEq(moment('123', 'hmm', true).format('HH:mm:ss'), '01:23:00', '123 with hmm');
    assertEq(moment('123a', 'hmmA', true).format('HH:mm:ss'), '01:23:00', '123a with hmmA');
    assertEq(moment('123p', 'hmmA', true).format('HH:mm:ss'), '13:23:00', '123p with hmmA');

    assertEq(moment('1234', 'hmm', true).format('HH:mm:ss'), '12:34:00', '1234 with hmm');
    assertEq(moment('1234a', 'hmmA', true).format('HH:mm:ss'), '00:34:00', '1234a with hmmA');
    assertEq(moment('1234p', 'hmmA', true).format('HH:mm:ss'), '12:34:00', '1234p with hmmA');

    assertEq(moment('12345', 'hmmss', true).format('HH:mm:ss'), '01:23:45', '12345 with hmmss');
    assertEq(moment('12345a', 'hmmssA', true).format('HH:mm:ss'), '01:23:45', '12345a with hmmssA');
    assertEq(moment('12345p', 'hmmssA', true).format('HH:mm:ss'), '13:23:45', '12345p with hmmssA');
    assertEq(moment('112345', 'hmmss', true).format('HH:mm:ss'), '11:23:45', '112345 with hmmss');
    assertEq(moment('112345a', 'hmmssA', true).format('HH:mm:ss'), '11:23:45', '112345a with hmmssA');
    assertEq(moment('112345p', 'hmmssA', true).format('HH:mm:ss'), '23:23:45', '112345p with hmmssA');

    assertEq(moment('023', 'Hmm', true).format('HH:mm:ss'), '00:23:00', '023 with Hmm');
    assertEq(moment('123', 'Hmm', true).format('HH:mm:ss'), '01:23:00', '123 with Hmm');
    assertEq(moment('1234', 'Hmm', true).format('HH:mm:ss'), '12:34:00', '1234 with Hmm');
    assertEq(moment('1534', 'Hmm', true).format('HH:mm:ss'), '15:34:00', '1234 with Hmm');
    assertEq(moment('12345', 'Hmmss', true).format('HH:mm:ss'), '01:23:45', '12345 with Hmmss');
    assertEq(moment('112345', 'Hmmss', true).format('HH:mm:ss'), '11:23:45', '112345 with Hmmss');
    assertEq(moment('172345', 'Hmmss', true).format('HH:mm:ss'), '17:23:45', '112345 with Hmmss');
  });

  it('Y token', function () {
    assertEq(moment('1-1-2010', 'M-D-Y', true).year(), 2010, 'parsing Y');
  });


  /*
  it('parsing flags retain parsed date parts', function () {
    const a = moment('10 p', 'hh:mm a');
    assertEq(a.parsingFlags().parsedDateParts[3], 10, 'parsed 10 as the hour');
    assertEq(a.parsingFlags().parsedDateParts[0], undefined, 'year was not parsed');
    assertEq(a.parsingFlags().meridiem, 'p', 'meridiem flag was added');
    const b = moment('10:30', ['MMDDYY', 'HH:mm']);
    assertEq(b.parsingFlags().parsedDateParts[3], 10, 'multiple format parshing matched hour');
    assertEq(b.parsingFlags().parsedDateParts[0], undefined, 'array is properly copied, no residual data from first token parse');
  });
*/

  it('parsing only meridiem results in invalid date', function () {
    assertOk(!moment('alkj', 'hh:mm a').isValid(), 'because an a token is used, a meridiem will be parsed but nothing else was so invalid');
    assertOk(moment('02:30 p more extra stuff', 'hh:mm a').isValid(), 'because other tokens were parsed, date is valid');
    assertOk(moment('1/1/2016 extra data', ['a', 'M/D/YYYY']).isValid(), 'took second format, does not pick up on meridiem parsed from first format (good copy)');
  });

  it('invalid dates return invalid for methods that access the _d prop', function () {
    const momentAsDate = moment([2015, 12, 1]).toDate();
    assertOk(momentAsDate instanceof Date, 'toDate returns a Date object');
    assertOk(isNaN(momentAsDate.getTime()), 'toDate returns an invalid Date invalid');
  });

  it('k, kk', function () {
    for (let i = -1; i <= 24; i++) {
      const kVal = i + ':15:59';
      const kkVal = (i < 10 ? '0' : '') + i + ':15:59';
      if (i !== 24) {
        assertOk(moment(kVal, 'k:mm:ss').isSame(moment(kVal, 'H:mm:ss')), kVal + ' k parsing');
        assertOk(moment(kkVal, 'kk:mm:ss').isSame(moment(kkVal, 'HH:mm:ss')), kkVal + ' kk parsing');
      } else {
        assertEq(moment(kVal, 'k:mm:ss').format('k:mm:ss'), kVal, kVal + ' k parsing');
        assertEq(moment(kkVal, 'kk:mm:ss').format('kk:mm:ss'), kkVal, kkVal + ' skk parsing');
      }
    }
  });

});
