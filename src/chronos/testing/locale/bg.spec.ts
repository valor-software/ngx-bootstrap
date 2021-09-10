
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment, Khronos } from '../chain';
import { bgLocale } from '../../i18n/bg';

describe('locale: bg', () => {
  beforeAll(() => {
    moment.locale('bg', bgLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var _tests = 'януари янр_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
    function equalTest(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    let tests: string[][] = [];
    for (i = 2; i < 7; i++) {
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
      ['dddd, MMMM Do YYYY, H:mm:ss', 'неделя, февруари 14-ти 2010, 15:25:50'],
      ['ddd, hA', 'нед, 3PM'],
      ['M Mo MM MMMM MMM', '2 2-ри 02 февруари фев'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 14-ти 14'],
      ['d do dddd ddd dd', '0 0-ев неделя нед нд'],
      ['DDD DDDo DDDD', '45 45-ти 045'],
      ['w wo ww', '7 7-ми 07'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', 'pm PM'],
      ['[the] DDDo [day of the year]', 'the 45-ти day of the year'],
      ['LT', '15:25'],
      ['LTS', '15:25:50'],
      ['L', '14.02.2010'],
      ['LL', '14 февруари 2010'],
      ['LLL', '14 февруари 2010 15:25'],
      ['LLLL', 'неделя, 14 февруари 2010 15:25'],
      ['l', '14.2.2010'],
      ['ll', '14 фев 2010'],
      ['lll', '14 фев 2010 15:25'],
      ['llll', 'нед, 14 фев 2010 15:25']
    ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1-ви', '1-ви');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2-ри', '2-ри');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3-ти', '3-ти');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4-ти', '4-ти');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5-ти', '5-ти');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6-ти', '6-ти');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7-ми', '7-ми');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8-ми', '8-ми');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9-ти', '9-ти');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10-ти', '10-ти');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11-ти', '11-ти');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12-ти', '12-ти');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13-ти', '13-ти');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14-ти', '14-ти');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15-ти', '15-ти');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16-ти', '16-ти');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17-ти', '17-ти');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18-ти', '18-ти');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19-ти', '19-ти');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20-ти', '20-ти');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21-ви', '21-ви');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22-ри', '22-ри');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23-ти', '23-ти');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24-ти', '24-ти');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25-ти', '25-ти');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26-ти', '26-ти');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27-ми', '27-ми');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28-ми', '28-ми');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29-ти', '29-ти');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30-ти', '30-ти');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31-ви', '31-ви');
  });

  it('format month', function () {
    var expected = 'януари янр_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'неделя нед нд_понеделник пон пн_вторник вто вт_сряда сря ср_четвъртък чет чт_петък пет пт_събота съб сб'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'няколко секунди', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'минута', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'минута', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 минути', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 минути', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'час', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'час', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 часа', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 часа', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 часа', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'ден', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'ден', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 дни', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'ден', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 дни', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 дни', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'месец', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'месец', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'месец', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 месеца', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 месеца', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 месеца', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'месец', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 месеца', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'година', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 години', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'година', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 години', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'след няколко секунди', 'prefix');
    assertEq(moment(0).from(30000), 'преди няколко секунди', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'преди няколко секунди', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'след няколко секунди', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'след 5 дни', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Днес в 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Днес в 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Днес в 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Утре в 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Днес в 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Вчера в 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [в] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [в] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [в] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    function makeFormat(d) {

      switch (d) {
        case 0:
        case 3:
        case 6:
          return '[В изминалата] dddd [в] LT';
        case 1:
        case 2:
        case 4:
        case 5:
          return '[В изминалия] dddd [в] LT';
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
    assertEq(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ви', 'Dec 26 2011 should be week 1');
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1-ви', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '2 02 2-ри', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2-ри', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '3 03 3-ти', 'Jan  9 2012 should be week 3');
  });
});
