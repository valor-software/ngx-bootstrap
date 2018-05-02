// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name no-shadowed-variable

import { assert } from 'chai';
import { moment } from '../chain';
import { fiLocale } from '../../i18n/fi';

// localeModule('en');
describe('locale: fi', () => {
  beforeAll(() => {
    moment.locale('fi', fiLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
  // localeModule('fi');

  it('parse', function() {
    var _tests = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'),
      i;

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

  it('format', function() {
    var a = [
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'sunnuntai, helmikuu 14. 2010, 3:25:50 pm'],
        ['ddd, hA', 'su, 3PM'],
        ['M Mo MM MMMM MMM', '2 2. 02 helmikuu helmi'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. sunnuntai su su'],
        ['DDD DDDo DDDD', '45 45. 045'],
        ['w wo ww', '6 6. 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45. day of the year'],
        ['LTS', '15.25.50'],
        ['L', '14.02.2010'],
        ['LL', '14. helmikuuta 2010'],
        ['LLL', '14. helmikuuta 2010, klo 15.25'],
        ['LLLL', 'sunnuntai, 14. helmikuuta 2010, klo 15.25'],
        ['l', '14.2.2010'],
        ['ll', '14. helmi 2010'],
        ['lll', '14. helmi 2010, klo 15.25'],
        ['llll', 'su, 14. helmi 2010, klo 15.25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function() {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
  });

  it('format month', function() {
    var expected = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function() {
    var expected = 'sunnuntai su su_maanantai ma ma_tiistai ti ti_keskiviikko ke ke_torstai to to_perjantai pe pe_lauantai la la'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function() {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'muutama sekunti', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'minuutti', '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'minuutti', '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), 'kaksi minuuttia', '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minuuttia', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'tunti', '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'tunti', '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), 'kaksi tuntia', '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), 'viisi tuntia', '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 tuntia', '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'päivä', '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'päivä', '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), 'kaksi päivää', '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'päivä', '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), 'viisi päivää', '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 päivää', '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'kuukausi', '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'kuukausi', '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'kuukausi', '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), 'kaksi kuukautta', '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), 'kaksi kuukautta', '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), 'kolme kuukautta', '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'kuukausi', '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), 'viisi kuukautta', '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'vuosi', '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), 'kaksi vuotta', '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'vuosi', '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), 'viisi vuotta', '5 years = 5 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 112 }), true), '112 vuotta', '112 years = 112 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 122 }), true), '122 vuotta', '122 years = 122 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 213 }), true), '213 vuotta', '213 years = 213 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({ y: 223 }), true), '223 vuotta', '223 years = 223 years');
  });

  it('suffix', function() {
    assert.equal(moment(30000).from(0), 'muutaman sekunnin päästä', 'prefix');
    assert.equal(moment(0).from(30000), 'muutama sekunti sitten', 'suffix');
  });

  it('now from now', function() {
    assert.equal(moment().fromNow(), 'muutama sekunti sitten', 'now from now should display as in the past');
  });

  it('fromNow', function() {
    assert.equal(moment().add({ s: 30 }).fromNow(), 'muutaman sekunnin päästä', 'in a few seconds');
    assert.equal(moment().add({ h: 1 }).fromNow(), 'tunnin päästä', 'in an hour');
    assert.equal(moment().add({ d: 5 }).fromNow(), 'viiden päivän päästä', 'in 5 days');
  });

  it('calendar day', function() {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'tänään klo 12.00', 'today at the same time');
    assert.equal(moment(a).add({ m: 25 }).calendar(), 'tänään klo 12.25', 'Now plus 25 min');
    assert.equal(moment(a).add({ h: 1 }).calendar(), 'tänään klo 13.00', 'Now plus 1 hour');
    assert.equal(moment(a).add({ d: 1 }).calendar(), 'huomenna klo 12.00', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({ h: 1 }).calendar(), 'tänään klo 11.00', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({ d: 1 }).calendar(), 'eilen klo 12.00', 'yesterday at the same time');
  });

  it('calendar next week', function() {
    var i, m;

    function makeFormat(d) {
      switch (d.day()) {
        case 0:
          return '[sunnuntai klo] LT';
        case 2:
          return '[tiistai klo] LT';
        case 3:
          return '[keskiviikko klo] LT';
        case 6:
          return '[lauantai klo] LT';
        default:
          return 'dddd [klo] LT';
      }
    }

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assert.equal(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days current time');

      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days beginning of day');

      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(), m.format(makeFormat(m)), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function() {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({d: i});
      assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days end of day');
    }
  });

  it('calendar all else', function() {
    var weeksAgo = moment().subtract({ w: 1 }),
      weeksFromNow = moment().add({ w: 1 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
  });

  it('weeks year starting sunday formatted', function() {
    assert.equal(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
  });
  it('relative time threshold in the past', function() {
    assert.equal(moment().subtract(1, 's').fromNow(), 'muutama sekunti sitten', 'A few seconds ago');
    assert.equal(moment().subtract(15, 's').fromNow(), 'muutama sekunti sitten', 'A few seconds ago');
    assert.equal(moment().subtract(55, 's').fromNow(), 'minuutti sitten', 'A minute ago');
    assert.equal(moment().subtract(1, 'm').fromNow(), 'minuutti sitten', 'A minute ago');
    assert.equal(moment().subtract(15, 'm').fromNow(), '15 minuuttia sitten', '15 minutes ago');
    assert.equal(moment().subtract(1, 'h').fromNow(), 'tunti sitten', 'An hour ago');
    assert.equal(moment().subtract(3, 'h').fromNow(), 'kolme tuntia sitten', '3 hours ago');
    assert.equal(moment().subtract(25, 'h').fromNow(), 'päivä sitten', 'A day ago');
    assert.equal(moment().subtract(3, 'd').fromNow(), 'kolme päivää sitten', '3 days ago');
    assert.equal(moment().subtract(1, 'M').fromNow(), 'kuukausi sitten', 'A month ago');
    assert.equal(moment().subtract(2, 'M').fromNow(), 'kaksi kuukautta sitten', '2 months ago');
    assert.equal(moment().subtract(15, 'M').fromNow(), 'vuosi sitten', 'A year ago');
    assert.equal(moment().subtract(15, 'y').fromNow(), '15 vuotta sitten', '15 years ago');
  });
  it('relative time threshold in the future', function() {
    assert.equal(moment().add(8, 's').fromNow(), 'muutaman sekunnin päästä', 'In a few seconds');
    assert.equal(moment().add(15, 's').fromNow(), 'muutaman sekunnin päästä', 'In a few seconds');
    assert.equal(moment().add(55, 's').fromNow(), 'minuutin päästä', 'In a minute');
    assert.equal(moment().add(1, 'm').fromNow(), 'minuutin päästä', 'I a minute');
    assert.equal(moment().add(15, 'm').fromNow(), '15 minuutin päästä', '15 minutes away');
    assert.equal(moment().add(1, 'h').fromNow(), 'tunnin päästä', 'In an hour');
    assert.equal(moment().add(3, 'h').fromNow(), 'kolmen tunnin päästä', '3 hours later');
    assert.equal(moment().add(25, 'h').fromNow(), 'päivän päästä', 'After a day');
    assert.equal(moment().add(15, 'd').fromNow(), '15 päivän päästä', 'After 15 days');
    assert.equal(moment().add(1, 'M').fromNow(), 'kuukauden päästä', 'In a month');
    assert.equal(moment().add(2, 'M').fromNow(), 'kahden kuukauden päästä', 'In 2 months');
    assert.equal(moment().add(15, 'M').fromNow(), 'vuoden päästä', 'In a year');
    assert.equal(moment().add(15, 'y').fromNow(), '15 vuoden päästä', 'After 15 years');
  });
});
