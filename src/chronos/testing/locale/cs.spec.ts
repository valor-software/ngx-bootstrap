
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { csLocale } from '../../i18n/cs';
// localeModule('cs');

describe('locale: cs', () => {
  beforeAll(() => {
    moment.locale('cs', csLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var _tests = 'leden led_únor úno_březen bře_duben dub_květen kvě_červen čvn_červenec čvc_srpen srp_září zář_říjen říj_listopad lis_prosinec pro'.split('_'),
      i;

    function equalit(input, mmm, monthIndex) {
      assertEq(moment(input, mmm).month(), monthIndex, input + ' ' + mmm + ' should be month ' + (monthIndex + 1));
    }

    function equalTestStrict(input, mmm, monthIndex) {
      assertEq(moment(input, mmm, true).month(), monthIndex, input + ' ' + mmm + ' should be strict month ' + (monthIndex + 1));
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

      equalTestStrict(tests[i][1], 'MMM', i);
      equalTestStrict(tests[i][0], 'MMMM', i);
      equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
      equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
      equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
      equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
    }
  });

  it('format', function () {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss', 'neděle, únor 14. 2010, 3:25:50'],
        ['ddd, h', 'ne, 3'],
        ['M Mo MM MMMM MMM', '2 2. 02 únor úno'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. neděle ne ne'],
        ['DDD DDDo DDDD', '45 45. 045'],
        ['w wo ww', '6 6. 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['DDDo [den v roce]', '45. den v roce'],
        ['LTS', '15:25:50'],
        ['L', '14.02.2010'],
        ['LL', '14. únor 2010'],
        ['LLL', '14. únor 2010 15:25'],
        ['LLLL', 'neděle 14. únor 2010 15:25'],
        ['l', '14. 2. 2010'],
        ['ll', '14. úno 2010'],
        ['lll', '14. úno 2010 15:25'],
        ['llll', 'ne 14. úno 2010 15:25']
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
    var expected = 'leden led_únor úno_březen bře_duben dub_květen kvě_červen čvn_červenec čvc_srpen srp_září zář_říjen říj_listopad lis_prosinec pro'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'neděle ne ne_pondělí po po_úterý út út_středa st st_čtvrtek čt čt_pátek pá pá_sobota so so'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'pár sekund', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'minuta', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'minuta', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuty', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minut', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'hodina', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'hodina', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 hodiny', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 hodin', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 hodin', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'den', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'den', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dny', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'den', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dní', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dní', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'měsíc', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'měsíc', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'měsíc', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 měsíce', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 měsíce', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 měsíce', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'měsíc', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 měsíců', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'rok', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 roky', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'rok', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 let', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'za pár sekund', 'prefix');
    assertEq(moment(0).from(30000), 'před pár sekundami', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'před pár sekundami', 'now from now should display as in the past');
  });

  it('fromNow (future)', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'za pár sekund', 'in a few seconds');
    assertEq(moment().add({ m: 1 }).fromNow(), 'za minutu', 'in a minute');
    assertEq(moment().add({ m: 3 }).fromNow(), 'za 3 minuty', 'in 3 minutes');
    assertEq(moment().add({ m: 10 }).fromNow(), 'za 10 minut', 'in 10 minutes');
    assertEq(moment().add({ h: 1 }).fromNow(), 'za hodinu', 'in an hour');
    assertEq(moment().add({ h: 3 }).fromNow(), 'za 3 hodiny', 'in 3 hours');
    assertEq(moment().add({ h: 10 }).fromNow(), 'za 10 hodin', 'in 10 hours');
    assertEq(moment().add({ d: 1 }).fromNow(), 'za den', 'in a day');
    assertEq(moment().add({ d: 3 }).fromNow(), 'za 3 dny', 'in 3 days');
    assertEq(moment().add({ d: 10 }).fromNow(), 'za 10 dní', 'in 10 days');
    assertEq(moment().add({ M: 1 }).fromNow(), 'za měsíc', 'in a month');
    assertEq(moment().add({ M: 3 }).fromNow(), 'za 3 měsíce', 'in 3 months');
    assertEq(moment().add({ M: 10 }).fromNow(), 'za 10 měsíců', 'in 10 months');
    assertEq(moment().add({ y: 1 }).fromNow(), 'za rok', 'in a year');
    assertEq(moment().add({ y: 3 }).fromNow(), 'za 3 roky', 'in 3 years');
    assertEq(moment().add({ y: 10 }).fromNow(), 'za 10 let', 'in 10 years');
  });

  it('fromNow (past)', function () {
    assertEq(moment().subtract({ s: 30 }).fromNow(), 'před pár sekundami', 'a few seconds ago');
    assertEq(moment().subtract({ m: 1 }).fromNow(), 'před minutou', 'a minute ago');
    assertEq(moment().subtract({ m: 3 }).fromNow(), 'před 3 minutami', '3 minutes ago');
    assertEq(moment().subtract({ m: 10 }).fromNow(), 'před 10 minutami', '10 minutes ago');
    assertEq(moment().subtract({ h: 1 }).fromNow(), 'před hodinou', 'an hour ago');
    assertEq(moment().subtract({ h: 3 }).fromNow(), 'před 3 hodinami', '3 hours ago');
    assertEq(moment().subtract({ h: 10 }).fromNow(), 'před 10 hodinami', '10 hours ago');
    assertEq(moment().subtract({ d: 1 }).fromNow(), 'před dnem', 'a day ago');
    assertEq(moment().subtract({ d: 3 }).fromNow(), 'před 3 dny', '3 days ago');
    assertEq(moment().subtract({ d: 10 }).fromNow(), 'před 10 dny', '10 days ago');
    assertEq(moment().subtract({ M: 1 }).fromNow(), 'před měsícem', 'a month ago');
    assertEq(moment().subtract({ M: 3 }).fromNow(), 'před 3 měsíci', '3 months ago');
    assertEq(moment().subtract({ M: 10 }).fromNow(), 'před 10 měsíci', '10 months ago');
    assertEq(moment().subtract({ y: 1 }).fromNow(), 'před rokem', 'a year ago');
    assertEq(moment().subtract({ y: 3 }).fromNow(), 'před 3 lety', '3 years ago');
    assertEq(moment().subtract({ y: 10 }).fromNow(), 'před 10 lety', '10 years ago');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'dnes v 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'dnes v 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'dnes v 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'zítra v 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'dnes v 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'včera v 12:00', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m, nextDay;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      nextDay = '';
      switch (m.day()) {
        case 0:
          nextDay = 'v neděli';
          break;
        case 1:
          nextDay = 'v pondělí';
          break;
        case 2:
          nextDay = 'v úterý';
          break;
        case 3:
          nextDay = 've středu';
          break;
        case 4:
          nextDay = 've čtvrtek';
          break;
        case 5:
          nextDay = 'v pátek';
          break;
        case 6:
          nextDay = 'v sobotu';
          break;
      }
      assertEq(m.calendar(), m.format('[' + nextDay + '] [v] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[' + nextDay + '] [v] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[' + nextDay + '] [v] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m, lastDay;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      lastDay = '';
      switch (m.day()) {
        case 0:
          lastDay = 'minulou neděli';
          break;
        case 1:
          lastDay = 'minulé pondělí';
          break;
        case 2:
          lastDay = 'minulé úterý';
          break;
        case 3:
          lastDay = 'minulou středu';
          break;
        case 4:
          lastDay = 'minulý čtvrtek';
          break;
        case 5:
          lastDay = 'minulý pátek';
          break;
        case 6:
          lastDay = 'minulou sobotu';
          break;
      }
      assertEq(m.calendar(), m.format('[' + lastDay + '] [v] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[' + lastDay + '] [v] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[' + lastDay + '] [v] LT'), 'Today - ' + i + ' days end of day');
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

  it('humanize duration', function () {
    assertEq(moment.duration(1, 'minutes').humanize(), 'minuta', 'a minute (future)');
    assertEq(moment.duration(1, 'minutes').humanize(true), 'za minutu', 'in a minute');
    assertEq(moment.duration(-1, 'minutes').humanize(), 'minuta', 'a minute (past)');
    assertEq(moment.duration(-1, 'minutes').humanize(true), 'před minutou', 'a minute ago');
  });

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
  });

});
