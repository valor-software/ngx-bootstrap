import { moment } from '../chain';
import { assertEq } from '../test-helpers';
import { kkLocale } from '../..';

describe('locale: kk', () => {
  beforeAll(() => {
    moment.locale('kk', kkLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  it('parse', () => {
    const _tests = 'қаңтар қаң_ақпан ақп_наурыз нау_сәуір сәу_мамыр мам_маусым мау_шілде шіл_тамыз там_қыркүйек қыр_қазан қаз_қараша қар_желтоқсан жел'.split('_');

    function equalTest(input, mmm, index) {
      assertEq(moment(input, mmm).month(), index, `${input} should be month ${(index + 1)}`);
    }

    const tests: string[][] = [];

    for (let j = 0; j < 12; j++) {
      tests[j] = _tests[j].split(' ');
      equalTest(tests[j][0], 'MMM', j);
      equalTest(tests[j][1], 'MMM', j);
      equalTest(tests[j][0], 'MMMM', j);
      equalTest(tests[j][1], 'MMMM', j);
      equalTest(tests[j][0].toLocaleLowerCase(), 'MMMM', j);
      equalTest(tests[j][1].toLocaleLowerCase(), 'MMMM', j);
      equalTest(tests[j][0].toLocaleUpperCase(), 'MMMM', j);
      equalTest(tests[j][1].toLocaleUpperCase(), 'MMMM', j);
    }
  });

  it('format', () => {
    const a = [
        ['dddd, Do MMMM YYYY, HH:mm:ss',       'жексенбі, 14-ші ақпан 2010, 15:25:50'],
        ['ddd, hA',                            'жек, 3PM'],
        ['M Mo MM MMMM MMM',                   '2 2-ші 02 ақпан ақп'],
        ['YYYY YY',                            '2010 10'],
        ['D Do DD',                            '14 14-ші 14'],
        ['d do dddd ddd dd',                   '0 0-ші жексенбі жек жк'],
        ['DDD DDDo DDDD',                      '45 45-ші 045'],
        ['w wo ww',                            '7 7-ші 07'],
        ['h hh',                               '3 03'],
        ['H HH',                               '15 15'],
        ['m mm',                               '25 25'],
        ['s ss',                               '50 50'],
        ['a A',                                'pm PM'],
        ['[жылдың] DDDo [күні]',               'жылдың 45-ші күні'],
        ['LTS',                                '15:25:50'],
        ['L',                                  '14.02.2010'],
        ['LL',                                 '14 ақпан 2010'],
        ['LLL',                                '14 ақпан 2010 15:25'],
        ['LLLL',                               'жексенбі, 14 ақпан 2010 15:25'],
        ['l',                                  '14.2.2010'],
        ['ll',                                 '14 ақп 2010'],
        ['lll',                                '14 ақп 2010 15:25'],
        ['llll',                               'жек, 14 ақп 2010 15:25']
      ];

    const b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));

    for (let i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
    }
  });

  it('format ordinal', () => {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '1-ші', '1st');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '2-ші', '2nd');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '3-ші', '3rd');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '4-ші', '4th');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '5-ші', '5th');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '6-шы', '6th');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '7-ші', '7th');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '8-ші', '8th');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '9-шы', '9th');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '10-шы', '10th');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '11-ші', '11th');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '12-ші', '12th');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '13-ші', '13th');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '14-ші', '14th');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '15-ші', '15th');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '16-шы', '16th');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '17-ші', '17th');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '18-ші', '18th');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '19-шы', '19th');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '20-шы', '20th');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '21-ші', '21st');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '22-ші', '22nd');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '23-ші', '23rd');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '24-ші', '24th');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '25-ші', '25th');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '26-шы', '26th');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '27-ші', '27th');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '28-ші', '28th');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '29-шы', '29th');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '30-шы', '30th');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '31-ші', '31st');
  });

  it('format month', () => {
    const expected = 'қаңтар қаң_ақпан ақп_наурыз нау_сәуір сәу_мамыр мам_маусым мау_шілде шіл_тамыз там_қыркүйек қыр_қазан қаз_қараша қар_желтоқсан жел'.split('_');

    for (let j = 0; j < expected.length; j++) {
      assertEq(moment([2011, j, 1]).format('MMMM MMM'), expected[j], expected[j]);
    }
  });

  it('format week', () => {
    const expected = 'жексенбі жек жк_дүйсенбі дүй дй_сейсенбі сей сй_сәрсенбі сәр ср_бейсенбі бей бй_жұма жұм жм_сенбі сен сн'.split('_');

    for (let j = 0; j < expected.length; j++) {
      assertEq(moment([2011, 0, j + 2]).format('dddd ddd dd'), expected[j], expected[j]);
    }
  });

  it('from', () => {
    const start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'бірнеше секунд', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'бір минут',      '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'бір минут',      '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 минут',     '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 минут',    '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'бір сағат',       '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'бір сағат',       '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 сағат',       '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 сағат',       '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 сағат',      '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'бір күн',         '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'бір күн',         '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 күн',        '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'бір күн',         '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 күн',        '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 күн',       '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'бір ай',       '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'бір ай',       '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'бір ай',       '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ай',      '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ай',      '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ай',      '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'бір ай',       '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ай',      '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'бір жыл',        '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 жыл',       '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'бір жыл',        '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 жыл',       '5 years = 5 years');
  });

  it('suffix', () => {
    assertEq(moment(30000).from(0), 'бірнеше секунд ішінде',  'prefix');
    assertEq(moment(0).from(30000), 'бірнеше секунд бұрын', 'suffix');
  });

  it('now from now', () => {
    assertEq(moment().fromNow(), 'бірнеше секунд бұрын',  'now from now should display as in the past');
  });

  it('fromNow', () => {
    assertEq(moment().add({s: 30}).fromNow(), 'бірнеше секунд ішінде', 'in a few seconds');
    assertEq(moment().add({d: 5}).fromNow(), '5 күн ішінде', 'in 5 days');
  });

  it('calendar day', () => {
    const a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(),                   'Бүгін сағат 12:00',  'today at the same time');
    assertEq(moment(a).add({m: 25}).calendar(),      'Бүгін сағат 12:25',  'Now plus 25 min');
    assertEq(moment(a).add({h: 1}).calendar(),       'Бүгін сағат 13:00',  'Now plus 1 hour');
    assertEq(moment(a).add({d: 1}).calendar(),       'Ертең сағат 12:00',  'tomorrow at the same time');
    assertEq(moment(a).subtract({h: 1}).calendar(),  'Бүгін сағат 11:00',  'Now minus 1 hour');
    assertEq(moment(a).subtract({d: 1}).calendar(),  'Кеше сағат 12:00',   'yesterday at the same time');
  });

  it('calendar next week', () => {
    let m;
    for (let i = 2; i < 7; i++) {
      m = moment().add({d: i});
      assertEq(m.calendar(),       m.format('dddd [сағат] LT'), `Today + ${i} days current time`);
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(),       m.format('dddd [сағат] LT'), `Today + ${i} days beginning of day`);
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(),       m.format('dddd [сағат] LT'), `Today + ${i} days end of day`);
    }
  });

  it('calendar last week', () => {
    let m;

    for (let i = 2; i < 7; i++) {
      m = moment().subtract({d: i});
      assertEq(m.calendar(),       m.format('[Өткен аптаның] dddd [сағат] LT'), `Today + ${i} days current time`);
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(),       m.format('[Өткен аптаның] dddd [сағат] LT'), `Today + ${i} days beginning of day`);
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(),       m.format('[Өткен аптаның] dddd [сағат] LT'), `Today + ${i} days end of day`);
    }
  });

  it('calendar all else', () => {
    let weeksAgo = moment().subtract({w: 1});
    let weeksFromNow = moment().add({w: 1});

    assertEq(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assertEq(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assertEq(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assertEq(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
  });

  it('weeks year starting sunday formatted', () => {
    assertEq(moment([2012, 0,  1]).format('w ww wo'),   '1 01 1-ші', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0,  2]).format('w ww wo'),   '2 02 2-ші', 'Jan  2 2012 should be week 2');
    assertEq(moment([2012, 0,  8]).format('w ww wo'),   '2 02 2-ші', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0,  9]).format('w ww wo'),   '3 03 3-ші', 'Jan  9 2012 should be week 3');
    assertEq(moment([2012, 0, 15]).format('w ww wo'),   '3 03 3-ші', 'Jan 15 2012 should be week 3');
  });
});
