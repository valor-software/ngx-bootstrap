
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { ukLocale } from '../../i18n/uk';
// localeModule('uk');

describe('locale: uk', () => {
  beforeAll(() => {
    moment.locale('uk', ukLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var _tests = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split('_'),
      i;

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
        ['dddd, Do MMMM YYYY, HH:mm:ss', 'неділя, 14-го лютого 2010, 15:25:50'],
        ['ddd, h A', 'нд, 3 дня'],
        ['M Mo MM MMMM MMM', '2 2-й 02 лютий лют'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14-го 14'],
        ['d do dddd ddd dd', '0 0-й неділя нд нд'],
        ['DDD DDDo DDDD', '45 45-й 045'],
        ['w wo ww', '7 7-й 07'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'дня дня'],
        ['DDDo [день року]', '45-й день року'],
        ['LTS', '15:25:50'],
        ['L', '14.02.2010'],
        ['LL', '14 лютого 2010 р.'],
        ['LLL', '14 лютого 2010 р., 15:25'],
        ['LLLL', 'неділя, 14 лютого 2010 р., 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format meridiem', function () {
    assertEq(moment([2012, 11, 28, 0, 0]).format('A'), 'ночі', 'night');
    assertEq(moment([2012, 11, 28, 3, 59]).format('A'), 'ночі', 'night');
    assertEq(moment([2012, 11, 28, 4, 0]).format('A'), 'ранку', 'morning');
    assertEq(moment([2012, 11, 28, 11, 59]).format('A'), 'ранку', 'morning');
    assertEq(moment([2012, 11, 28, 12, 0]).format('A'), 'дня', 'afternoon');
    assertEq(moment([2012, 11, 28, 16, 59]).format('A'), 'дня', 'afternoon');
    assertEq(moment([2012, 11, 28, 17, 0]).format('A'), 'вечора', 'evening');
    assertEq(moment([2012, 11, 28, 23, 59]).format('A'), 'вечора', 'evening');
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1-й', '1-й');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2-й', '2-й');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3-й', '3-й');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4-й', '4-й');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5-й', '5-й');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6-й', '6-й');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7-й', '7-й');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8-й', '8-й');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9-й', '9-й');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10-й', '10-й');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11-й', '11-й');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12-й', '12-й');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13-й', '13-й');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14-й', '14-й');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15-й', '15-й');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16-й', '16-й');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17-й', '17-й');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18-й', '18-й');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19-й', '19-й');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20-й', '20-й');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21-й', '21-й');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22-й', '22-й');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23-й', '23-й');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24-й', '24-й');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25-й', '25-й');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26-й', '26-й');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27-й', '27-й');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28-й', '28-й');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29-й', '29-й');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30-й', '30-й');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31-й', '31-й');
  });

  it('format month', function () {
    var expected = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format month case', function () {
    var months = {
      'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
      'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
    }, i;
    for (i = 0; i < 12; i++) {
      assertEq(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
      assertEq(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
    }
  });

  it('format week', function () {
    var expected = 'неділя нд нд_понеділок пн пн_вівторок вт вт_середа ср ср_четвер чт чт_п’ятниця пт пт_субота сб сб'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'декілька секунд', '44 seconds = seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'хвилина', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'хвилина', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 хвилини', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 хвилини', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'годину', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'годину', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 години', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 годин', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 година', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'день', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'день', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 дні', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'день', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 днів', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 11 }), true), '11 днів', '11 days = 11 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 21 }), true), '21 день', '21 days = 21 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 днів', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'місяць', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'місяць', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'місяць', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 місяці', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 місяці', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 місяці', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'місяць', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 місяців', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'рік', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 роки', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'рік', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 років', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'за декілька секунд', 'prefix');
    assertEq(moment(0).from(30000), 'декілька секунд тому', 'suffix');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'за декілька секунд', 'in seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'за 5 днів', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Сьогодні о 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Сьогодні о 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Сьогодні о 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Завтра о 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 2 }).calendar(), 'Сьогодні о 10:00', 'Now minus 2 hours');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Вчора о 12:00', 'yesterday at the same time');
    // A special case for Ukrainian since 11 hours have different preposition
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Сьогодні об 11:00', 'same day at 11 o\'clock');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('[У] dddd [о' + (m.hours() === 11 ? 'б' : '') + '] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[У] dddd [о] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[У] dddd [о] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    function makeFormat(d) {
      switch (d.day()) {
        case 0:
        case 3:
        case 5:
        case 6:
          return '[Минулої] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
        case 1:
        case 2:
        case 4:
          return '[Минулого] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
      }
    }

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today - ' + i + ' days end of day');
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

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-й', 'Dec 26 2011 should be week 1');
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1-й', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '2 02 2-й', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2-й', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '3 03 3-й', 'Jan  9 2012 should be week 3');
  });

});
