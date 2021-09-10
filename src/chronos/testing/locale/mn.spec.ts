
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { mnLocale } from '../../i18n/mn';

// localeModule('en');
describe('locale: mn', () => {
  beforeAll(() => {
    moment.locale('mn', mnLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
  // localeModule('mn');

  it('parse', function () {
    var _tests = 'Нэгдүгээр сар-1 сар_Хоёрдугаар сар-2 сар_Гуравдугаар сар-3 сар_Дөрөвдүгээр сар-4 сар_Тавдугаар сар-5 сар_Зургадугаар сар-6 сар_Долдугаар сар-7 сар_Наймдугаар сар-8 сар_Есдүгээр сар-9 сар_Аравдугаар сар-10 сар_Арван нэгдүгээр сар-11 сар_Арван хоёрдугаар сар-12 сар'.split('_'), i;

    function equalTest(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 0; i < 12; i++) {
      tests[i] = _tests[i].split('-');
      equalTest(tests[i][0], 'MMM', i);
      equalTest(tests[i][1], 'MMM', i);
      equalTest(tests[i][0], 'MMMM', i);
      equalTest(tests[i][1], 'MMMM', i);
      equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }

    assertEq(moment('5 сар 11 1989', ['MMM DD YYYY']).format('YYYY-MM-DD'), '1989-05-11');
    assertEq(moment('1989 он, Арван хоёрдугаар сар 11', ['YYYY [он], MMMM DD']).format('YYYY-MM-DD'), '1989-12-11');
    assertEq(moment('1989 оны 11 сарын 2', ['YYYY [оны] MMMM[ын] DD']).format('YYYY-MM-D'), '1989-11-2');
    assertEq(moment('1989 оны 5 сарын 11 өдөр', ['YYYY [оны] MMMM[ын] Do']).format('YYYY-MM-DD'), '1989-05-11');
    assertEq(moment('1989 оны 5 сарын 11 өдөр 11:25 ҮӨ', ['YYYY [оны] MMM[ын] Do h:mm a']).format('YYYY-MM-DD h:mm a'), '1989-05-11 11:25 ҮӨ');
    assertEq(moment('2003 оны Дөрөвдүгээр сарын 11 өдөр 17:25 ҮХ', ['YYYY [оны] MMMM[ын] Do HH:mm a']).format('YYYY-MM-DD HH:mm a'), '2003-04-11 17:25 ҮХ');
  });

  it('format', function () {
    var a = [
      ['dddd, MMMM[ын] Do YYYY, h:mm:ss a', 'Ням, Хоёрдугаар сарын 14 өдөр 2010, 3:25:50 ҮХ'],
      ['ddd, hA', 'Ням, 3ҮХ'],
      ['M Mo MM MMMM MMM', '2 2 02 Хоёрдугаар сар 2 сар'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 14 өдөр 14'],
      ['d do dddd ddd dd', '0 0 өдөр Ням Ням Ня'],
      ['DDD DDDo DDDD', '45 45 өдөр 045'],
      ['w wo ww', '8 8 08'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', 'ҮХ ҮХ'],
      ['[the] DDDo [day of the year]', 'the 45 өдөр day of the year'],
      ['LTS', '15:25:50'],
      ['L', '2010-02-14'],
      ['LL', '2010 оны Хоёрдугаар сарын 14'],
      ['LLL', '2010 оны Хоёрдугаар сарын 14 15:25'],
      ['LLLL', 'Ням, 2010 оны Хоёрдугаар сарын 14 15:25'],
      ['l', '2010-2-14'],
      ['ll', '2010 оны 2 сарын 14'],
      ['lll', '2010 оны 2 сарын 14 15:25'],
      ['llll', 'Ням, 2010 оны 2 сарын 14 15:25']
    ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format meridiem', function () {
    assertEq(moment([2012, 11, 28, 0, 0]).format('A'), 'ҮӨ', 'AM');
    assertEq(moment([2012, 11, 28, 11, 59]).format('A'), 'ҮӨ', 'AM');
    assertEq(moment([2012, 11, 28, 12, 0]).format('A'), 'ҮХ', 'PM');
    assertEq(moment([2012, 11, 28, 23, 59]).format('A'), 'ҮХ', 'PM');
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1 өдөр', '1st');
  });

  it('format month', function () {
    var i,
      expected = 'Нэгдүгээр сар 1 сар_Хоёрдугаар сар 2 сар_Гуравдугаар сар 3 сар_Дөрөвдүгээр сар 4 сар_Тавдугаар сар 5 сар_Зургадугаар сар 6 сар_Долдугаар сар 7 сар_Наймдугаар сар 8 сар_Есдүгээр сар 9 сар_Аравдугаар сар 10 сар_Арван нэгдүгээр сар 11 сар_Арван хоёрдугаар сар 12 сар'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var i,
      expected = 'Ням Ням Ня_Даваа Дав Да_Мягмар Мяг Мя_Лхагва Лха Лх_Пүрэв Пүр Пү_Баасан Баа Ба_Бямба Бям Бя'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'хэдхэн секунд', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), '1 минут', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), '1 минут', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 минут', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 минут', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), '1 цаг', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), '1 цаг', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 цаг', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 цаг', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 цаг', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), '1 өдөр', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), '1 өдөр', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 өдөр', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), '1 өдөр', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 өдөр', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 өдөр', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), '1 сар', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), '1 сар', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), '1 сар', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 сар', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 сар', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 сар', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), '1 сар', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 сар', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), '1 жил', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 жил', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), '1 жил', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 жил', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'хэдхэн секундын дараа', 'prefix');
    assertEq(moment(0).from(30000), 'хэдхэн секундын өмнө', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'хэдхэн секундын өмнө', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'хэдхэн секундын дараа', 'in a few seconds');
    assertEq(moment().add({ s: 50 }).fromNow(), '1 минутын дараа', 'in a minute');
    assertEq(moment().add({ m: 5 }).fromNow(), '5 минутын дараа', 'in 5 minutes');
    assertEq(moment().add({ h: 2 }).fromNow(), '2 цагийн дараа', 'in 2 hours');
    assertEq(moment().add({ d: 5 }).fromNow(), '5 өдрийн дараа', 'in 5 days');
    assertEq(moment().add({ M: 2 }).fromNow(), '2 сарын дараа', 'in 2 months');
    assertEq(moment().add({ M: 15 }).fromNow(), '1 жилийн дараа', 'in a year');
    assertEq(moment().add({ M: 16 }).fromNow(), '1 жилийн дараа', 'in a year');
    assertEq(moment().add({ M: 23 }).fromNow(), '2 жилийн дараа', 'in 2 years');
    assertEq(moment().add({ y: 7 }).fromNow(), '7 жилийн дараа', 'in 7 years');

    assertEq(moment().subtract({ s: 30 }).fromNow(), 'хэдхэн секундын өмнө', 'a few seconds ago');
    assertEq(moment().subtract({ s: 50 }).fromNow(), '1 минутын өмнө', 'a minute ago');
    assertEq(moment().subtract({ m: 5 }).fromNow(), '5 минутын өмнө', '5 minutes ago');
    assertEq(moment().subtract({ h: 2 }).fromNow(), '2 цагийн өмнө', '2 hours ago');
    assertEq(moment().subtract({ d: 5 }).fromNow(), '5 өдрийн өмнө', '5 days ago');
    assertEq(moment().subtract({ M: 2 }).fromNow(), '2 сарын өмнө', '2 months ago');
    assertEq(moment().subtract({ M: 15 }).fromNow(), '1 жилийн өмнө', 'a year ago');
    assertEq(moment().subtract({ M: 16 }).fromNow(), '1 жилийн өмнө', 'a year ago');
    assertEq(moment().subtract({ M: 23 }).fromNow(), '2 жилийн өмнө', '2 years ago');
    assertEq(moment().subtract({ y: 7 }).fromNow(), '7 жилийн өмнө', '7 years ago');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Өнөөдөр 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Өнөөдөр 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Өнөөдөр 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Маргааш 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Өнөөдөр 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Өчигдөр 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('[Ирэх] dddd LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[Ирэх] dddd LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[Ирэх] dddd LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[Өнгөрсөн] dddd LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[Өнгөрсөн] dddd LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[Өнгөрсөн] dddd LT'), 'Today - ' + i + ' days end of day');
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 7]).format('w ww wo'), '1 01 1', 'Jan  7 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 should be week 3');
  });
});
