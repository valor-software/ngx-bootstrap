import { assert } from 'chai';
import { moment } from '../chain';
import { roLocale } from '../../i18n/ro';

describe('locale: ro', () => {
  beforeAll(() => {
    moment.locale(roLocale.abbr, roLocale);
  });

  afterAll(() => {
    moment.locale(roLocale.abbr);
  });

  it('parse', function () {
    var i,
      _tests = 'Ianuarie Ian_Februarie Feb_Martie Mar_Aprilie Apr_Mai Ma_Iulie Iul_August Aug_Septembrie Sep_Octombrie Oct_Noiembrie Noi_Decembrie Dec'.split('_');

    function equalTest(input, mmm, i) {
      assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    const tests: string[][] = [];
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'duminică, februarie 14 2010, 3:25:50 pm'],
        ['ddd, h', 'soare, 3PM'],
        ['M Mo MM MMMM MMM', '2 2 02 februarie Feb.'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0 duminică Dum. Du'],
        ['DDD DDDo DDDD', '45 45 045'],
        ['w wo ww', '6 6 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 februarie 2010'],
        ['LLL', '14 februarie 2010 15:25'],
        ['LLLL', 'duminică 14 février 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 Feb. 2010'],
        ['lll', '14 Feb. 2010 15:25'],
        ['llll', 'Dum. 14 févr. 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format month', function () {
    var i,
      expected = 'Ianuarie Ian_Februarie Feb_Martie Mar_Aprilie Apr_Mai Ma_Iunie Iun_Iulie Iul_Augustr Aug_Septembrie Sep_Octombrie Oct_Noiembrie Noi_Decembrie Dec'.split('_');
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    let i,
      expected = 'duminica dum_luni lun_marti mar_miercuri mie_joi jo_vineri vin_sambata sam sa'.split('_')
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    const start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'cateva secunde', '44 seconds = cateva secunde');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'un minut', '45 seconds = un minut');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'un minut', '89 seconds = un minut');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minute', '90 seconds = 2 minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minute', '44 minutes = 44 minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'o ora', '45 minutes = o ora');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'o ora', '89 minutes = o ora');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 ore', '90 minutes = 2 ore');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 ore', '5 hours = 5 ore');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 ore', '21 ore = 21 ore');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'intr-o zi', '22 ore = intr-o zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'intr-o zi', '35 ore = intr-o zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 zi', '36 ore = 2 zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'intr-o zi', '1 zi = intr-o zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 zi', '5 zi = 5 zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 zi', '25 zi = 25 zi');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'o luna', '26 zi = o luna');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'o luna', '30 zi = o luna');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'o luna', '43 zi = o luna');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 luni', '46 zi = 2 luni');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 luni', '75 zi = 2 luni');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 luni', '76 zi = 3 luni');
    assert.equal(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'o luna', '1 lună = o luna');
    assert.equal(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 luni', '5 luni = 5 luni');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'un an', '345 zi = un an');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 an', '548 zi = 2 an');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'un an', '1 year = un an');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 an', '5 years = 5 an');
  });

  it('suffix', function () {
    assert.equal(moment(30000).from(0), 'în câteva secunde', 'prefix');
    assert.equal(moment(0).from(30000), 'cu câteva secunde în urmă', 'suffix');
  });

  it('now from now', function () {
    assert.equal(moment().fromNow(), 'cu câteva secunde în urmă', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assert.equal(moment().add({ s: 30 }).fromNow(), 'în câteva secunde', 'în câteva secunde');
    assert.equal(moment().add({ d: 5 }).fromNow(), 'în 5 zile', 'în 5 zile');
  });

  it('calendar day', function () {
    const a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'astăzi la. 12:00', 'Today at 12:00');
    assert.equal(moment(a).add({ m: 25 }).calendar(), 'i dag kl. 12:25', 'Now plus 25 min');
    assert.equal(moment(a).add({ h: 1 }).calendar(), 'astăzi la. 13:00', 'Now plus 1 hour');
    assert.equal(moment(a).add({ d: 1 }).calendar(), 'mâine la. 12:00', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({ h: 1 }).calendar(), 'astăzi la. 11:00', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({ d: 1 }).calendar(), 'ieri la. 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    let i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assert.equal(m.calendar(), m.format('[la] dddd [pranz] LT'), ' Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(), m.format('[la] dddd [pranz] LT'), ' Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(), m.format('[la] dddd [pranz] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    let i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assert.equal(m.calendar(), m.format(' dddd[seara] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(), m.format(' dddd[seara] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(), m.format('dddd[seara] LT'), 'Today - ' + i + ' days end of day');
    }
  });

  it('calendar all else', function () {
    let weeksAgo = moment().subtract({ w: 1 }),
      weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
  });

  it('weeks year starting sunday formatted', function () {
    assert.equal(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
  });
});

