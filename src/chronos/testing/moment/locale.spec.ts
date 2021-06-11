import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';
import { defineLocale } from '../../locale/locales';
import { enGbLocale } from '../../i18n/en-gb';
import { frLocale } from '../../i18n/fr';
import { esLocale } from '../../i18n/es';
import { viLocale } from '../../i18n/vi';
import { zhCnLocale } from '../../i18n/zh-cn';
import { itLocale as italy } from '../../i18n/it';
import { getDate } from '../../utils/date-getters';

defineLocale('en-gb', enGbLocale);
defineLocale('en-ca', enGbLocale);
defineLocale('es', esLocale);
defineLocale('fr', frLocale);
defineLocale('fr-ca', frLocale);
defineLocale('it', italy);
defineLocale('it', zhCnLocale);
defineLocale('vi', viLocale);
defineLocale('zh-cn', zhCnLocale);

moment.locale('en');

// module('locale', {
//     setup : function () {
//         // TODO: Remove once locales are switched to ES6
//         each([{
//             name: 'en-gb',
//             data: {}
//         }, {
//             name: 'en-ca',
//             data: {}
//         }, {
//             name: 'es',
//             data: {
//                 relativeTime: {past: 'hace %s', s: 'unos segundos', d: 'un día'},
//                 months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
//             }
//         }, {
//             name: 'fr',
//             data: {}
//         }, {
//             name: 'fr-ca',
//             data: {}
//         }, {
//             name: 'it',
//             data: {}
//         }, {
//             name: 'zh-cn',
//             data: {
//                 months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_')
//             }
//         }], function (locale) {
//             if (moment.locale(locale.name) !== locale.name) {
//                 moment.defineLocale(locale.name, locale.data);
//             }
//         });
//         moment.locale('en');
//     }
// });

