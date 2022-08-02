
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { thBeLocale } from '../../i18n/th-be';

describe('locale: th', () => {
// localeModule('th');
  beforeAll(() => {
    moment.locale('th-be', thBeLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
  it('parse', function () {
    var _tests = 'มกราคม ม.ค._กุมภาพันธ์ ก.พ._มีนาคม มี.ค._เมษายน เม.ย._พฤษภาคม พ.ค._มิถุนายน มิ.ย._กรกฎาคม ก.ค._สิงหาคม ส.ค._กันยายน ก.ย._ตุลาคม ต.ค._พฤศจิกายน พ.ย._ธันวาคม ธ.ค.'.split('_'),
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
        ['dddd, Do MMMM YYYY, h:mm:ss a', 'อาทิตย์, 14 กุมภาพันธ์ 2553, 3:25:50 หลังเที่ยง'],
        ['ddd, h A', 'อา., 3 หลังเที่ยง'],
        ['M Mo MM MMMM MMM', '2 2 02 กุมภาพันธ์ ก.พ.'],
        ['YYYY YY', '2553 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0 อาทิตย์ อา. อา.'],
        ['DDD DDDo DDDD', '45 45 045'],
        ['w wo ww', '8 8 08'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'หลังเที่ยง หลังเที่ยง'],
        ['[the] DDDo [day of the year]', 'the 45 day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2553'],
        ['LL', '14 กุมภาพันธ์ 2553'],
        ['LLL', '14 กุมภาพันธ์ 2553 เวลา 15:25'],
        ['LLLL', 'วันอาทิตย์ที่ 14 กุมภาพันธ์ 2553 เวลา 15:25'],
        ['l', '14/2/2553'],
        ['ll', '14 ก.พ. 2553'],
        ['lll', '14 ก.พ. 2553 เวลา 15:25'],
        ['llll', 'วันอา.ที่ 14 ก.พ. 2553 เวลา 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format month', function () {
    var expected = 'มกราคม ม.ค._กุมภาพันธ์ ก.พ._มีนาคม มี.ค._เมษายน เม.ย._พฤษภาคม พ.ค._มิถุนายน มิ.ย._กรกฎาคม ก.ค._สิงหาคม ส.ค._กันยายน ก.ย._ตุลาคม ต.ค._พฤศจิกายน พ.ย._ธันวาคม ธ.ค.'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'อาทิตย์ อา. อา._จันทร์ จ. จ._อังคาร อ. อ._พุธ พ. พ._พฤหัสบดี พฤ. พฤ._ศุกร์ ศ. ศ._เสาร์ ส. ส.'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'ไม่กี่วินาที', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), '1 นาที', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), '1 นาที', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 นาที', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 นาที', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), '1 ชั่วโมง', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), '1 ชั่วโมง', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 ชั่วโมง', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 ชั่วโมง', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 ชั่วโมง', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), '1 วัน', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), '1 วัน', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 วัน', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), '1 วัน', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 วัน', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 วัน', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), '1 เดือน', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), '1 เดือน', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), '1 เดือน', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 เดือน', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 เดือน', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 เดือน', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), '1 เดือน', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 เดือน', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), '1 ปี', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 ปี', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), '1 ปี', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 ปี', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'อีก ไม่กี่วินาที', 'prefix');
    assertEq(moment(0).from(30000), 'ไม่กี่วินาทีที่แล้ว', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'ไม่กี่วินาทีที่แล้ว', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'อีก ไม่กี่วินาที', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'อีก 5 วัน', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'วันนี้ เวลา 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'วันนี้ เวลา 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'วันนี้ เวลา 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'พรุ่งนี้ เวลา 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'วันนี้ เวลา 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'เมื่อวานนี้ เวลา 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd[หน้า เวลา] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd[หน้า เวลา] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd[หน้า เวลา] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[วัน]dddd[ที่แล้ว เวลา] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[วัน]dddd[ที่แล้ว เวลา] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[วัน]dddd[ที่แล้ว เวลา] LT'), 'Today - ' + i + ' days end of day');
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
