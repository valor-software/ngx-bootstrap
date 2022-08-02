
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { ltLocale } from '../../i18n/lt';

// localeModule('en');
describe('locale: lt', () => {
  beforeAll(() => {
    moment.locale('lt', ltLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  // localeModule('lt');

  it('parse', function () {
    var _tests = 'sausis sau_vasaris vas_kovas kov_balandis bal_gegužė geg_birželis bir_liepa lie_rugpjūtis rgp_rugsėjis rgs_spalis spa_lapkritis lap_gruodis grd'.split('_'), i;
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
        ['dddd, Do MMMM YYYY, h:mm:ss a',      'sekmadienis, 14-oji vasario 2010, 3:25:50 pm'],
        ['ddd, hA',                            'Sek, 3PM'],
        ['M Mo MM MMMM MMM',                   '2 2-oji 02 vasaris vas'],
        ['YYYY YY',                            '2010 10'],
        ['D Do DD',                            '14 14-oji 14'],
        ['d do dddd ddd dd',                   '0 0-oji sekmadienis Sek S'],
        ['DDD DDDo DDDD',                      '45 45-oji 045'],
        ['w wo ww',                            '6 6-oji 06'],
        ['h hh',                               '3 03'],
        ['H HH',                               '15 15'],
        ['m mm',                               '25 25'],
        ['s ss',                               '50 50'],
        ['a A',                                'pm PM'],
        ['DDDo [metų diena]',                  '45-oji metų diena'],
        ['LTS',                                '15:25:50'],
        ['L',                                  '2010-02-14'],
        ['LL',                                 '2010 m. vasario 14 d.'],
        ['LLL',                                '2010 m. vasario 14 d., 15:25 val.'],
        ['LLLL',                               '2010 m. vasario 14 d., sekmadienis, 15:25 val.'],
        ['l',                                  '2010-02-14'],
        ['ll',                                 '2010 m. vasario 14 d.'],
        ['lll',                                '2010 m. vasario 14 d., 15:25 val.'],
        ['llll',                               '2010 m. vasario 14 d., Sek, 15:25 val.']
    ],
    b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
    i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1-oji', '1-oji');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2-oji', '2-oji');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3-oji', '3-oji');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4-oji', '4-oji');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5-oji', '5-oji');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6-oji', '6-oji');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7-oji', '7-oji');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8-oji', '8-oji');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9-oji', '9-oji');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10-oji', '10-oji');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11-oji', '11-oji');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12-oji', '12-oji');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13-oji', '13-oji');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14-oji', '14-oji');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15-oji', '15-oji');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16-oji', '16-oji');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17-oji', '17-oji');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18-oji', '18-oji');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19-oji', '19-oji');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20-oji', '20-oji');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21-oji', '21-oji');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22-oji', '22-oji');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23-oji', '23-oji');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24-oji', '24-oji');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25-oji', '25-oji');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26-oji', '26-oji');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27-oji', '27-oji');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28-oji', '28-oji');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29-oji', '29-oji');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30-oji', '30-oji');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31-oji', '31-oji');
  });

  it('format month', function () {
      var expected = 'sausis sau_vasaris vas_kovas kov_balandis bal_gegužė geg_birželis bir_liepa lie_rugpjūtis rgp_rugsėjis rgs_spalis spa_lapkritis lap_gruodis grd'.split('_'), i;
      for (i = 0; i < expected.length; i++) {
          assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
      }
  });

  it('format week', function () {
    var expected = 'sekmadienis Sek S_pirmadienis Pir P_antradienis Ant A_trečiadienis Tre T_ketvirtadienis Ket K_penktadienis Pen Pn_šeštadienis Šeš Š'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'kelios sekundės', '44 seconds = seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minutė',          '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minutė',          '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutės',       '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 10}), true),  '10 minučių',       '10 minutes = 10 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 11}), true),  '11 minučių',       '11 minutes = 11 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 19}), true),  '19 minučių',       '19 minutes = 19 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 20}), true),  '20 minučių',       '20 minutes = 20 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutės',      '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'valanda',         '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'valanda',         '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 valandos',      '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 valandos',      '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 10}), true),  '10 valandų',      '10 hours = 10 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 valandos',     '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'diena',           '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'diena',           '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dienos',        '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'diena',           '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dienos',        '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 10}), true),  '10 dienų',        '10 days = 10 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dienos',       '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'mėnuo',           '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'mėnuo',           '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'mėnuo',           '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mėnesiai',      '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mėnesiai',      '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mėnesiai',      '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'mėnuo',           '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mėnesiai',      '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 10}), true),  '10 mėnesių',      '10 months = 10 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'metai',           '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 metai',         '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'metai',           '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 metai',         '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'po kelių sekundžių',  'prefix');
    assertEq(moment(0).from(30000), 'prieš kelias sekundes', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'prieš kelias sekundes',  'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({s: 30}).fromNow(), 'po kelių sekundžių', 'in seconds');
    assertEq(moment().add({d: 5}).fromNow(), 'po 5 dienų', 'in 5 days');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(),                   'Šiandien 12:00',  'today at the same time');
    assertEq(moment(a).add({m: 25}).calendar(),      'Šiandien 12:25',  'Now plus 25 min');
    assertEq(moment(a).add({h: 1}).calendar(),       'Šiandien 13:00',  'Now plus 1 hour');
    assertEq(moment(a).add({d: 1}).calendar(),       'Rytoj 12:00',     'tomorrow at the same time');
    assertEq(moment(a).subtract({h: 1}).calendar(),  'Šiandien 11:00',  'Now minus 1 hour');
    assertEq(moment(a).subtract({d: 1}).calendar(),  'Vakar 12:00',     'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assertEq(m.calendar(),       m.format('dddd LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assertEq(m.calendar(),       m.format('dddd LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assertEq(m.calendar(),       m.format('dddd LT'),  'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assertEq(m.calendar(),       m.format('[Praėjusį] dddd LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assertEq(m.calendar(),       m.format('[Praėjusį] dddd LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assertEq(m.calendar(),       m.format('[Praėjusį] dddd LT'),  'Today - ' + i + ' days end of day');
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

  it('weeks year starting monday formatted', function () {
    assertEq(moment([2012, 0,  1]).format('w ww wo'), '52 52 52-oji', 'Jan  1 2012 should be week 52');
    assertEq(moment([2012, 0,  2]).format('w ww wo'),  '1 01 1-oji', 'Jan  2 2012 should be week 1');
    assertEq(moment([2012, 0,  8]).format('w ww wo'),  '1 01 1-oji', 'Jan  8 2012 should be week 1');
    assertEq(moment([2012, 0,  9]).format('w ww wo'),  '2 02 2-oji', 'Jan  9 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'),  '2 02 2-oji', 'Jan 15 2012 should be week 2');
  });

  it('weeks year starting monday formatted', function () {
    assertEq(moment([2015, 4, 1]).format('LL'), '2015 m. gegužės 1 d.', 'uses format instead of standalone form');
  });
});
