
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { lvLocale } from '../../i18n/lv';

// localeModule('en');
describe('locale: lv', () => {
  beforeAll(() => {
    moment.locale('lv', lvLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

// localeModule('lv');

  it('parse', function () {
    var _tests = 'Janvāris Jan_Februāris Feb_Marts Mar_Aprīlis Apr_Maijs Mai_Jūnijs Jūn_Jūlijs Jūl_Augusts Aug_Septembris Sep_Oktobris Okt_Novembris Nov_Decembris Dec'.split('_'),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Svētdiena, Februāris 14. 2010, 3:25:50 pm'],
        ['ddd, hA', 'Svētd, 3PM'],
        ['M Mo MM MMMM MMM', '2 2. 02 Februāris Feb'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. Svētdiena Svētd Sv'],
        ['DDD DDDo DDDD', '45 45. 045'],
        ['w wo ww', '6 6. 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45. day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 Februāris 2010'],
        ['LLL', '14 Februāris 2010 15:25'],
        ['LLLL', 'Svētdiena, 14 Februāris 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 Feb 2010'],
        ['lll', '14 Feb 2010 15:25'],
        ['llll', 'Svētd, 14 Feb 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1.', '1st');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2.', '2nd');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3.', '3rd');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4.', '4th');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5.', '5th');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6.', '6th');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7.', '7th');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8.', '8th');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9.', '9th');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10.', '10th');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11.', '11th');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12.', '12th');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13.', '13th');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14.', '14th');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15.', '15th');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16.', '16th');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17.', '17th');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18.', '18th');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19.', '19th');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20.', '20th');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21.', '21st');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22.', '22nd');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23.', '23rd');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24.', '24th');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25.', '25th');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26.', '26th');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27.', '27th');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28.', '28th');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29.', '29th');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30.', '30th');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31.', '31st');
  });

  it('format month', function () {
    var expected = 'Janvāris Jan_Februāris Feb_Marts Mar_Aprīlis Apr_Maijs Mai_Jūnijs Jūn_Jūlijs Jūl_Augusts Aug_Septembris Sep_Oktobris Okt_Novembris Nov_Decembris Dec'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'Svētdiena Svētd Sv_Pirmdiena Pirmd Pi_Otrdiena Otrd Ot_Trešdiena Trešd Tr_Ceturtdiena Ceturtd Ce_Piektdiena Piektd Pk_Sestdiena Sestd Se'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'dažām sekundēm', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'minūtes', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'minūtes', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minūtēm', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minūtēm', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'stundas', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'stundas', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 stundām', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 stundām', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 stundām', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'dienas', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'dienas', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dienām', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'dienas', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dienām', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dienām', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'mēneša', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'mēneša', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'mēneša', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 mēnešiem', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 mēnešiem', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 mēnešiem', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'mēneša', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 mēnešiem', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'gada', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 gadiem', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'gada', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 gadiem', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'pēc dažām sekundēm', 'prefix');
    assertEq(moment(0).from(30000), 'pirms dažām sekundēm', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'pirms dažām sekundēm', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'pēc dažām sekundēm', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'pēc 5 dienām', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Today at 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Today at 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Today at 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Tomorrow at 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Today at 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Yesterday at 12:00', 'yesterday at the same time');
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

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
  });
});
