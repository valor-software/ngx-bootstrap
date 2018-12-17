// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name no-shadowed-variable

import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { caLocale } from '../../i18n/ca';

// localeModule('en');
describe('locale: ca', () => {
  beforeAll(() => {
    moment.locale('ca', caLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var _tests = 'gener gen._febrer feb._març mar._abril abr._maig mai._juny jun._juliol jul._agost ago._setiembre set._octubre oct._novembre nov._desembre des.'.split('_'),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'diumenge, febrer 14º 2010, 3:25:50 pm'],
        ['ddd, hA', 'dom., 3PM'],
        ['M Mo MM MMMM MMM', '2 2º 02 febrer feb.'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14º 14'],
        ['d do dddd ddd dd', '0 0º diumenge diu. di'],
        ['DDD DDDo DDDD', '45 45º 045'],
        ['w wo ww', '6 6º 06'],
        ['YYYY-MMM-DD', '2010-feb-14'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45º day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 de febrer de 2010'],
        ['LLL', '14 de febrer de 2010 15:25'],
        ['LLLL', 'diumenge, 14 de febrer de 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 de feb. de 2010'],
        ['lll', '14 de feb. de 2010 15:25'],
        ['llll', 'dom., 14 de feb. de 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
  });

  it('format month', function () {
    var expected = 'gener gen._febrer feb._març mar._abril abr._maig mai._juny jun._juliol jul._agost ago._setembre set._octubre oct._novembre nov._desembre des.'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'diumenge diu. di_dilluns dil. dl_dimarts dim. di_dimecres dix. dx_dijous dij. dj_divendres div. dv_dissabte dis. ds'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'uns segons', '44 segons = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'un minut', '45 segons = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'un minut', '89 segons = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuts', '90 segons = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minuts', '44 minuts = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'una hora', '45 minuts = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'una hora', '89 minuts = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 hores', '90 minuts = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 hores', '5 hores = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 hores', '21 hores = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'un dia', '22 hores = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'un dia', '35 hores = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dies', '36 hores = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'un dia', '1 dia = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dies', '5 dies = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dies', '25 dies = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'un mes', '26 dies = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'un mes', '30 dies = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'un mes', '43 dies = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 mesos', '46 dies = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 mesos', '75 dies = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 mesos', '76 dies = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'un mes', '1 mes = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 mesos', '5 mesos = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'un any', '345 dies = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 anys', '548 dies = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'un any', '1 any = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 anys', '5 anys = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'en uns segonss', 'prefix');
    assertEq(moment(0).from(30000), 'fa uns segons', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'fa uns segons', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'en uns segons', 'en uns segons');
    assertEq(moment().add({ d: 5 }).fromNow(), 'en 5 dies', 'en 5 dies');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'avui a les 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'avui a les 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'avui a les 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'dema a les 12:00', 'tomorrow at the same time');
    assertEq(moment(a).add({ d: 1, h: -1 }).calendar(), 'dema a les 11:00', 'tomorrow minus 1 hour');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'avui a les 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'ahir a les 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [a ' + ('la' + (m.hours() !== 1) ? 'les' : '') + '] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [a ' + ('la' + (m.hours() !== 1) ? 'les' : '') + '] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [a ' + ('la' + (m.hours() !== 1) ? 'les' : '') + '] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[el] dddd [' + ('passada la ' + (m.hours() !== 1) ? 'passades les' : '') + '] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[el] dddd [' + ('passada la ' + (m.hours() !== 1) ? 'passades les' : '') + '] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[el] dddd [' + ('passada la ' +(m.hours() !== 1) ? 'passades les' : '') + '] LT'), 'Today - ' + i + ' days end of day');
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52º', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1º', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1º', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2º', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2º', 'Jan 15 2012 should be week 2');
  });

  it('test short months proper', function () {
    var str = '02-ago-2016';
    assertEq(moment(str, 'DD-MMM-YYYY').month(), 7, '02-ago-2016 month should be 7');
  });

});