describe('locale', function () {
  beforeEach(() => {
    // Avoid console spam ERROR: 'Khronos locale error: please load locale "non-existing-locale" before using it'
    spyOn(console, 'error');
  });

  afterEach(() => {
    moment.locale('en');
  });

  it('library getters and setters', function () {
    var r = moment.locale('en');

    assertEq(r, 'en', 'locale should return en by default');
    assertEq(moment.locale(), 'en', 'locale should return en by default');

    moment.locale('fr');
    assertEq(moment.locale(), 'fr', 'locale should return the changed locale');

    moment.locale('en-gb');
    assertEq(moment.locale(), 'en-gb', 'locale should return the changed locale');

    moment.locale('en');
    assertEq(moment.locale(), 'en', 'locale should reset');

    moment.locale('does-not-exist');
    assertEq(moment.locale(), 'en', 'locale should reset');

    moment.locale('EN');
    assertEq(moment.locale(), 'en', 'Normalize locale key case');

    moment.locale('EN_gb');
    assertEq(moment.locale(), 'en-gb', 'Normalize locale key underscore');
  });

  it('library setter array of locales', function () {
    assertEq(moment.locale(['non-existent', 'fr', 'also-non-existent']), 'fr', 'passing an array uses the first valid locale');
    assertEq(moment.locale(['es', 'fr', 'also-non-existent']), 'es', 'passing an array uses the first valid locale');
  });

  it('library setter locale substrings', function () {
    assertEq(moment.locale('fr-crap'), 'fr', 'use substrings');
    assertEq(moment.locale('fr-does-not-exist'), 'fr', 'uses deep substrings');
    assertEq(moment.locale('fr-CA-does-not-exist'), 'fr-ca', 'uses deepest substring');
  });

  it('library getter locale array and substrings', function () {
    assertEq(moment.locale(['en-CH', 'fr']), 'en', 'prefer root locale to shallower ones');
    assertEq(moment.locale(['en-gb-leeds', 'en-CA']), 'en-gb', 'prefer root locale to shallower ones');
    assertEq(moment.locale(['en-fake', 'en-CA']), 'en-ca', 'prefer alternatives with shared roots');
    assertEq(moment.locale(['en-fake', 'en-fake2', 'en-ca']), 'en-ca', 'prefer alternatives with shared roots');
    assertEq(moment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', 'always find something if possible');
    assertEq(moment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', 'always find something if possible');
    assertEq(moment.locale(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']), 'fr', 'always find something if possible');
    assertEq(moment.locale(['en', 'en-CA']), 'en', 'prefer earlier if it works');
  });

  it('library ensure inheritance', function () {
    moment.locale('made-up', {
      // I put them out of order
      months: 'February_March_April_May_June_July_August_September_October_November_December_January'.split('_')
      // the rest of the properties should be inherited.
    });

    assertEq(moment([2012, 5, 6]).format('MMMM'), 'July', 'Override some of the configs');
    assertEq(moment([2012, 5, 6]).format('MMM'), 'Jun', 'But not all of them');
    moment.defineLocale('made-up', null);
  });

  it('library ensure inheritance LT L LL LLL LLLL', function () {
    var locale = 'testing-inherit-lt';

    moment.defineLocale(locale, {
      longDateFormat: {
        LT: '-[LT]-',
        L: '-[L]-',
        LL: '-[LL]-',
        LLL: '-[LLL]-',
        LLLL: '-[LLLL]-'
      },
      calendar: {
        sameDay: '[sameDay] LT',
        nextDay: '[nextDay] L',
        nextWeek: '[nextWeek] LL',
        lastDay: '[lastDay] LLL',
        lastWeek: '[lastWeek] LLLL',
        sameElse: 'L'
      }
    });

    moment.locale('es');

    assertEq(moment().locale(locale).calendar(), 'sameDay -LT-', 'Should use instance locale in LT formatting');
    assertEq(moment().add(1, 'days').locale(locale).calendar(), 'nextDay -L-', 'Should use instance locale in L formatting');
    assertEq(moment().add(-1, 'days').locale(locale).calendar(), 'lastDay -LLL-', 'Should use instance locale in LL formatting');
    assertEq(moment().add(4, 'days').locale(locale).calendar(), 'nextWeek -LL-', 'Should use instance locale in LLL formatting');
    assertEq(moment().add(-4, 'days').locale(locale).calendar(), 'lastWeek -LLLL-', 'Should use instance locale in LLLL formatting');

    moment.defineLocale(locale, null);
  });

  it('library localeData', function () {
    moment.locale('en');

    var jan = moment([2000, 0]);

    assertEq(moment.localeData().months(jan.toDate()), 'January', 'no arguments returns global');
    assertEq(moment.localeData('zh-cn').months(jan.toDate()), '一月', 'a string returns the locale based on key');
    assertEq(moment.localeData('vi').months(jan.toDate()), 'tháng 1', 'a string returns the locale based on key');
    assertEq(moment.localeData(moment().locale('es')).months(jan.toDate()), 'enero', 'if you pass in a moment it uses the moment\'s locale');
  });

  // DEPRECATED
  /*
    it('library deprecations', function () {
      testing.expectedDeprecations('moment.lang');
      moment.lang('dude', { months: ['Movember'] });
      assertEq(moment.locale(), 'dude', 'setting the lang sets the locale');
      assertEq(moment.lang(), moment.locale());
      assertEq(moment.langData(), moment.localeData(), 'langData is localeData');
      moment.defineLocale('dude', null);
    });
  */

  it('defineLocale', function () {
    moment.locale('en');
    moment.defineLocale('dude', { months: ['Movember'] });
    assertEq(moment().locale(), 'dude', 'defineLocale also sets it');
    assertEq(moment().locale('dude').locale(), 'dude', 'defineLocale defines a locale');
    moment.defineLocale('dude', null);
  });

  it('locales', function () {
    moment.defineLocale('dude', { months: ['Movember'] });
    assertEq(true, !!~moment.locales().indexOf('dude'), 'locales returns an array of defined locales');
    assertEq(true, !!~moment.locales().indexOf('en'), 'locales should always include english');
    moment.defineLocale('dude', null);
  });

  it('library convenience', function () {
    moment.locale('something', { week: { dow: 3 } });
    moment.locale('something');
    assertEq(moment.locale(), 'something', 'locale can be used to create the locale too');
    moment.defineLocale('something', null);
  });

  it('firstDayOfWeek firstDayOfYear locale getters', function () {
    moment.locale('something', { week: { dow: 3, doy: 4 } });
    moment.locale('something');
    assertEq(moment.localeData().firstDayOfWeek(), 3, 'firstDayOfWeek');
    assertEq(moment.localeData().firstDayOfYear(), 4, 'firstDayOfYear');
    moment.defineLocale('something', null);
  });

  it('instance locale method', function () {
    moment.locale('en');

    assertEq(moment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
    assertEq(moment([2012, 5, 6]).locale('es').format('MMMM'), 'junio', 'Use the instance specific locale');
    assertEq(moment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific locale does not affect other moments');
  });

  it('instance locale method with array', function () {
    var m = moment().locale(['non-existent', 'fr', 'also-non-existent']);
    assertEq(m.locale(), 'fr', 'passing an array uses the first valid locale');
    m = moment().locale(['es', 'fr', 'also-non-existent']);
    assertEq(m.locale(), 'es', 'passing an array uses the first valid locale');
  });

  it('instance getter locale substrings', function () {
    var m = moment();

    m.locale('fr-crap');
    assertEq(m.locale(), 'fr', 'use substrings');

    m.locale('fr-does-not-exist');
    assertEq(m.locale(), 'fr', 'uses deep substrings');
  });

  it('instance locale persists with manipulation', function () {
    moment.locale('en');

    assertEq(moment([2012, 5, 6]).locale('es').add({ days: 1 }).format('MMMM'), 'junio', 'With addition');
    assertEq(moment([2012, 5, 6]).locale('es').day(0).format('MMMM'), 'junio', 'With day getter');
    assertEq(moment([2012, 5, 6]).locale('es').endOf('day').format('MMMM'), 'junio', 'With endOf');
  });

  it('instance locale persists with cloning', function () {
    moment.locale('en');

    var a = moment([2012, 5, 6]).locale('es'),
      b = a.clone(),
      c = moment(a);

    assertEq(b.format('MMMM'), 'junio', 'using moment.fn.clone()');
    assertEq(b.format('MMMM'), 'junio', 'using moment()');
  });

  it('duration locale method', function () {
    moment.locale('en');

    assertEq(moment.duration({ seconds: 44 }).humanize(), 'a few seconds', 'Normally default to global');
    assertEq(moment.duration({ seconds: 44 }).locale('es').humanize(), 'unos segundos', 'Use the instance specific locale');
    assertEq(moment.duration({ seconds: 44 }).humanize(), 'a few seconds', 'Using an instance specific locale does not affect other durations');
  });

  it('duration locale persists with cloning', function () {
    moment.locale('en');

    var a = moment.duration({ seconds: 44 }).locale('es'),
      b = moment.duration(a);

    assertEq(b.humanize(), 'unos segundos', 'using moment.duration()');
  });

  it('changing the global locale doesn\'t affect existing duration instances', function () {
    var mom = moment.duration();
    moment.locale('fr');
    assertEq('en', mom.locale());
    moment.locale('en');
  });

  // DEPRECATED
  /*  it('duration deprecations', function () {
      testing.expectedDeprecations('moment().lang()');
      assertEq(moment.duration().lang(), moment.duration().localeData(), 'duration.lang is the same as duration.localeData');
    });*/

  it('from and fromNow with invalid date', function () {
    assertEq(moment(NaN).from(), 'Invalid date', 'moment.from with invalid moment');
    assertEq(moment(NaN).fromNow(), 'Invalid date', 'moment.fromNow with invalid moment');
  });

  it('from relative time future', function () {
    var start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).subtract({ s: 44 })), 'in a few seconds', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ s: 45 })), 'in a minute', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ s: 89 })), 'in a minute', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ s: 90 })), 'in 2 minutes', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ m: 44 })), 'in 44 minutes', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ m: 45 })), 'in an hour', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ m: 89 })), 'in an hour', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ m: 90 })), 'in 2 hours', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ h: 5 })), 'in 5 hours', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ h: 21 })), 'in 21 hours', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ h: 22 })), 'in a day', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ h: 35 })), 'in a day', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ h: 36 })), 'in 2 days', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 1 })), 'in a day', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 5 })), 'in 5 days', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 25 })), 'in 25 days', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 26 })), 'in a month', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 30 })), 'in a month', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 45 })), 'in a month', '45 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 47 })), 'in 2 months', '47 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 74 })), 'in 2 months', '74 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 78 })), 'in 3 months', '78 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ M: 1 })), 'in a month', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ M: 5 })), 'in 5 months', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 315 })), 'in 10 months', '315 days = 10 months');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 344 })), 'in a year', '344 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 345 })), 'in a year', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ d: 548 })), 'in 2 years', '548 days = in 2 years');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ y: 1 })), 'in a year', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).subtract({ y: 5 })), 'in 5 years', '5 years = 5 years');
  });

  it('from relative time past', function () {
    var start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).add({ s: 44 })), 'a few seconds ago', '44 seconds = a few seconds');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 45 })), 'a minute ago', '45 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 89 })), 'a minute ago', '89 seconds = a minute');
    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 })), '2 minutes ago', '90 seconds = 2 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 44 })), '44 minutes ago', '44 minutes = 44 minutes');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 45 })), 'an hour ago', '45 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 89 })), 'an hour ago', '89 minutes = an hour');
    assertEq(start.from(moment([2007, 1, 28]).add({ m: 90 })), '2 hours ago', '90 minutes = 2 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 5 })), '5 hours ago', '5 hours = 5 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 21 })), '21 hours ago', '21 hours = 21 hours');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 22 })), 'a day ago', '22 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 35 })), 'a day ago', '35 hours = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ h: 36 })), '2 days ago', '36 hours = 2 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 1 })), 'a day ago', '1 day = a day');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 5 })), '5 days ago', '5 days = 5 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 25 })), '25 days ago', '25 days = 25 days');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 26 })), 'a month ago', '26 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 30 })), 'a month ago', '30 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 43 })), 'a month ago', '43 days = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 46 })), '2 months ago', '46 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 74 })), '2 months ago', '75 days = 2 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 76 })), '3 months ago', '76 days = 3 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 1 })), 'a month ago', '1 month = a month');
    assertEq(start.from(moment([2007, 1, 28]).add({ M: 5 })), '5 months ago', '5 months = 5 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 315 })), '10 months ago', '315 days = 10 months');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 344 })), 'a year ago', '344 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 345 })), 'a year ago', '345 days = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ d: 548 })), '2 years ago', '548 days = 2 years');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 1 })), 'a year ago', '1 year = a year');
    assertEq(start.from(moment([2007, 1, 28]).add({ y: 5 })), '5 years ago', '5 years = 5 years');
  });

  it('instance locale used with from', function () {
    moment.locale('en');

    var a = moment([2012, 5, 6]).locale('es'),
      b = moment([2012, 5, 7]);

    assertEq(a.from(b), 'hace un día', 'preserve locale of first moment');
    assertEq(b.from(a), 'in a day', 'do not preserve locale of second moment');
  });

  it('instance localeData', function () {
    moment.defineLocale('dude', { week: { dow: 3 } });
    assertEq(moment().locale('dude').localeData()._week.dow, 3);
    moment.defineLocale('dude', null);
  });

  it('month name callback function', function () {
    function fakeReplace(m: Date, format: string): string {
      if (/test/.test(format)) {
        return 'testing';
      }
      if (getDate(m) === 1) {
        return 'date';
      }
      return 'default';
    }

    moment.locale('made-up-2', {
      months: fakeReplace,
      monthsShort: fakeReplace,
      weekdays: fakeReplace,
      weekdaysShort: fakeReplace,
      weekdaysMin: fakeReplace
    });

    assertEq(moment().format('[testing] dd ddd dddd MMM MMMM'), 'testing testing testing testing testing testing', 'format month name function should be able to access the format string');
    assertEq(moment([2011, 0, 1]).format('dd ddd dddd MMM MMMM'), 'date date date date date', 'format month name function should be able to access the moment object');
    assertEq(moment([2011, 0, 2]).format('dd ddd dddd MMM MMMM'), 'default default default default default', 'format month name function should be able to access the moment object');
  });

  // DEPRECATED
  /*it('changing parts of a locale config', function () {
    testing.expectedDeprecations('defineLocaleOverride');

    moment.locale('partial-lang', {
      months: 'a b c d e f g h i j k l'.split(' ')
    });

    assertEq(moment([2011, 0, 1]).format('MMMM'), 'a', 'should be able to set locale values when creating the localeuage');

    moment.locale('partial-lang', {
      monthsShort: 'A B C D E F G H I J K L'.split(' ')
    });

    assertEq(moment([2011, 0, 1]).format('MMMM MMM'), 'a A', 'should be able to set locale values after creating the localeuage');

    moment.defineLocale('partial-lang', null);
  });*/

  it('start/endOf week feature for first-day-is-monday locales', function () {
    moment.locale('monday-lang', {
      week: {
        dow: 1 // Monday is the first day of the week
      }
    });

    moment.locale('monday-lang');
    assertEq(moment([2013, 0, 1]).startOf('week').day(), 1, 'for locale monday-lang first day of the week should be monday');
    assertEq(moment([2013, 0, 1]).endOf('week').day(), 0, 'for locale monday-lang last day of the week should be sunday');
    moment.defineLocale('monday-lang', null);
  });

  it('meridiem parsing', function () {
    moment.locale('meridiem-parsing', {
      meridiemParse: /[bd]/i,
      isPM: function (input) {
        return input === 'b';
      }
    });

    moment.locale('meridiem-parsing');
    assertEq(moment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(), 15, 'Custom parsing of meridiem should work');
    assertEq(moment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(), 3, 'Custom parsing of meridiem should work');
    moment.defineLocale('meridiem-parsing', null);
  });

  it('invalid date formatting', function () {
    moment.locale('has-invalid', {
      invalidDate: 'KHAAAAAAAAAAAN!'
    });

    assertEq(moment.invalid().format(), 'KHAAAAAAAAAAAN!');
    assertEq(moment.invalid().format('YYYY-MM-DD'), 'KHAAAAAAAAAAAN!');
    moment.defineLocale('has-invalid', null);
  });

  it('return locale name', function () {
    var registered = moment.locale('return-this', {});

    assertEq(registered, 'return-this', 'returns the locale configured');
    moment.locale('return-this', null);
  });

  it('changing the global locale doesn\'t affect existing instances', function () {
    var mom = moment();
    moment.locale('fr');
    assertEq('en', mom.locale());
  });

  // DEPRECATED
  /*  it('setting a language on instance returns the original moment for chaining', function () {
      testing.expectedDeprecations('moment().lang()');
      var mom = moment();

      assertEq(mom.lang('fr'), mom, 'setting the language (lang) returns the original moment for chaining');
      assertEq(mom.locale('it'), mom, 'setting the language (locale) returns the original moment for chaining');
    });

    it('lang(key) changes the language of the instance', function () {
      testing.expectedDeprecations('moment().lang()');
      var m = moment().month(0);
      m.lang('fr');
      assertEq(m.locale(), 'fr', 'm.lang(key) changes instance locale');
    });*/

  it('moment#locale(false) resets to global locale', function () {
    var m = moment();

    moment.locale('fr');
    m.locale('it');

    assertEq(moment.locale(), 'fr', 'global locale is it');
    assertEq(m.locale(), 'it', 'instance locale is it');
    m.locale('');
    assertEq(m.locale(), 'fr', 'instance locale reset to global locale');
  });

  it('moment().locale with missing key doesn\'t change locale', function () {
    assertEq(moment().locale('boo').localeData(), moment.localeData(),
      'preserve global locale in case of bad locale id');
  });

  // DEPRECATED
  /*it('moment().lang with missing key doesn\'t change locale', function () {
    testing.expectedDeprecations('moment().lang()');
    assertEq(moment().lang('boo').localeData(), moment.localeData(),
      'preserve global locale in case of bad locale id');
  });*/


