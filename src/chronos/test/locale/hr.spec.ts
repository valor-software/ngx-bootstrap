// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name no-shadowed-variable

import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { hrLocale } from '../../i18n/hr';

// localeModule('hr');
describe('locale: hr', () => {
  beforeAll(() => {
    moment.locale('hr', hrLocale);
  });

  afterAll(() => {
    moment.locale('hr');
  });

  // localeModule('hr');

  it('parse', function () {
    var _tests = 'Siječanj Sij_Veljača Velj_Ožujak Ožu_Travanj Tra_Svibanj Svi_Lipanj Lip_Srpanj Srp_Kolovoz Kol_Rujan Ruj_Listopad Lis_Studeni Stu_Prosinac Pro'.split(
        '_'
      ),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Nedjelja, Veljača 14. 2010, 3:25:50 pm'],
        ['ddd, hA', 'Ned, 3PM'],
        ['M Mo MM MMMM MMM', '2 2. 02 Veljača Velj'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. Nedjelja Ned Ne'],
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
        ['LL', '14 Veljača 2010'],
        ['LLL', '14 Veljača 2010 15:25'],
        ['LLLL', 'Nedjelja, 14 Veljača 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 Velj 2010'],
        ['lll', '14 Velj 2010 15:25'],
        ['llll', 'Ned, 14 Velj 2010 15:25']
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
    var expected = 'Siječanj Sij_Veljača Velj_Ožujak Ožu_Travanj Tra_Svibanj Svi_Lipanj Lip_Srpanj Srp_Kolovoz Kol_Rujan Ruj_Listopad Lis_Studeni Stu_Prosinac Pro'.split(
        '_'
      ),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'Nedjelja Ned Ne_Ponedjeljak Pon Po_Utorak Uto Ut_Srijeda Sri Sr_Četvrtak Čet Če_Petak Pet Pe_Subota Sub Su'.split(
        '_'
      ),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(
      start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
      'nekoliko sekundi',
      '44 sekundi = nekoliko sekundi'
    );
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'minuta', '45 sekundi = minuta');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'minuta', '89 sekundi = minuta');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuta', '90 sekundi = 2 minuta');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minuta', '44 minuta = 44 minuta');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'sat', '45 minuta = sat');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'sat', '89 minuta = sat');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 sati', '90 minuta = 2 sati');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 sati', '5 sati = 5 sati');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 sati', '21 sati = 21 sati');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'dan', '22 sati = dan');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'dan', '35 sati = dan');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dana', '36 sati = 2 dana');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'dan', '1 day = dan');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dana', '5 dana = 5 dana');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dana', '25 dana = 25 dana');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'mjesec', '26 dana = mjesec');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'mjesec', '30 dana = mjesec');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'mjesec', '43 dana = mjesec');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 mjeseci', '46 dana = 2 mjeseci');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 mjeseci', '75 dana = 2 mjeseci');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 mjeseci', '76 dana = 3 mjeseci');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'mjesec', '1 month = mjesec');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 mjeseci', '5 mjeseci = 5 mjeseci');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'godina', '345 dana = godina');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 godina', '548 dana = 2 godina');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'godina', '1 godina = godina');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 godina', '5 godina = 5 godina');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'za nekoliko sekundi', 'prefix');
    assertEq(moment(0).from(30000), 'nekoliko sekundi prije', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'nekoliko sekundi prije', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(
      moment()
        .add({ s: 30 })
        .fromNow(),
      'za nekoliko sekundi',
      'za nekoliko sekundi'
    );
    assertEq(
      moment()
        .add({ d: 5 })
        .fromNow(),
      'za 5 dana',
      'za 5 dana'
    );
  });

  it('calendar day', function () {
    var a = moment()
      .hours(12)
      .minutes(0)
      .seconds(0);

    assertEq(moment(a).calendar(), 'Danas u 12:00', 'today at the same time');
    assertEq(
      moment(a)
        .add({ m: 25 })
        .calendar(),
      'Danas u 12:25',
      'Now plus 25 min'
    );
    assertEq(
      moment(a)
        .add({ h: 1 })
        .calendar(),
      'Danas u 13:00',
      'Now plus 1 hour'
    );
    assertEq(
      moment(a)
        .add({ d: 1 })
        .calendar(),
      'Sutra u 12:00',
      'tomorrow at the same time'
    );
    assertEq(
      moment(a)
        .subtract({ h: 1 })
        .calendar(),
      'Danas u 11:00',
      'Now minus 1 hour'
    );
    assertEq(
      moment(a)
        .subtract({ d: 1 })
        .calendar(),
      'Jučer u 12:00',
      'yesterday at the same time'
    );
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [u] LT'), 'Today + ' + i + ' days current time');
      m
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [u] LT'), 'Today + ' + i + ' days beginning of day');
      m
        .hours(23)
        .minutes(59)
        .seconds(59)
        .milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [u] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[Zadnji] dddd [u] LT'), 'Today - ' + i + ' days current time');
      m
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0);
      assertEq(m.calendar(), m.format('[Zadnji] dddd [u] LT'), 'Today - ' + i + ' days beginning of day');
      m
        .hours(23)
        .minutes(59)
        .seconds(59)
        .milliseconds(999);
      assertEq(m.calendar(), m.format('[Zadnji] dddd [u] LT'), 'Today - ' + i + ' days end of day');
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
