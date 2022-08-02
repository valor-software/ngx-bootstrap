
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { ptBrLocale } from '../../i18n/pt-br';

// localeModule('en');
describe('locale: pt-br', () => {
  beforeAll(() => {
    moment.locale('pt-br', ptBrLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
// localeModule('pt-br');

  it('parse', function () {
    var _tests = 'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split('_'),
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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'Domingo, Fevereiro 14º 2010, 3:25:50 pm'],
        ['ddd, hA', 'Dom, 3PM'],
        ['M Mo MM MMMM MMM', '2 2º 02 Fevereiro Fev'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14º 14'],
        ['d do dddd ddd', '0 0º Domingo Dom'],
        ['DDD DDDo DDDD', '45 45º 045'],
        ['w wo ww', '8 8º 08'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45º day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 de Fevereiro de 2010'],
        ['LLL', '14 de Fevereiro de 2010 às 15:25'],
        ['LLLL', 'Domingo, 14 de Fevereiro de 2010 às 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 de Fev de 2010'],
        ['lll', '14 de Fev de 2010 às 15:25'],
        ['llll', 'Dom, 14 de Fev de 2010 às 15:25']
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
    var expected = 'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'Domingo Dom Do_Segunda-feira Seg 2ª_Terça-feira Ter 3ª_Quarta-feira Qua 4ª_Quinta-feira Qui 5ª_Sexta-feira Sex 6ª_Sábado Sáb Sá'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'poucos segundos', '44 seconds = seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'um minuto', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'um minuto', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minutos', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minutos', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'uma hora', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'uma hora', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 horas', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 horas', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 horas', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'um dia', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'um dia', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dias', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'um dia', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dias', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dias', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'um mês', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'um mês', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'um mês', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 meses', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 meses', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 meses', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'um mês', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 meses', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'um ano', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 anos', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'um ano', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 anos', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'em poucos segundos', 'prefix');
    assertEq(moment(0).from(30000), 'poucos segundos atrás', 'suffix');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'em poucos segundos', 'in seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'em 5 dias', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Hoje às 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Hoje às 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Hoje às 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Amanhã às 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Hoje às 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Ontem às 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [às] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [às] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [às] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'), 'Today - ' + i + ' days end of day');
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1º', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 7]).format('w ww wo'), '1 01 1º', 'Jan  7 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2º', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 14]).format('w ww wo'), '2 02 2º', 'Jan 14 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '3 03 3º', 'Jan 15 2012 should be week 3');
  });

  // todo: relativeTimeThreshold
  xit('relative time threshold', function () {
    var rts = moment(),
      rtsDefault = moment.relativeTimeThreshold('ss');

    moment.relativeTimeThreshold('ss', 3);

    rts.subtract(3, 'seconds');
    assertEq(rts.fromNow(), 'poucos segundos atrás', 'Below custom a few seconds to seconds threshold');
    rts.subtract(1, 'seconds');
    assertEq(rts.fromNow(), '4 segundos atrás', 'Above custom a few seconds to seconds threshold');

    moment.relativeTimeThreshold('ss', rtsDefault as number);
  });
});
