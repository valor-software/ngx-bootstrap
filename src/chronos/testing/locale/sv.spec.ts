
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { svLocale } from '../../i18n/sv';

// localeModule('en');
describe('locale: sv', () => {
  beforeAll(() => {
    moment.locale('sv', svLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
// localeModule('sv');

  it('parse', function () {
    var _tests = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split('_'),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'söndag, februari 14e 2010, 3:25:50 pm'],
        ['ddd, hA', 'sön, 3PM'],
        ['M Mo MM MMMM MMM', '2 2a 02 februari feb'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14e 14'],
        ['d do dddd ddd dd', '0 0e söndag sön sö'],
        ['DDD DDDo DDDD', '45 45e 045'],
        ['w wo ww', '6 6e 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45e day of the year'],
        ['LTS', '15:25:50'],
        ['L', '2010-02-14'],
        ['LL', '14 februari 2010'],
        ['LLL', '14 februari 2010 kl. 15:25'],
        ['LLLL', 'söndag 14 februari 2010 kl. 15:25'],
        ['l', '2010-2-14'],
        ['ll', '14 feb 2010'],
        ['lll', '14 feb 2010 15:25'],
        ['llll', 'sön 14 feb 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1a', '1a');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2a', '2a');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21a', '21a');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22a', '22a');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31a', '31a');
  });

  it('format month', function () {
    var expected = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'söndag sön sö_måndag mån må_tisdag tis ti_onsdag ons on_torsdag tor to_fredag fre fr_lördag lör lö'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'några sekunder', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'en minut', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'en minut', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuter', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minuter', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'en timme', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'en timme', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 timmar', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 timmar', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 timmar', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'en dag', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'en dag', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dagar', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'en dag', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dagar', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dagar', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'en månad', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'en månad', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'en månad', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 månader', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 månader', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 månader', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'en månad', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 månader', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'ett år', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 år', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'ett år', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 år', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'om några sekunder', 'prefix');
    assertEq(moment(0).from(30000), 'för några sekunder sedan', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'för några sekunder sedan', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'om några sekunder', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'om 5 dagar', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Idag 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Idag 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Idag 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Imorgon 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Idag 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Igår 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('[På] dddd LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[På] dddd LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[På] dddd LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[I] dddd[s] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[I] dddd[s] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[I] dddd[s] LT'), 'Today - ' + i + ' days end of day');
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52a', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1a', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1a', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2a', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2a', 'Jan 15 2012 should be week 2');
  });
});