// TODO: Enable this after fixing pl months parse hack hack
// it('monthsParseExact', function () {
//     var locale = 'testing-months-parse-exact';

//     moment.defineLocale(locale, {
//         monthsParseExact: true,
//         months: 'A_AA_AAA_B_B B_BB  B_C_C-C_C,C2C_D_D+D_D`D*D'.split('_'),
//         monthsShort: 'E_EE_EEE_F_FF_FFF_G_GG_GGG_H_HH_HHH'.split('_')
//     });

//     assertEq(moment('A', 'MMMM', true).month(), 0, 'parse long month 0 with MMMM');
//     assertEq(moment('AA', 'MMMM', true).month(), 1, 'parse long month 1 with MMMM');
//     assertEq(moment('AAA', 'MMMM', true).month(), 2, 'parse long month 2 with MMMM');
//     assertEq(moment('B B', 'MMMM', true).month(), 4, 'parse long month 4 with MMMM');
//     assertEq(moment('BB  B', 'MMMM', true).month(), 5, 'parse long month 5 with MMMM');
//     assertEq(moment('C-C', 'MMMM', true).month(), 7, 'parse long month 7 with MMMM');
//     assertEq(moment('C,C2C', 'MMMM', true).month(), 8, 'parse long month 8 with MMMM');
//     assertEq(moment('D+D', 'MMMM', true).month(), 10, 'parse long month 10 with MMMM');
//     assertEq(moment('D`D*D', 'MMMM', true).month(), 11, 'parse long month 11 with MMMM');

//     assertEq(moment('E', 'MMM', true).month(), 0, 'parse long month 0 with MMM');
//     assertEq(moment('EE', 'MMM', true).month(), 1, 'parse long month 1 with MMM');
//     assertEq(moment('EEE', 'MMM', true).month(), 2, 'parse long month 2 with MMM');

//     assertEq(moment('A', 'MMM').month(), 0, 'non-strict parse long month 0 with MMM');
//     assertEq(moment('AA', 'MMM').month(), 1, 'non-strict parse long month 1 with MMM');
//     assertEq(moment('AAA', 'MMM').month(), 2, 'non-strict parse long month 2 with MMM');
//     assertEq(moment('E', 'MMMM').month(), 0, 'non-strict parse short month 0 with MMMM');
//     assertEq(moment('EE', 'MMMM').month(), 1, 'non-strict parse short month 1 with MMMM');
//     assertEq(moment('EEE', 'MMMM').month(), 2, 'non-strict parse short month 2 with MMMM');
// });
});
