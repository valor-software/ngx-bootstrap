import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('format', () => {

  it('format YY', function () {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    assertEq(b.format('YY'), '09', 'YY ---> 09');
  });

  it('format escape brackets', function () {
    moment.locale('en');

    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    assertEq(b.format('[day]'), 'day', 'Single bracket');
    assertEq(b.format('[day] YY [YY]'), 'day 09 YY', 'Double bracket');
    assertEq(b.format('[YY'), '[09', 'Un-ended bracket');
    assertEq(b.format('[[YY]]'), '[YY]', 'Double nested brackets');
    assertEq(b.format('[[]'), '[', 'Escape open bracket');
    assertEq(b.format('[Last]'), 'Last', 'localized tokens');
    assertEq(b.format('[L] L'), 'L 02/14/2009', 'localized tokens with escaped localized tokens');
    assertEq(b.format('[L LL LLL LLLL aLa]'), 'L LL LLL LLLL aLa', 'localized tokens with escaped localized tokens');
    assertEq(b.format('[LLL] LLL'), 'LLL February 14, 2009 3:25 PM', 'localized tokens with escaped localized tokens (recursion)');
    assertEq(b.format('YYYY[\n]DD[\n]'), '2009\n14\n', 'Newlines');
  });

  it('handle negative years', function () {
    moment.locale('en');
    assertEq(moment.utc().year(-1).format('YY'), '-01', 'YY with negative year');
    assertEq(moment.utc().year(-1).format('YYYY'), '-0001', 'YYYY with negative year');
    assertEq(moment.utc().year(-12).format('YY'), '-12', 'YY with negative year');
    assertEq(moment.utc().year(-12).format('YYYY'), '-0012', 'YYYY with negative year');
    assertEq(moment.utc().year(-123).format('YY'), '-23', 'YY with negative year');
    assertEq(moment.utc().year(-123).format('YYYY'), '-0123', 'YYYY with negative year');
    assertEq(moment.utc().year(-1234).format('YY'), '-34', 'YY with negative year');
    assertEq(moment.utc().year(-1234).format('YYYY'), '-1234', 'YYYY with negative year');
    assertEq(moment.utc().year(-12345).format('YY'), '-45', 'YY with negative year');
    assertEq(moment.utc().year(-12345).format('YYYY'), '-12345', 'YYYY with negative year');
  });

  it('format milliseconds', function () {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 123));
    assertEq(b.format('S'), '1', 'Deciseconds');
    assertEq(b.format('SS'), '12', 'Centiseconds');
    assertEq(b.format('SSS'), '123', 'Milliseconds');
    b.milliseconds(789);
    assertEq(b.format('S'), '7', 'Deciseconds');
    assertEq(b.format('SS'), '78', 'Centiseconds');
    assertEq(b.format('SSS'), '789', 'Milliseconds');
  });

  it('format timezone', function () {
    var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    assertOk(b.format('Z').match(/^[\+\-]\d\d:\d\d$/), b.format('Z') + ' should be something like \'+07:30\'');
    assertOk(b.format('ZZ').match(/^[\+\-]\d{4}$/), b.format('ZZ') + ' should be something like \'+0700\'');
  });

  it('format multiple with utc offset', function () {
    var b = moment('2012-10-08 -1200', ['YYYY-MM-DD HH:mm ZZ', 'YYYY-MM-DD ZZ', 'YYYY-MM-DD']);
    assertEq(b.format('YYYY-MM'), '2012-10', 'Parsing multiple formats should not crash with different sized formats');
  });

  it('isDST', function () {
    var janOffset = new Date(2011, 0, 1).getTimezoneOffset(),
      julOffset = new Date(2011, 6, 1).getTimezoneOffset(),
      janIsDst = janOffset < julOffset,
      julIsDst = julOffset < janOffset,
      jan1 = moment([2011]),
      jul1 = moment([2011, 6]);

    if (janIsDst && julIsDst) {
      assertOk(0, 'January and July cannot both be in DST');
      assertOk(0, 'January and July cannot both be in DST');
    } else if (janIsDst) {
      assertOk(jan1.isDST(), 'January 1 is DST');
      assertOk(!jul1.isDST(), 'July 1 is not DST');
    } else if (julIsDst) {
      assertOk(!jan1.isDST(), 'January 1 is not DST');
      assertOk(jul1.isDST(), 'July 1 is DST');
    } else {
      assertOk(!jan1.isDST(), 'January 1 is not DST');
      assertOk(!jul1.isDST(), 'July 1 is not DST');
    }
  });

  it('unix timestamp', function () {
    var m = moment('1234567890.123', 'X');
    assertEq(m.format('X'), '1234567890', 'unix timestamp without milliseconds');
    assertEq(m.format('X.S'), '1234567890.1', 'unix timestamp with deciseconds');
    assertEq(m.format('X.SS'), '1234567890.12', 'unix timestamp with centiseconds');
    assertEq(m.format('X.SSS'), '1234567890.123', 'unix timestamp with milliseconds');

    m = moment(1234567890.123, 'X');
    assertEq(m.format('X'), '1234567890', 'unix timestamp as integer');
  });

  it('unix offset milliseconds', function () {
    var m = moment('1234567890123', 'x');
    assertEq(m.format('x'), '1234567890123', 'unix offset in milliseconds');

    m = moment(1234567890123, 'x');
    assertEq(m.format('x'), '1234567890123', 'unix offset in milliseconds as integer');
  });

  it('utcOffset sanity checks', function () {
    assertEq(Math.abs(moment().utcOffset()) % 15, 0,
      'utc offset should be a multiple of 15 (was ' + moment().utcOffset() + ')');

    assertEq(moment().utcOffset(), -(new Date()).getTimezoneOffset(),
      'utcOffset should return the opposite of getTimezoneOffset');
  });

  it('default format', function () {
    var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\d[\+\-]\d\d:\d\d/;
    assertOk(isoRegex.exec(moment().format()), 'default format (' + moment().format() + ') should match ISO');
  });

  it('default UTC format', function () {
    var isoRegex = /\d{4}.\d\d.\d\dT\d\d.\d\d.\d\dZ/;
    assertOk(isoRegex.exec(moment.utc().format()), 'default UTC format (' + moment.utc().format() + ') should match ISO');
  });

  it('toJSON', function () {
    var supportsJson = typeof JSON !== 'undefined' && JSON.stringify && JSON.stringify.call,
      date = moment('2012-10-09T21:30:40.678+0100');

    assertEq(date.toJSON(), '2012-10-09T20:30:40.678Z', 'should output ISO8601 on moment.fn.toJSON');

    if (supportsJson) {
      assertEq(JSON.stringify({
        date: date
      }), '{"date":"2012-10-09T20:30:40.678Z"}', 'should output ISO8601 on JSON.stringify');
    }
  });

  it('toISOString', function () {
    var date = moment.utc('2012-10-09T20:30:40.678');

    assertEq(date.toISOString(), '2012-10-09T20:30:40.678Z', 'should output ISO8601 on moment.fn.toISOString');

    // big years
    date = moment.utc('+020123-10-09T20:30:40.678');
    assertEq(date.toISOString(), '+020123-10-09T20:30:40.678Z', 'ISO8601 format on big positive year');
    // negative years
    date = moment.utc('-000001-10-09T20:30:40.678');
    assertEq(date.toISOString(), '-000001-10-09T20:30:40.678Z', 'ISO8601 format on negative year');
    // big negative years
    date = moment.utc('-020123-10-09T20:30:40.678');
    assertEq(date.toISOString(), '-020123-10-09T20:30:40.678Z', 'ISO8601 format on big negative year');

    //invalid dates
    date = moment.utc('2017-12-32');
    assertEq(date.toISOString(), null, 'An invalid date to iso string is null');
  });

