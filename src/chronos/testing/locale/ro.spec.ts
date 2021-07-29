
import { assertEq, assertDeepEq } from '../test-helpers';
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
    _tests =  'ianuarie ian._februarie febr._martie mart._aprilie apr._mai mai_iunie iun._iulie iul._august aug._septembrie sept._octombrie oct._noiembrie nov._decembrie dec.'.split('_');

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
        ['dddd, MMMM Do YYYY, h:mm:ss A',  'duminică, februarie 14 2010, 3:25:50 PM'],
        ['ddd, hA',                        'Dum, 3PM'],
        ['M Mo MM MMMM MMM',               '2 2 02 februarie febr.'],
        ['YYYY YY',                        '2010 10'],
        ['D Do DD',                        '14 14 14'],
        ['d do dddd ddd dd',               '0 0 duminică Dum Du'],
        ['DDD DDDo DDDD',                  '45 45 045'],
        ['w wo ww',                        '7 7 07'],
        ['h hh',                           '3 03'],
        ['H HH',                           '15 15'],
        ['m mm',                           '25 25'],
        ['s ss',                           '50 50'],
        ['a A',                            'pm PM'],
        ['[a] DDDo[a zi a anului]',        'a 45a zi a anului'],
        ['LTS',                            '15:25:50'],
        ['L',                              '14.02.2010'],
        ['LL',                             '14 februarie 2010'],
        ['LLL',                            '14 februarie 2010 15:25'],
        ['LLLL',                           'duminică, 14 februarie 2010 15:25'],
        ['l',                              '14.2.2010'],
        ['ll',                             '14 febr. 2010'],
        ['lll',                            '14 febr. 2010 15:25'],
        ['llll',                           'Dum, 14 febr. 2010 15:25']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;

    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1', '1st');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2', '2nd');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3', '3rd');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4', '4th');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5', '5th');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6', '6th');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7', '7th');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8', '8th');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9', '9th');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10', '10th');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11', '11th');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12', '12th');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13', '13th');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14', '14th');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15', '15th');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16', '16th');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17', '17th');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18', '18th');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19', '19th');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20', '20th');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21', '21st');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22', '22nd');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23', '23rd');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24', '24th');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25', '25th');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26', '26th');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27', '27th');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28', '28th');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29', '29th');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30', '30th');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31', '31st');
  });

  it('format month', function () {
    var expected = 'ianuarie ian._februarie febr._martie mart._aprilie apr._mai mai_iunie iun._iulie iul._august aug._septembrie sept._octombrie oct._noiembrie nov._decembrie dec.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'duminică Dum Du_luni Lun Lu_marți Mar Ma_miercuri Mie Mi_joi Joi Jo_vineri Vin Vi_sâmbătă Sâm Sâ'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'câteva secunde', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'un minut',       '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'un minut',       '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',       '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 de minute',   '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'o oră',          '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'o oră',          '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ore',          '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ore',          '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 de ore',      '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'o zi',           '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'o zi',           '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 zile',         '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'o zi',           '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 zile',         '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 de zile',     '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'o lună',         '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'o lună',         '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'o lună',         '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 luni',         '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 luni',         '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 luni',         '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'o lună',         '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 luni',         '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un an',          '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ani',          '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un an',          '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ani',          '5 years = 5 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 19}), true),   '19 ani',        '19 years = 19 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 20}), true),   '20 de ani',     '20 years = 20 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 100}), true),   '100 de ani',   '100 years = 100 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 101}), true),   '101 ani',      '101 years = 101 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 119}), true),   '119 ani',      '119 years = 119 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 120}), true),   '120 de ani',   '120 years = 120 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 219}), true),   '219 ani',      '219 years = 219 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 220}), true),   '220 de ani',   '220 years = 220 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'peste câteva secunde',   'prefix');
    assertEq(moment(0).from(30000), 'câteva secunde în urmă', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'câteva secunde în urmă',  'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({s: 30}).fromNow(), 'peste câteva secunde', 'in a few seconds');
    assertEq(moment().add({d: 5}).fromNow(), 'peste 5 zile', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(),                   'azi la 12:00',     'today at the same time');
    assertEq(moment(a).add({m: 25}).calendar(),      'azi la 12:25',     'Now plus 25 min');
    assertEq(moment(a).add({h: 1}).calendar(),       'azi la 13:00',     'Now plus 1 hour');
    assertEq(moment(a).add({d: 1}).calendar(),       'mâine la 12:00',   'tomorrow at the same time');
    assertEq(moment(a).subtract({h: 1}).calendar(),  'azi la 11:00',     'Now minus 1 hour');
    assertEq(moment(a).subtract({d: 1}).calendar(),  'ieri la 12:00',    'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({d: i});
      assertEq(m.calendar(),       m.format('dddd [la] LT'),  'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(),       m.format('dddd [la] LT'),  'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(),       m.format('dddd [la] LT'),  'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().subtract({d: i});
      assertEq(m.calendar(),       m.format('[fosta] dddd [la] LT'),  'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(),       m.format('[fosta] dddd [la] LT'),  'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(),       m.format('[fosta] dddd [la] LT'),  'Today - ' + i + ' days end of day');
    }
  });

  it('calendar all else', function () {
    var weeksAgo = moment().subtract({w: 1}),
      weeksFromNow = moment().add({w: 1});

    assertEq(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assertEq(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assertEq(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assertEq(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
  });

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2011, 11, 26]).format('w ww wo'), '1 01 1', 'Dec 26 2011 should be week 1');
    assertEq(moment([2012,  0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012,  0,  2]).format('w ww wo'), '2 02 2', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012,  0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012,  0,  9]).format('w ww wo'), '3 03 3', 'Jan  9 2012 should be week 3');
  });
});

