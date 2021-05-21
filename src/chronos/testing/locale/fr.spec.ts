
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { frLocale } from '../../i18n/fr';

describe('locale: fr', () => {
  beforeAll(() => {
    moment.locale('fr', frLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });
// localeModule('fr');

  it('parse', function () {
    var i,
      _tests = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_');

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
        ['dddd, MMMM Do YYYY, h:mm:ss a', 'dimanche, février 14 2010, 3:25:50 pm'],
        ['ddd, hA', 'dim., 3PM'],
        ['M Mo MM MMMM MMM', '2 2e 02 février févr.'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14 14'],
        ['d do dddd ddd dd', '0 0e dimanche dim. di'],
        ['DDD DDDo DDDD', '45 45e 045'],
        ['w wo ww', '6 6e 06'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[le] Do [jour du mois]', 'le 14 jour du mois'],
        ['[le] DDDo [jour de l’année]', 'le 45e jour de l’année'],
        ['LTS', '15:25:50'],
        ['L', '14/02/2010'],
        ['LL', '14 février 2010'],
        ['LLL', '14 février 2010 15:25'],
        ['LLLL', 'dimanche 14 février 2010 15:25'],
        ['l', '14/2/2010'],
        ['ll', '14 févr. 2010'],
        ['lll', '14 févr. 2010 15:25'],
        ['llll', 'dim. 14 févr. 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2017, 0, 1]).format('Mo'), '1er', '1er');
    assertEq(moment([2017, 1, 1]).format('Mo'), '2e', '2e');

    assertEq(moment([2017, 0, 1]).format('Qo'), '1er', '1er');
    assertEq(moment([2017, 3, 1]).format('Qo'), '2e', '2e');

    assertEq(moment([2017, 0, 1]).format('Do'), '1er', '1er');
    assertEq(moment([2017, 0, 2]).format('Do'), '2', '2');

    assertEq(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2e', '2e');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21e', '21e');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22e', '22e');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31e', '31e');

    assertEq(moment([2017, 0, 1]).format('do'), '0e', '0e');
    assertEq(moment([2017, 0, 2]).format('do'), '1er', '1er');

    assertEq(moment([2017, 0, 4]).format('wo Wo'), '1re 1re', '1re 1re');
    assertEq(moment([2017, 0, 11]).format('wo Wo'), '2e 2e', '2e 2e');
  });

  it('format month', function () {
    var i,
      expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var i,
      expected = 'dimanche dim. di_lundi lun. lu_mardi mar. ma_mercredi mer. me_jeudi jeu. je_vendredi ven. ve_samedi sam. sa'.split('_');

    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'quelques secondes', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'une minute', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'une minute', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minutes', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minutes', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'une heure', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'une heure', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 heures', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 heures', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 heures', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'un jour', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'un jour', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 jours', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'un jour', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 jours', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 jours', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'un mois', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'un mois', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'un mois', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 mois', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 mois', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 mois', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'un mois', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 mois', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'un an', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 ans', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'un an', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 ans', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'dans quelques secondes', 'prefix');
    assertEq(moment(0).from(30000), 'il y a quelques secondes', 'suffix');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'dans quelques secondes', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'dans 5 jours', 'in 5 days');
  });

  it('same day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Aujourd’hui à 12:00', 'Today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Aujourd’hui à 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Aujourd’hui à 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Demain à 12:00', 'Tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Aujourd’hui à 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Hier à 12:00', 'Yesterday at the same time');
  });

  it('same next week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd [à] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [à] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [à] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('same last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('dddd [dernier à] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd [dernier à] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd [dernier à] LT'), 'Today - ' + i + ' days end of day');
    }
  });

  it('same all else', function () {
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '52 52 52e', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '1 01 1re', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '1 01 1re', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '2 02 2e', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '2 02 2e', 'Jan 15 2012 should be week 2');
  });
});
