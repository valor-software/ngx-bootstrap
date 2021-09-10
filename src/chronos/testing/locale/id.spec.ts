
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { idLocale } from '../../i18n/id';

// localeModule('id');
describe('locale: id', () => {
  beforeAll(() => {
    moment.locale('id', idLocale);
  });

  afterAll(() => {
    moment.locale('id');
  });

  it('parse', function () {
    var _tests = 'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Ags_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'),
      i;

    function equalTest(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 0; i < 12; i++) {
      tests[i] = _tests[i].split(' ');
      equalTest(tests[i][0], 'MMM', i);
      equalTest(tests[i][1], 'MMM', i);
      equalTest(tests[i][0], 'MMMM', i);
      equalTest(tests[i][1], 'MMMM', i);
      equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  it('format', function () {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Minggu, Februari 14 2010, 3:25:50 sore'],
        ['ddd, hA', 'Min, 3sore'],
        ['M Mo MM MMMM MMM', '2 2 02 Februari Feb'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0 Minggu Min Mg'],
        ['DDD DDDo DDDD', '45 45 045'],
        ['w wo ww', '7 7 07'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'sore sore'],
        ['LTS', '15.25.50'],
        ['L', '14/02/2010'],
        ['LL', '14 Februari 2010'],
        ['LLL', '14 Februari 2010 pukul 15.25'],
        ['LLLL', 'Minggu, 14 Februari 2010 pukul 15.25'],
        ['l', '14/2/2010'],
        ['ll', '14 Feb 2010'],
        ['lll', '14 Feb 2010 pukul 15.25'],
        ['llll', 'Min, 14 Feb 2010 pukul 15.25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format month', function () {
    var expected = 'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Ags_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'Minggu Min Mg_Senin Sen Sn_Selasa Sel Sl_Rabu Rab Rb_Kamis Kam Km_Jumat Jum Jm_Sabtu Sab Sb'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'beberapa detik', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'semenit', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'semenit', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 menit', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 menit', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'sejam', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'sejam', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 jam', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 jam', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 jam', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'sehari', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'sehari', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 hari', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'sehari', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 hari', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 hari', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'sebulan', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'sebulan', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'sebulan', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 bulan', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 bulan', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 bulan', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'sebulan', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 bulan', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'setahun', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 tahun', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'setahun', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 tahun', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'dalam beberapa detik', 'prefix');
    assertEq(moment(0).from(30000), 'beberapa detik yang lalu', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'beberapa detik yang lalu', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'dalam beberapa detik', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'dalam 5 hari', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Hari ini pukul 12.00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Hari ini pukul 12.25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Hari ini pukul 13.00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Besok pukul 12.00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Hari ini pukul 11.00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Kemarin pukul 12.00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [pukul] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [pukul] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [pukul] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('dddd [lalu pukul] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [lalu pukul] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [lalu pukul] LT'), 'Today - ' + i + ' days end of day');
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

  it('meridiem', function () {
    assertEq(moment([2011, 2, 23, 0, 0]).format('A'), 'pagi', 'before dawn');
    assertEq(moment([2011, 2, 23, 6, 0]).format('A'), 'pagi', 'morning');
    assertEq(moment([2011, 2, 23, 9, 0]).format('A'), 'pagi', 'before noon');
    assertEq(moment([2011, 2, 23, 12, 0]).format('A'), 'siang', 'noon');
    assertEq(moment([2011, 2, 23, 14, 0]).format('A'), 'siang', 'afternoon');
    assertEq(moment([2011, 2, 23, 16, 0]).format('A'), 'sore', 'afternoon');
    assertEq(moment([2011, 2, 23, 18, 0]).format('A'), 'sore', 'afternoon');
    assertEq(moment([2011, 2, 23, 20, 0]).format('A'), 'malam', 'night');
    assertEq(moment([2011, 2, 23, 23, 0]).format('A'), 'malam', 'night');
  });

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2011, 11, 26]).format('w ww wo'), '1 01 1', 'Dec 26 2011 should be week 1');
    assertEq(moment([2012,  0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012,  0,  2]).format('w ww wo'), '2 02 2', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012,  0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012,  0,  9]).format('w ww wo'), '3 03 3', 'Jan  9 2012 should be week 3');
  });
});
