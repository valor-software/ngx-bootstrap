
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';

// localeModule('en');
describe('locale: en', () => {
  beforeAll(() => {
    moment.locale('en');
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var i,
      _tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

    function equalit(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 0; i < 12; i++) {
      tests[i] = _tests[i].split(' ');
      equalit(tests[i][0], 'MMM', i);
      equalit(tests[i][1], 'MMM', i);
      equalit(tests[i][0], 'MMMM', i);
      equalit(tests[i][1], 'MMMM', i);
      equalit(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalit(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalit(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalit(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  it('format', function () {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Sunday, February 14th 2010, 3:25:50 pm'],
        ['ddd, hA', 'Sun, 3PM'],
        ['M Mo MM MMMM MMM', '2 2nd 02 February Feb'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14th 14'],
        ['d do dddd ddd dd', '0 0th Sunday Sun Su'],
        ['DDD DDDo DDDD', '45 45th 045'],
        ['w wo ww', '8 8th 08'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45th day of the year'],
        ['LTS', '3:25:50 PM'],
        ['L', '02/14/2010'],
        ['LL', 'February 14, 2010'],
        ['LLL', 'February 14, 2010 3:25 PM'],
        ['LLLL', 'Sunday, February 14, 2010 3:25 PM'],
        ['l', '2/14/2010'],
        ['ll', 'Feb 14, 2010'],
        ['lll', 'Feb 14, 2010 3:25 PM'],
        ['llll', 'Sun, Feb 14, 2010 3:25 PM']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
  });

  it('format month', function () {
    var i,
      expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var i,
      expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'a few seconds', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'a minute', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'a minute', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minutes', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minutes', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'an hour', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'an hour', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 hours', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 hours', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 hours', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'a day', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'a day', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 days', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'a day', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 days', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 days', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'a month', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'a month', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'a month', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 months', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 months', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 months', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'a month', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 months', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'a year', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 years', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'a year', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 years', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'in a few seconds', 'prefix');
    assertEq(moment(0).from(30000), 'a few seconds ago', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'a few seconds ago', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'in a few seconds', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'in 5 days', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Today at 12:00 PM', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Today at 12:25 PM', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Today at 1:00 PM', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Tomorrow at 12:00 PM', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Today at 11:00 AM', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Yesterday at 12:00 PM', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [at] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [at] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [at] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[Last] dddd [at] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[Last] dddd [at] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[Last] dddd [at] LT'), 'Today - ' + i + ' days end of day');
    }
  });

  it('calendar all else', function () {
    var weeksAgo = moment().subtract({ w: 1 }),
      weeksFromNow = moment().add({ w: 1 });

    assertEq(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assertEq(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assertEq(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assertEq(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
  });

  it('weeks year starting sunday format', function () {
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1st', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 7]).format('w ww wo'), '1 01 1st', 'Jan  7 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2nd', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 14]).format('w ww wo'), '2 02 2nd', 'Jan 14 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '3 03 3rd', 'Jan 15 2012 should be week 3');
  });

  it('weekdays strict parsing', function () {
    var m = moment('2015-01-01T12', moment.ISO_8601, true),
      enLocale = moment.localeData('en');

    for (var i = 0; i < 7; ++i) {
      assertEq(moment(enLocale.weekdays(m.day(i).toDate(), ''), 'dddd', true).isValid(), true, 'parse weekday ' + i);
      assertEq(moment(enLocale.weekdaysShort(m.day(i).toDate(), ''), 'ddd', true).isValid(), true, 'parse short weekday ' + i);
      assertEq(moment(enLocale.weekdaysMin(m.day(i).toDate(), ''), 'dd', true).isValid(), true, 'parse min weekday ' + i);

      // negative tests
      assertEq(moment(enLocale.weekdaysMin(m.day(i).toDate(), ''), 'ddd', true).isValid(), false, 'parse short weekday ' + i);
      assertEq(moment(enLocale.weekdaysShort(m.day(i).toDate(), ''), 'dd', true).isValid(), false, 'parse min weekday ' + i);
    }
  });

});
