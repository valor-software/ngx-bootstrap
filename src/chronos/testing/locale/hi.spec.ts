
import { assertEq, assertDeepEq } from '../test-helpers';
import { moment } from '../chain';
import { hiLocale } from '../../i18n/hi';

// localeModule('en');
describe('locale: hi', () => {
  beforeAll(() => {
    moment.locale('hi', hiLocale);
  });

  afterAll(() => {
    moment.locale('en');
  });

  // localeModule('hi');

  it('parse', function () {
    var _tests = 'जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.'.split('_'),
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
        ['dddd, Do MMMM YYYY, a h:mm:ss बजे', 'रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५:५० बजे'],
        ['ddd, a h बजे', 'रवि, दोपहर ३ बजे'],
        ['M Mo MM MMMM MMM', '२ २ ०२ फ़रवरी फ़र.'],
        ['YYYY YY', '२०१० १०'],
        ['D Do DD', '१४ १४ १४'],
        ['d do dddd ddd dd', '० ० रविवार रवि र'],
        ['DDD DDDo DDDD', '४५ ४५ ०४५'],
        ['w wo ww', '८ ८ ०८'],
        ['h hh', '३ ०३'],
        ['H HH', '१५ १५'],
        ['m mm', '२५ २५'],
        ['s ss', '५० ५०'],
        ['a A', 'दोपहर दोपहर'],
        ['LTS', 'दोपहर ३:२५:५० बजे'],
        ['L', '१४/०२/२०१०'],
        ['LL', '१४ फ़रवरी २०१०'],
        ['LLL', '१४ फ़रवरी २०१०, दोपहर ३:२५ बजे'],
        ['LLLL', 'रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५ बजे'],
        ['l', '१४/२/२०१०'],
        ['ll', '१४ फ़र. २०१०'],
        ['lll', '१४ फ़र. २०१०, दोपहर ३:२५ बजे'],
        ['llll', 'रवि, १४ फ़र. २०१०, दोपहर ३:२५ बजे']
      ],
      b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
      i;
    for (i = 0; i < a.length; i++) {
      assertEq(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
  });

  it('format ordinal', function () {
    assertEq(moment([2011, 0, 1]).format('DDDo'), '१', '१');
    assertEq(moment([2011, 0, 2]).format('DDDo'), '२', '२');
    assertEq(moment([2011, 0, 3]).format('DDDo'), '३', '३');
    assertEq(moment([2011, 0, 4]).format('DDDo'), '४', '४');
    assertEq(moment([2011, 0, 5]).format('DDDo'), '५', '५');
    assertEq(moment([2011, 0, 6]).format('DDDo'), '६', '६');
    assertEq(moment([2011, 0, 7]).format('DDDo'), '७', '७');
    assertEq(moment([2011, 0, 8]).format('DDDo'), '८', '८');
    assertEq(moment([2011, 0, 9]).format('DDDo'), '९', '९');
    assertEq(moment([2011, 0, 10]).format('DDDo'), '१०', '१०');

    assertEq(moment([2011, 0, 11]).format('DDDo'), '११', '११');
    assertEq(moment([2011, 0, 12]).format('DDDo'), '१२', '१२');
    assertEq(moment([2011, 0, 13]).format('DDDo'), '१३', '१३');
    assertEq(moment([2011, 0, 14]).format('DDDo'), '१४', '१४');
    assertEq(moment([2011, 0, 15]).format('DDDo'), '१५', '१५');
    assertEq(moment([2011, 0, 16]).format('DDDo'), '१६', '१६');
    assertEq(moment([2011, 0, 17]).format('DDDo'), '१७', '१७');
    assertEq(moment([2011, 0, 18]).format('DDDo'), '१८', '१८');
    assertEq(moment([2011, 0, 19]).format('DDDo'), '१९', '१९');
    assertEq(moment([2011, 0, 20]).format('DDDo'), '२०', '२०');

    assertEq(moment([2011, 0, 21]).format('DDDo'), '२१', '२१');
    assertEq(moment([2011, 0, 22]).format('DDDo'), '२२', '२२');
    assertEq(moment([2011, 0, 23]).format('DDDo'), '२३', '२३');
    assertEq(moment([2011, 0, 24]).format('DDDo'), '२४', '२४');
    assertEq(moment([2011, 0, 25]).format('DDDo'), '२५', '२५');
    assertEq(moment([2011, 0, 26]).format('DDDo'), '२६', '२६');
    assertEq(moment([2011, 0, 27]).format('DDDo'), '२७', '२७');
    assertEq(moment([2011, 0, 28]).format('DDDo'), '२८', '२८');
    assertEq(moment([2011, 0, 29]).format('DDDo'), '२९', '२९');
    assertEq(moment([2011, 0, 30]).format('DDDo'), '३०', '३०');

    assertEq(moment([2011, 0, 31]).format('DDDo'), '३१', '३१');
  });

  it('format month', function () {
    var expected = 'जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
  });

  it('format week', function () {
    var expected = 'रविवार रवि र_सोमवार सोम सो_मंगलवार मंगल मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श'.split('_'),
      i;
    for (i = 0; i < expected.length; i++) {
      assertEq(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
  });

  it('from', function () {
    var start = moment([2007, 1, 28]);
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 }), true), 'कुछ ही क्षण', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 }), true), 'एक मिनट', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 }), true), 'एक मिनट', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '२ मिनट', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 }), true), '४४ मिनट', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 }), true), 'एक घंटा', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 }), true), 'एक घंटा', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 }), true), '२ घंटे', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 }), true), '५ घंटे', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 }), true), '२१ घंटे', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 }), true), 'एक दिन', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 }), true), 'एक दिन', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 }), true), '२ दिन', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 }), true), 'एक दिन', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 }), true), '५ दिन', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 }), true), '२५ दिन', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 }), true), 'एक महीने', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 }), true), 'एक महीने', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 }), true), 'एक महीने', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 }), true), '२ महीने', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 }), true), '२ महीने', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 }), true), '३ महीने', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 }), true), 'एक महीने', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 }), true), '५ महीने', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 }), true), 'एक वर्ष', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 }), true), '२ वर्ष', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 }), true), 'एक वर्ष', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 }), true), '५ वर्ष', '5 years = 5 years');
  });

  it('suffix', function () {
    assertEq(moment(30000).from(0), 'कुछ ही क्षण में', 'prefix');
    assertEq(moment(0).from(30000), 'कुछ ही क्षण पहले', 'suffix');
  });

  it('now from now', function () {
    assertEq(moment().fromNow(), 'कुछ ही क्षण पहले', 'now from now should display as in the past');
  });

  it('fromNow', function () {
    assertEq(moment().add({ s: 30 }).fromNow(), 'कुछ ही क्षण में', 'कुछ ही क्षण में');
    assertEq(moment().add({ d: 5 }).fromNow(), '५ दिन में', '५ दिन में');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'आज दोपहर १२:०० बजे', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'आज दोपहर १२:२५ बजे', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 3 }).calendar(), 'आज दोपहर ३:०० बजे', 'Now plus 3 hours');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'कल दोपहर १२:०० बजे', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'आज दोपहर ११:०० बजे', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'कल दोपहर १२:०० बजे', 'yesterday at the same time');
  });

  it('calendar next week', function () {
    var i, m;
    for (i = 2; i < 7; i++) {
      m = moment().add({ d: i });
      assertEq(m.calendar(), m.format('dddd[,] LT'), 'Today + ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('dddd[,] LT'), 'Today + ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('dddd[,] LT'), 'Today + ' + i + ' days end of day');
    }
  });

  it('calendar last week', function () {
    var i, m;

    for (i = 2; i < 7; i++) {
      m = moment().subtract({ d: i });
      assertEq(m.calendar(), m.format('[पिछले] dddd[,] LT'), 'Today - ' + i + ' days current time');
      m.hours(0).minutes(0).seconds(0).milliseconds(0);
      assertEq(m.calendar(), m.format('[पिछले] dddd[,] LT'), 'Today - ' + i + ' days beginning of day');
      m.hours(23).minutes(59).seconds(59).milliseconds(999);
      assertEq(m.calendar(), m.format('[पिछले] dddd[,] LT'), 'Today - ' + i + ' days end of day');
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

  it('meridiem', function () {
    assertEq(moment([2011, 2, 23, 2, 30]).format('a'), 'रात', 'before dawn');
    assertEq(moment([2011, 2, 23, 9, 30]).format('a'), 'सुबह', 'morning');
    assertEq(moment([2011, 2, 23, 14, 30]).format('a'), 'दोपहर', 'during day');
    assertEq(moment([2011, 2, 23, 17, 30]).format('a'), 'शाम', 'evening');
    assertEq(moment([2011, 2, 23, 19, 30]).format('a'), 'शाम', 'late evening');
    assertEq(moment([2011, 2, 23, 21, 20]).format('a'), 'रात', 'night');

    assertEq(moment([2011, 2, 23, 2, 30]).format('A'), 'रात', 'before dawn');
    assertEq(moment([2011, 2, 23, 9, 30]).format('A'), 'सुबह', 'morning');
    assertEq(moment([2011, 2, 23, 14, 30]).format('A'), 'दोपहर', ' during day');
    assertEq(moment([2011, 2, 23, 17, 30]).format('A'), 'शाम', 'evening');
    assertEq(moment([2011, 2, 23, 19, 30]).format('A'), 'शाम', 'late evening');
    assertEq(moment([2011, 2, 23, 21, 20]).format('A'), 'रात', 'night');
  });

  it('weeks year starting sunday formatted', function () {
    assertEq(moment([2012, 0, 1]).format('w ww wo'), '१ ०१ १', 'Jan  1 2012 should be week 1');
    assertEq(moment([2012, 0, 7]).format('w ww wo'), '१ ०१ १', 'Jan  7 2012 should be week 1');
    assertEq(moment([2012, 0, 8]).format('w ww wo'), '२ ०२ २', 'Jan  8 2012 should be week 2');
    assertEq(moment([2012, 0, 14]).format('w ww wo'), '२ ०२ २', 'Jan 14 2012 should be week 2');
    assertEq(moment([2012, 0, 15]).format('w ww wo'), '३ ०३ ३', 'Jan 15 2012 should be week 3');
  });

});
