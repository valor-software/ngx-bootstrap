
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { arLocale } from '../../i18n/ar';

// localeModule('ar');

var months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
];
describe('locale: ar', () => {
  beforeAll(() => {
    moment.locale('ar', arLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var tests = months, i;

    function equalit(input, mmm, i) {
      assertEq(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
    }

    for (i = 0; i < 12; i++) {
      equalit(tests[i], 'MMM', i);
      equalit(tests[i], 'MMM', i);
      equalit(tests[i], 'MMMM', i);
      equalit(tests[i], 'MMMM', i);
      equalit(tests[i].toLocaleLowerCase(), 'MMMM', i);
      equalit(tests[i].toLocaleLowerCase(), 'MMMM', i);
      equalit(tests[i].toLocaleUpperCase(), 'MMMM', i);
      equalit(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  it('format', function () {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'الأحد، فبراير ١٤ ٢٠١٠، ٣:٢٥:٥٠ م'],
        ['ddd, hA', 'أحد، ٣م'],
        ['M Mo MM MMMM MMM', '٢ ٢ ٠٢ فبراير فبراير'],
        ['YYYY YY', '٢٠١٠ ١٠'],
        ['D Do DD', '١٤ ١٤ ١٤'],
        ['d do dddd ddd dd', '٠ ٠ الأحد أحد ح'],
        ['DDD DDDo DDDD', '٤٥ ٤٥ ٠٤٥'],
        ['w wo ww', '٨ ٨ ٠٨'],
        ['h hh', '٣ ٠٣'],
        ['H HH', '١٥ ١٥'],
        ['m mm', '٢٥ ٢٥'],
        ['s ss', '٥٠ ٥٠'],
        ['a A', 'م م'],
        ['[the] DDDo [day of the year]', 'the ٤٥ day of the year'],
        ['LT', '١٥:٢٥'],
        ['LTS', '١٥:٢٥:٥٠'],
        ['L', '١٤/\u200f٢/\u200f٢٠١٠'],
        ['LL', '١٤ فبراير ٢٠١٠'],
        ['LLL', '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
        ['LLLL', 'الأحد ١٤ فبراير ٢٠١٠ ١٥:٢٥'],
        ['l', '١٤/\u200f٢/\u200f٢٠١٠'],
        ['ll', '١٤ فبراير ٢٠١٠'],
        ['lll', '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
        ['llll', 'أحد ١٤ فبراير ٢٠١٠ ١٥:٢٥']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '١', '1');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '٢', '2');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '٣', '3');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '٤', '4');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '٥', '5');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '٦', '6');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '٧', '7');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '٨', '8');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '٩', '9');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '١٠', '10');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '١١', '11');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '١٢', '12');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '١٣', '13');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '١٤', '14');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '١٥', '15');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '١٦', '16');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '١٧', '17');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '١٨', '18');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '١٩', '19');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '٢٠', '20');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '٢١', '21');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '٢٢', '22');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '٢٣', '23');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '٢٤', '24');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '٢٥', '25');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '٢٦', '26');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '٢٧', '27');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '٢٨', '28');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '٢٩', '29');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '٣٠', '30');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '٣١', '31');
  });

  it('format month', function () {
    var expected = months, i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM'), expected[i], expected[i]);
      assertEq(moment([2011, i, 1]).format('MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), '٤٤ ثانية', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'دقيقة واحدة', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'دقيقة واحدة', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), 'دقيقتان', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '٤٤ دقيقة', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'ساعة واحدة', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'ساعة واحدة', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), 'ساعتان', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '٥ ساعات', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '٢١ ساعة', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'يوم واحد', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'يوم واحد', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), 'يومان', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'يوم واحد', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '٥ أيام', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '٢٥ يومًا', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'شهر واحد', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'شهر واحد', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'شهر واحد', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), 'شهران', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), 'شهران', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '٣ أشهر', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'شهر واحد', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '٥ أشهر', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'عام واحد', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), 'عامان', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'عام واحد', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '٥ أعوام', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'بعد ٣٠ ثانية', 'prefix');
    assertEq(moment(0).from(30000), 'منذ ٣٠ ثانية', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'منذ ثانية واحدة', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'بعد ٣٠ ثانية', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'بعد ٥ أيام', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'اليوم عند الساعة ١٢:٠٠', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'اليوم عند الساعة ١٢:٢٥', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'اليوم عند الساعة ١٣:٠٠', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'غدًا عند الساعة ١٢:٠٠', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'اليوم عند الساعة ١١:٠٠', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'أمس عند الساعة ١٢:٠٠', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [عند الساعة] LT'), 'Today - ' + i + ' days end of day');
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

  it('weeks year starting wednesday custom', function () {
    assertEq(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
    assertEq(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
    assertEq(moment('2003 1 6', 'gggg w d').format('gggg w d'), '٢٠٠٣ ١ ٦', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
    assertEq(moment('2003 1 0', 'gggg w e').format('gggg w e'), '٢٠٠٣ ١ ٠', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');
  });

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2011, 11, 31]).format('w ww wo'), '١ ٠١ ١', 'Dec 31 2011 should be week 1');
    assertEq(moment([2012, 0, 6]).format('w ww wo'), '١ ٠١ ١', 'Jan  6 2012 should be week 1');
    assertEq(moment([2012, 0, 7]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan  7 2012 should be week 2');
    assertEq(moment([2012, 0, 13]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan 13 2012 should be week 2');
    assertEq(moment([2012, 0, 14]).format('w ww wo'), '٣ ٠٣ ٣', 'Jan 14 2012 should be week 3');
  });

  it('no leading zeros in long date formats', function () {
    var i, j, longDateStr, shortDateStr;
    for (i = 1; i <= 9; ++i) {
      for (j = 1; j <= 9; ++j) {
        longDateStr = moment([2014, i, j]).format('L');
        shortDateStr = moment([2014, i, j]).format('l');
        assertEq(longDateStr, shortDateStr, 'should not have leading zeros in month or day');
      }
    }
  });

// locale-specific
  it('ar strict mode parsing works', function () {
    var m, formattedDate;
    m = moment().locale('ar');
    formattedDate = m.format('l');
    assertEq(moment.utc(formattedDate, 'l', 'ar', false).isValid(), true, 'Non-strict parsing works');
    assertEq(moment.utc(formattedDate, 'l', 'ar', true).isValid(), true, 'Strict parsing must work');
  });
});
