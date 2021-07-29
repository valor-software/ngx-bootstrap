
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { plLocale } from '../../i18n/pl';

// localeModule('en');
describe('locale: pl', () => {
  beforeAll(() => {
    moment.locale('pl', plLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
  // localeModule('pl');

  it('parse', function () {
    var _tests = 'styczeń stycznia sty_luty lutego lut_marzec marca mar_kwiecień kwietnia kwi_maj maja maj_czerwiec czerwca cze_lipiec lipca lip_sierpień sierpnia sie_wrzesień września wrz_październik października paź_listopad listopada lis_grudzień grudnia gru'.split('_'),
      i;

    function equalTest(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 0; i < 12; i++) {
      tests[i] = _tests[i].split(' ');
      equalTest(tests[i][0], 'MMM', i);
      equalTest(tests[i][1], 'MMM', i);
      equalTest(tests[i][2], 'MMM', i);
      equalTest(tests[i][0], 'MMMM', i);
      equalTest(tests[i][1], 'MMMM', i);
      equalTest(tests[i][2], 'MMMM', i);
      equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][2].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][2].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  it('parse strict', function () {
    var _tests = 'styczeń stycznia sty_luty lutego lut_marzec marca mar_kwiecień kwietnia kwi_maj maja maj_czerwiec czerwca cze_lipiec lipca lip_sierpień sierpnia sie_wrzesień września wrz_październik października paź_listopad listopada lis_grudzień grudnia gru'.split('_'),
      i;

    function equalTest(input, mmm, i) {
      assertEq(moment(input, mmm, true).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 0; i < 12; i++) {
      tests[i] = _tests[i].split(' ');
      equalTest(tests[i][0], 'MMMM', i);
      equalTest(tests[i][1], 'MMMM', i);
      equalTest(tests[i][2], 'MMM', i);
      equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
      equalTest(tests[i][2].toLocaleLowerCase(), 'MMM', i);
      equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
      equalTest(tests[i][2].toLocaleUpperCase(), 'MMM', i);
    }
  });

  it('format', function () {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'niedziela, luty 14. 2010, 3:25:50 pm'],
        ['ddd, hA', 'ndz, 3PM'],
        ['M Mo MM MMMM MMM', '2 2. 02 luty lut'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. niedziela ndz Nd'],
        ['DDD DDDo DDDD', '45 45. 045'],
        ['w wo ww', '6 6. 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45. day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14.02.2010'],
        ['LL', '14 lutego 2010'],
        ['LLL', '14 lutego 2010 15:25'],
        ['LLLL', 'niedziela, 14 lutego 2010 15:25'],
        ['l', '14.2.2010'],
        ['ll', '14 lut 2010'],
        ['lll', '14 lut 2010 15:25'],
        ['llll', 'ndz, 14 lut 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
  });

  it('format month', function () {
    var expected = 'styczeń sty_luty lut_marzec mar_kwiecień kwi_maj maj_czerwiec cze_lipiec lip_sierpień sie_wrzesień wrz_październik paź_listopad lis_grudzień gru'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'niedziela ndz Nd_poniedziałek pon Pn_wtorek wt Wt_środa śr Śr_czwartek czw Cz_piątek pt Pt_sobota sob So'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'kilka sekund', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'minuta', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'minuta', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuty', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minuty', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'godzina', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'godzina', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 godziny', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 godzin', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 godzin', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), '1 dzień', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), '1 dzień', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dni', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), '1 dzień', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dni', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dni', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'miesiąc', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'miesiąc', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'miesiąc', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 miesiące', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 miesiące', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 miesiące', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'miesiąc', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 miesięcy', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'rok', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 lata', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'rok', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 lat', '5 years = 5 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 112 }), true), '112 lat', '112 years = 112 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 122 }), true), '122 lata', '122 years = 122 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 213 }), true), '213 lat', '213 years = 213 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 223 }), true), '223 lata', '223 years = 223 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'za kilka sekund', 'prefix');
    assertEq(moment(0).from(30000), 'kilka sekund temu', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'kilka sekund temu', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'za kilka sekund', 'in a few seconds');
    assertEq(moment().add({ h: 1 }).fromNow(), 'za godzinę', 'in an hour');
    assertEq(moment().add({ d: 5 }).fromNow(), 'za 5 dni', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Dziś o 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Dziś o 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Dziś o 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Jutro o 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Dziś o 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Wczoraj o 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;

    function makeFormat(d) {
      switch (d.day()) {
        case 0:
          return '[W niedzielę o] LT';

        case 2:
          return '[We wtorek o] LT';

        case 3:
          return '[W środę o] LT';

        case 5:
          return '[W piątek o] LT';

        case 6:
          return '[W sobotę o] LT';

        default:
          return '[W] dddd [o] LT';
      }
    }

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days current time');

      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days beginning of day');

      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    function makeFormat(d) {
      switch (d.day()) {
        case 0:
          return '[W zeszłą niedzielę o] LT';
        case 3:
          return '[W zeszłą środę o] LT';
        case 4:
          return '[W zeszłą czwartek o] LT';
        case 5:
          return '[W zeszłą piątek o] LT';
        case 6:
          return '[W zeszłą sobotę o] LT';
        default:
          return '[W zeszły] dddd [o] LT';
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
  });
});
