// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name no-shadowed-variable

import { assert } from 'chai';
import { moment } from '../chain';
import { roLocale } from '../../i18n/ro';

describe('locale: ro', () => {
  beforeAll(() => {
    moment.locale('ro', roLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var  i,
    _tests = 'Ianuarie Ian_Februarie Feb_Martie Mar_Aprilie Apr_Mai Ma_Iunie Iun_Iulie Iul_August Aug_Septembrie Sep_Octombrie Oct_Noiembrie Noi_Decembrie Dec'.split('_');

    function equalTest(input, mmm, i) {
      assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Duminica, Februarie 14 2010, 3:25:50 pm'],
        ['ddd, hA', 'Dum, 3PM'],
        ['M Mo MM MMMM MMM', '2 2 02 Februarie Feb'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0 Duminica Dum Du'],
        ['DDD DDDo DDDD', '45 45 045'],
        ['w wo ww', '6 6 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [zi a anului]', 'the 45 zi a anului'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 Februarie 2010'],
        ['LLL', '14 Februarie 2010 15:25'],
        ['LLLL', 'Duminica 14 Februarie 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 Feb 2010'],
        ['lll', '14 Feb 2010 15:25'],
        ['llll', 'Dum 14 Feb 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31st');
  });

  it('format month', function () {
    var expected = 'Ianuarie Ian_Februarie Feb_Martie Mar_Aprilie Apr_Mai Mai_Iunie Iun_Iulie Iul_August Aug_Septembrie Sep_Octombrie Oct_Noiembrie Noi_Decembrie Dec'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    let i,
      expected = 'Duminica Dum Du_Luni Lun lu_Marti Mar Ma_Miercuri Mie Mi_Joi Jo Jo_Vineri Vin Vi_Sambata Sam Sa'.split('_');
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    const start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'câteva secunde', '44 seconds = câteva secunde');
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
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), 'ani', '548 zi = 2 an');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'un an', '1 year = un an');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), 'ani', '5 years = 5 ani');
  });

  it('suffix', function () {
    assert.equal(moment(30000).from(0), 'despre câteva secunde', 'prefix');
    assert.equal(moment(0).from(30000), 'există câteva secunde', 'suffix');
  });

  it('now from now', function () {
    assert.equal(moment().fromNow(), 'există câteva secunde', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assert.equal(moment().add({ s: 30 }).fromNow(), 'despre câteva secunde', 'despre câteva secunde');
    assert.equal(moment().add({ d: 5 }).fromNow(), 'despre 5 zi', '5 zi');
  });

  it('calendar day', function () {
    const a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'Astazi la 12:00', 'Today at 12:00');
    assert.equal(moment(a).add({ m: 25 }).calendar(), 'Astazi la 12:25', 'Now plus 25 min');
    assert.equal(moment(a).add({ h: 1 }).calendar(), 'Astazi la 13:00', 'Now plus 1 hour');
    assert.equal(moment(a).add({ d: 1 }).calendar(), 'Maine la 12:00', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({ h: 1 }).calendar(), 'Astazi la 11:00', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({ d: 1 }).calendar(), 'Leri la 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assert.equal(m.calendar(), m.format('dddd [la] LT'), ' Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(), m.format('dddd [la] LT'), ' Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(), m.format('dddd [la] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assert.equal(m.calendar(), m.format('[ultimul] dddd [la] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(), m.format('[ultimul] dddd [la] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(), m.format('[ultimul] dddd [la] LT'), 'Today - ' + i + ' days end of day');
    }
  });

  it('calendar all else', function () {
    var weeksAgo = moment().subtract({ w: 1 }),
      weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
  });

  it('weeks year starting sunday formatted', function () {
    assert.equal(moment([2012, 0, 1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).format('w ww wo'), '1 01 1', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).format('w ww wo'), '1 01 1', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).format('w ww wo'), '2 02 2', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2', 'Jan 15 2012 should be week 2');
  });
});

