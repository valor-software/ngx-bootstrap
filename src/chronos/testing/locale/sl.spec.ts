
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { slLocale } from '../../i18n/sl';

// localeModule('sl');
describe('locale: sl', () => {
  beforeAll(() => {
    moment.locale('sl', slLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', function () {
    var _tests = 'januar jan._februar feb._marec mar._april apr._maj maj._junij jun._julij jul._avgust avg._september sep._oktober okt._november nov._december dec.'.split('_'),
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
        ['dddd, Do MMMM YYYY, h:mm:ss a', 'nedelja, 14. februar 2010, 3:25:50 pm'],
        ['ddd, hA', 'ned., 3PM'],
        ['M Mo MM MMMM MMM', '2 2. 02 februar feb.'],
        ['YYYY YY', '2010 10'],
        ['D Do DD', '14 14. 14'],
        ['d do dddd ddd dd', '0 0. nedelja ned. ne'],
        ['DDD DDDo DDDD', '45 45. 045'],
        ['w wo ww', '7 7. 07'],
        ['h hh', '3 03'],
        ['H HH', '15 15'],
        ['m mm', '25 25'],
        ['s ss', '50 50'],
        ['a A', 'pm PM'],
        ['[the] DDDo [day of the year]', 'the 45. day of the year'],
        ['LTS', '15:25:50'],
        ['L', '14.02.2010'],
        ['LL', '14. februar 2010'],
        ['LLL', '14. februar 2010 15:25'],
        ['LLLL', 'nedelja, 14. februar 2010 15:25'],
        ['l', '14.2.2010'],
        ['ll', '14. feb. 2010'],
        ['lll', '14. feb. 2010 15:25'],
        ['llll', 'ned., 14. feb. 2010 15:25']
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
    var expected = 'januar jan._februar feb._marec mar._april apr._maj maj._junij jun._julij jul._avgust avg._september sep._oktober okt._november nov._december dec.'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'nedelja ned. ne_ponedeljek pon. po_torek tor. to_sreda sre. sr_četrtek čet. če_petek pet. pe_sobota sob. so'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'nekaj sekund', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'ena minuta', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'ena minuta', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '2 minuti', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '44 minut', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'ena ura', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'ena ura', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '2 uri', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '5 ur', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '21 ur', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'en dan', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'en dan', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '2 dni', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'en dan', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '5 dni', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '25 dni', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'en mesec', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'en mesec', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'en mesec', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '2 meseca', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '2 meseca', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '3 mesece', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'en mesec', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '5 mesecev', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'eno leto', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '2 leti', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'eno leto', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '5 let', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'čez nekaj sekund', 'prefix');
    assertEq(moment(0).from(30000), 'pred nekaj sekundami', 'suffix');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'čez nekaj sekund', 'in a few seconds');
    assertEq(moment().add({ d: 5 }).fromNow(), 'čez 5 dni', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'danes ob 12:00', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'danes ob 12:25', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'danes ob 13:00', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'jutri ob 12:00', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'danes ob 11:00', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'včeraj ob 12:00', 'yesterday at the same time');
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
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '1 01 1.', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 2]).format('w ww wo'), '2 02 2.', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '2 02 2.', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 9]).format('w ww wo'), '3 03 3.', 'Jan  9 2012 should be week 3');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '3 03 3.', 'Jan 15 2012 should be week 3');
  });

});
