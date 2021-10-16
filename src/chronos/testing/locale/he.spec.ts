
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { heLocale } from '../../i18n/he';

// localeModule('en');
describe('locale: he', () => {
  beforeAll(() => {
    moment.locale('he', heLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
// localeModule('he');

  it('parse', function () {
    var _tests = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split('_'),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'ראשון, פברואר 14 2010, 3:25:50 אחה"צ'],
        ['ddd, h A', 'א׳, 3 אחרי הצהריים'],
        ['M Mo MM MMMM MMM', '2 2 02 פברואר פבר׳'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0 ראשון א׳ א'],
        ['DDD DDDo DDDD', '45 45 045'],
        ['w wo ww', '8 8 08'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'אחה"צ אחרי הצהריים'],
        ['[the] DDDo [day of the year]', 'the 45 day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 בפברואר 2010'],
        ['LLL', '14 בפברואר 2010 15:25'],
        ['LLLL', 'ראשון, 14 בפברואר 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 פבר׳ 2010'],
        ['lll', '14 פבר׳ 2010 15:25'],
        ['llll', 'א׳, 14 פבר׳ 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format month', function () {
    var expected = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'ראשון א׳ א|שני ב׳ ב|שלישי ג׳ ג|רביעי ד׳ ד|חמישי ה׳ ה|שישי ו׳ ו|שבת ש׳ ש'.split('|'), i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'מספר שניות', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'דקה', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'דקה', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 דקות', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 דקות', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'שעה', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'שעה', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), 'שעתיים', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 שעות', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 שעות', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'יום', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'יום', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), 'יומיים', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'יום', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 ימים', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 ימים', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'חודש', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'חודש', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'חודש', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), 'חודשיים', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), 'חודשיים', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 חודשים', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'חודש', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 חודשים', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'שנה', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), 'שנתיים', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 3699 }), true), '10 שנים', '345 days = 10 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 7340 }), true), '20 שנה', '548 days = 20 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'שנה', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 שנים', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'בעוד מספר שניות', 'prefix');
    assertEq(moment(0).from(30000), 'לפני מספר שניות', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'לפני מספר שניות', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'בעוד מספר שניות', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'בעוד 5 ימים', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'היום ב־12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'היום ב־12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'היום ב־13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'מחר ב־12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'היום ב־11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'אתמול ב־12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [בשעה] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [בשעה] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [בשעה] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[ביום] dddd [האחרון בשעה] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[ביום] dddd [האחרון בשעה] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[ביום] dddd [האחרון בשעה] LT'), 'Today - ' + i + ' days end of day');
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