// See https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
  xit('inspect', function () {
    function roundtrip(m) {
      /*jshint evil:true */
      return (new Function('moment', 'return ' + m.inspect()))(moment);
    }

    function testInspect(date, string) {
      var inspected = date.inspect();
      assertEq(inspected, string);
      assertOk(date.isSame(roundtrip(date)), 'Tried to parse ' + inspected);
    }

    testInspect(
      moment('2012-10-09T20:30:40.678'),
      'moment("2012-10-09T20:30:40.678")'
    );
    testInspect(
      moment('+020123-10-09T20:30:40.678'),
      'moment("+020123-10-09T20:30:40.678")'
    );
    testInspect(
      moment.utc('2012-10-09T20:30:40.678'),
      'moment.utc("2012-10-09T20:30:40.678+00:00")'
    );
    testInspect(
      moment.utc('+020123-10-09T20:30:40.678'),
      'moment.utc("+020123-10-09T20:30:40.678+00:00")'
    );
    testInspect(
      moment.utc('+020123-10-09T20:30:40.678+01:00'),
      'moment.utc("+020123-10-09T19:30:40.678+00:00")'
    );
    testInspect(
      moment.parseZone('2016-06-11T17:30:40.678+0430'),
      'moment.parseZone("2016-06-11T17:30:40.678+04:30")'
    );
    testInspect(
      moment.parseZone('+112016-06-11T17:30:40.678+0430'),
      'moment.parseZone("+112016-06-11T17:30:40.678+04:30")'
    );

    assertEq(
      moment(new Date('nope')).inspect(),
      'moment.invalid(/* Invalid Date */)'
    );
    assertEq(
      moment('blah', 'YYYY').inspect(),
      'moment.invalid(/* blah */)'
    );
  });

  it('long years', function () {
    assertEq(moment.utc().year(2).format('YYYYYY'), '+000002', 'small year with YYYYYY');
    assertEq(moment.utc().year(2012).format('YYYYYY'), '+002012', 'regular year with YYYYYY');
    assertEq(moment.utc().year(20123).format('YYYYYY'), '+020123', 'big year with YYYYYY');

    assertEq(moment.utc().year(-1).format('YYYYYY'), '-000001', 'small negative year with YYYYYY');
    assertEq(moment.utc().year(-2012).format('YYYYYY'), '-002012', 'negative year with YYYYYY');
    assertEq(moment.utc().year(-20123).format('YYYYYY'), '-020123', 'big negative year with YYYYYY');
  });

  it('toISOString() when 0 year', function () {
    // https://github.com/moment/moment/issues/3765
    var date = moment('0000-01-01T21:00:00.000Z');
    assertEq(date.toISOString(), '0000-01-01T21:00:00.000Z');
    assertEq(date.toDate().toISOString(), '0000-01-01T21:00:00.000Z');
  });

  it('iso week formats', function () {
    // https://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
      '2005-01-02': '2004-53',
      '2005-12-31': '2005-52',
      '2007-01-01': '2007-01',
      '2007-12-30': '2007-52',
      '2007-12-31': '2008-01',
      '2008-01-01': '2008-01',
      '2008-12-28': '2008-52',
      '2008-12-29': '2009-01',
      '2008-12-30': '2009-01',
      '2008-12-31': '2009-01',
      '2009-01-01': '2009-01',
      '2009-12-31': '2009-53',
      '2010-01-01': '2009-53',
      '2010-01-02': '2009-53',
      '2010-01-03': '2009-53',
      '404-12-31': '0404-53',
      '405-12-31': '0405-52'
    }, i, isoWeek, formatted2, formatted1;

    for (i in cases) {
      isoWeek = cases[i].split('-').pop();
      formatted2 = moment(i, 'YYYY-MM-DD').format('WW');
      assertEq(isoWeek, formatted2, i + ': WW should be ' + isoWeek + ', but ' + formatted2);
      isoWeek = isoWeek.replace(/^0+/, '');
      formatted1 = moment(i, 'YYYY-MM-DD').format('W');
      assertEq(isoWeek, formatted1, i + ': W should be ' + isoWeek + ', but ' + formatted1);
    }
  });

  it('iso week year formats', function () {
    // https://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
      '2005-01-02': '2004-53',
      '2005-12-31': '2005-52',
      '2007-01-01': '2007-01',
      '2007-12-30': '2007-52',
      '2007-12-31': '2008-01',
      '2008-01-01': '2008-01',
      '2008-12-28': '2008-52',
      '2008-12-29': '2009-01',
      '2008-12-30': '2009-01',
      '2008-12-31': '2009-01',
      '2009-01-01': '2009-01',
      '2009-12-31': '2009-53',
      '2010-01-01': '2009-53',
      '2010-01-02': '2009-53',
      '2010-01-03': '2009-53',
      '404-12-31': '0404-53',
      '405-12-31': '0405-52'
    }, i, isoWeekYear, formatted5, formatted4, formatted2;

    for (i in cases) {
      isoWeekYear = cases[i].split('-')[0];
      formatted5 = moment(i, 'YYYY-MM-DD').format('GGGGG');
      assertEq('0' + isoWeekYear, formatted5, i + ': GGGGG should be ' + isoWeekYear + ', but ' + formatted5);
      formatted4 = moment(i, 'YYYY-MM-DD').format('GGGG');
      assertEq(isoWeekYear, formatted4, i + ': GGGG should be ' + isoWeekYear + ', but ' + formatted4);
      formatted2 = moment(i, 'YYYY-MM-DD').format('GG');
      assertEq(isoWeekYear.slice(2, 4), formatted2, i + ': GG should be ' + isoWeekYear + ', but ' + formatted2);
    }
  });

  it('week year formats', function () {
    // https://en.wikipedia.org/wiki/ISO_week_date
    var cases = {
      '2005-01-02': '2004-53',
      '2005-12-31': '2005-52',
      '2007-01-01': '2007-01',
      '2007-12-30': '2007-52',
      '2007-12-31': '2008-01',
      '2008-01-01': '2008-01',
      '2008-12-28': '2008-52',
      '2008-12-29': '2009-01',
      '2008-12-30': '2009-01',
      '2008-12-31': '2009-01',
      '2009-01-01': '2009-01',
      '2009-12-31': '2009-53',
      '2010-01-01': '2009-53',
      '2010-01-02': '2009-53',
      '2010-01-03': '2009-53',
      '404-12-31': '0404-53',
      '405-12-31': '0405-52'
    }, i, isoWeekYear, formatted5, formatted4, formatted2;

    moment.defineLocale('dow:1,doy:4', { week: { dow: 1, doy: 4 } });

    for (i in cases) {
      isoWeekYear = cases[i].split('-')[0];
      formatted5 = moment(i, 'YYYY-MM-DD').format('ggggg');
      assertEq('0' + isoWeekYear, formatted5, i + ': ggggg should be ' + isoWeekYear + ', but ' + formatted5);
      formatted4 = moment(i, 'YYYY-MM-DD').format('gggg');
      assertEq(isoWeekYear, formatted4, i + ': gggg should be ' + isoWeekYear + ', but ' + formatted4);
      formatted2 = moment(i, 'YYYY-MM-DD').format('gg');
      assertEq(isoWeekYear.slice(2, 4), formatted2, i + ': gg should be ' + isoWeekYear + ', but ' + formatted2);
    }
    moment.defineLocale('dow:1,doy:4', null);
  });

  it('iso weekday formats', function () {
    assertEq(moment([1985, 1, 4]).format('E'), '1', 'Feb  4 1985 is Monday    -- 1st day');
    assertEq(moment([2029, 8, 18]).format('E'), '2', 'Sep 18 2029 is Tuesday   -- 2nd day');
    assertEq(moment([2013, 3, 24]).format('E'), '3', 'Apr 24 2013 is Wednesday -- 3rd day');
    assertEq(moment([2015, 2, 5]).format('E'), '4', 'Mar  5 2015 is Thursday  -- 4th day');
    assertEq(moment([1970, 0, 2]).format('E'), '5', 'Jan  2 1970 is Friday    -- 5th day');
    assertEq(moment([2001, 4, 12]).format('E'), '6', 'May 12 2001 is Saturday  -- 6th day');
    assertEq(moment([2000, 0, 2]).format('E'), '7', 'Jan  2 2000 is Sunday    -- 7th day');
  });

  it('weekday formats', function () {
    moment.defineLocale('dow: 3,doy: 5', { week: { dow: 3, doy: 5 } });
    assertEq(moment([1985, 1, 6]).format('e'), '0', 'Feb  6 1985 is Wednesday -- 0th day');
    assertEq(moment([2029, 8, 20]).format('e'), '1', 'Sep 20 2029 is Thursday  -- 1st day');
    assertEq(moment([2013, 3, 26]).format('e'), '2', 'Apr 26 2013 is Friday    -- 2nd day');
    assertEq(moment([2015, 2, 7]).format('e'), '3', 'Mar  7 2015 is Saturday  -- 3nd day');
    assertEq(moment([1970, 0, 4]).format('e'), '4', 'Jan  4 1970 is Sunday    -- 4th day');
    assertEq(moment([2001, 4, 14]).format('e'), '5', 'May 14 2001 is Monday    -- 5th day');
    assertEq(moment([2000, 0, 4]).format('e'), '6', 'Jan  4 2000 is Tuesday   -- 6th day');
    moment.defineLocale('dow: 3,doy: 5', null);
  });

  it('toString is just human readable format', function () {
    var b = moment(new Date(2009, 1, 5, 15, 25, 50, 125));
    assertEq(b.toString(), b.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'));
  });

  it('toJSON skips postformat', function () {
    moment.defineLocale('postformat', {
      postformat: function (str: string): string {
        return str.replace(/./g, 'X');
      }
    });
    assertEq(moment.utc([2000, 0, 1]).toJSON(), '2000-01-01T00:00:00.000Z', 'toJSON doesn\'t postformat');
    moment.defineLocale('postformat', null);
  });

  it('calendar day timezone', function () {
    moment.locale('en');
    var zones = [60, -60, 90, -90, 360, -360, 720, -720],
      b = moment().utc().startOf('day').subtract({ m: 1 }),
      c = moment().local().startOf('day').subtract({ m: 1 }),
      d = moment().local().startOf('day').subtract({ d: 2 }),
      i, z, a;

    for (i = 0; i < zones.length; ++i) {
      z = zones[i];
      a = moment().utcOffset(z).startOf('day').subtract({ m: 1 });
      assertEq(moment(a).utcOffset(z).calendar(), 'Yesterday at 11:59 PM',
        'Yesterday at 11:59 PM, not Today, or the wrong time, tz = ' + z);
    }

    assertEq(moment(b).utc().calendar(), 'Yesterday at 11:59 PM', 'Yesterday at 11:59 PM, not Today, or the wrong time');
    assertEq(moment(c).local().calendar(), 'Yesterday at 11:59 PM', 'Yesterday at 11:59 PM, not Today, or the wrong time');
    assertEq(moment(c).local().calendar(d), 'Tomorrow at 11:59 PM', 'Tomorrow at 11:59 PM, not Yesterday, or the wrong time');
  });

  it('calendar with custom formats', function () {
    assertEq(moment().calendar(null, { sameDay: '[Today]' }), 'Today', 'Today');
    assertEq(moment().add(1, 'days').calendar(null, { nextDay: '[Tomorrow]' }), 'Tomorrow', 'Tomorrow');
    assertEq(moment([1985, 1, 4]).calendar(null, { sameElse: 'YYYY-MM-DD' }), '1985-02-04', 'Else');
  });

  it('invalid', function () {
    assertEq(moment.invalid().format(), 'Invalid date');
    assertEq(moment.invalid().format('YYYY-MM-DD'), 'Invalid date');
  });

  it('quarter formats', function () {
    assertEq(moment([1985, 1, 4]).format('Q'), '1', 'Feb  4 1985 is Q1');
    assertEq(moment([2029, 8, 18]).format('Q'), '3', 'Sep 18 2029 is Q3');
    assertEq(moment([2013, 3, 24]).format('Q'), '2', 'Apr 24 2013 is Q2');
    assertEq(moment([2015, 2, 5]).format('Q'), '1', 'Mar  5 2015 is Q1');
    assertEq(moment([1970, 0, 2]).format('Q'), '1', 'Jan  2 1970 is Q1');
    assertEq(moment([2001, 11, 12]).format('Q'), '4', 'Dec 12 2001 is Q4');
    assertEq(moment([2000, 0, 2]).format('[Q]Q-YYYY'), 'Q1-2000', 'Jan  2 2000 is Q1');
  });

  it('quarter ordinal formats', function () {
    assertEq(moment([1985, 1, 4]).format('Qo'), '1st', 'Feb 4 1985 is 1st quarter');
    assertEq(moment([2029, 8, 18]).format('Qo'), '3rd', 'Sep 18 2029 is 3rd quarter');
    assertEq(moment([2013, 3, 24]).format('Qo'), '2nd', 'Apr 24 2013 is 2nd quarter');
    assertEq(moment([2015, 2, 5]).format('Qo'), '1st', 'Mar  5 2015 is 1st quarter');
    assertEq(moment([1970, 0, 2]).format('Qo'), '1st', 'Jan  2 1970 is 1st quarter');
    assertEq(moment([2001, 11, 12]).format('Qo'), '4th', 'Dec 12 2001 is 4th quarter');
    assertEq(moment([2000, 0, 2]).format('Qo [quarter] YYYY'), '1st quarter 2000', 'Jan  2 2000 is 1st quarter');
  });

  // uses internals
/*
it('full expanded format is returned from abbreviated formats', function () {
    function objectKeys(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        } else {
            // IE8
            var res = [], i;
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    res.push(i);
                }
            }
            return res;
        }
    }

    var locales =
        'ar-sa ar-tn ar az be bg bn bo br bs ca cs cv cy da de-at de dv el ' +
        'en-au en-ca en-gb en-ie en-nz eo es et eu fa fi fo fr-ca fr-ch fr fy ' +
        'gd gl he hi hr hu hy-am id is it ja jv ka kk km ko lb lo lt lv me mk ml ' +
        'mr ms-my ms my nb ne nl nn pl pt-br pt ro ru se si sk sl sq sr-cyrl ' +
        'sr sv sw ta te th tl-ph tlh tr tzl tzm-latn tzm uk uz vi zh-cn zh-tw';

    each(locales.split(' '), function (locale) {
        var data, tokens;
        data = moment().locale(locale).localeData()._longDateFormat;
        tokens = objectKeys(data);
        each(tokens, function (token) {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            each(tokens, function (i) {
                // strip escaped sequences
                var format = data[i].replace(/(\[[^\]]*\])/g, '');
                assertEq(false, !!~format.indexOf(token), 'locale ' + locale + ' contains ' + token + ' in ' + i);
            });
        });
    });
});
*/

  it('milliseconds', function () {
    var m = moment('123', 'SSS');

    assertEq(m.format('S'), '1');
    assertEq(m.format('SS'), '12');
    assertEq(m.format('SSS'), '123');
    assertEq(m.format('SSSS'), '1230');
    assertEq(m.format('SSSSS'), '12300');
    assertEq(m.format('SSSSSS'), '123000');
    assertEq(m.format('SSSSSSS'), '1230000');
    assertEq(m.format('SSSSSSSS'), '12300000');
    assertEq(m.format('SSSSSSSSS'), '123000000');
  });

  it('hmm and hmmss', function () {
    assertEq(moment('12:34:56', 'HH:mm:ss').format('hmm'), '1234');
    assertEq(moment('01:34:56', 'HH:mm:ss').format('hmm'), '134');
    assertEq(moment('13:34:56', 'HH:mm:ss').format('hmm'), '134');

    assertEq(moment('12:34:56', 'HH:mm:ss').format('hmmss'), '123456');
    assertEq(moment('01:34:56', 'HH:mm:ss').format('hmmss'), '13456');
    assertEq(moment('13:34:56', 'HH:mm:ss').format('hmmss'), '13456');
  });

  it('Hmm and Hmmss', function () {
    assertEq(moment('12:34:56', 'HH:mm:ss').format('Hmm'), '1234');
    assertEq(moment('01:34:56', 'HH:mm:ss').format('Hmm'), '134');
    assertEq(moment('13:34:56', 'HH:mm:ss').format('Hmm'), '1334');

    assertEq(moment('12:34:56', 'HH:mm:ss').format('Hmmss'), '123456');
    assertEq(moment('01:34:56', 'HH:mm:ss').format('Hmmss'), '13456');
    assertEq(moment('08:34:56', 'HH:mm:ss').format('Hmmss'), '83456');
    assertEq(moment('18:34:56', 'HH:mm:ss').format('Hmmss'), '183456');
  });

  it('k and kk', function () {
    assertEq(moment('01:23:45', 'HH:mm:ss').format('k'), '1');
    assertEq(moment('12:34:56', 'HH:mm:ss').format('k'), '12');
    assertEq(moment('01:23:45', 'HH:mm:ss').format('kk'), '01');
    assertEq(moment('12:34:56', 'HH:mm:ss').format('kk'), '12');
    assertEq(moment('00:34:56', 'HH:mm:ss').format('kk'), '24');
    assertEq(moment('00:00:00', 'HH:mm:ss').format('kk'), '24');
  });

  it('Y token', function () {
    assertEq(moment('2010-01-01', 'YYYY-MM-DD', true).format('Y'), '2010', 'format 2010 with Y');
    assertEq(moment('-123-01-01', 'Y-MM-DD', true).format('Y'), '-123', 'format -123 with Y');
    assertEq(moment('12345-01-01', 'Y-MM-DD', true).format('Y'), '+12345', 'format 12345 with Y');
    assertEq(moment('0-01-01', 'Y-MM-DD', true).format('Y'), '0', 'format 0 with Y');
    assertEq(moment('1-01-01', 'Y-MM-DD', true).format('Y'), '1', 'format 1 with Y');
    assertEq(moment('9999-01-01', 'Y-MM-DD', true).format('Y'), '9999', 'format 9999 with Y');
    assertEq(moment('10000-01-01', 'Y-MM-DD', true).format('Y'), '+10000', 'format 10000 with Y');
  });
});
