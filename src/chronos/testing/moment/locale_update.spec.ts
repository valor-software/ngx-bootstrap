import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

xdescribe('locale update', () => {

  it('calendar', function () {
    moment.defineLocale('cal', null);
    moment.defineLocale('cal', {
      calendar: {
        sameDay: '[Today at] HH:mm',
        nextDay: '[Tomorrow at] HH:mm',
        nextWeek: '[Next week at] HH:mm',
        lastDay: '[Yesterday at] HH:mm',
        lastWeek: '[Last week at] HH:mm',
        sameElse: '[whatever]'
      }
    });
    moment.updateLocale('cal', {
      calendar: {
        sameDay: '[Today] HH:mm',
        nextDay: '[Tomorrow] HH:mm',
        nextWeek: '[Next week] HH:mm'
      }
    });

    moment.locale('cal');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assertEq(anchor.clone().add(3, 'hours').calendar(anchor), 'Today 15:00', 'today uses child version');
    assertEq(anchor.clone().add(1, 'day').calendar(anchor), 'Tomorrow 12:00', 'tomorrow uses child version');
    assertEq(anchor.clone().add(3, 'days').calendar(anchor), 'Next week 12:00', 'next week uses child version');

    assertEq(anchor.clone().subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assertEq(anchor.clone().subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assertEq(anchor.clone().subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assertEq(anchor.clone().add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
  });

  it('missing', function () {
    moment.defineLocale('cal-2', null);
    moment.defineLocale('cal-2', {
      calendar: {
        sameDay: '[Today at] HH:mm',
        nextDay: '[Tomorrow at] HH:mm',
        nextWeek: '[Next week at] HH:mm',
        lastDay: '[Yesterday at] HH:mm',
        lastWeek: '[Last week at] HH:mm',
        sameElse: '[whatever]'
      }
    });
    moment.updateLocale('cal-2', {});
    moment.locale('cal-2');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assertEq(anchor.clone().add(3, 'hours').calendar(anchor), 'Today at 15:00', 'today uses parent version');
    assertEq(anchor.clone().add(1, 'day').calendar(anchor), 'Tomorrow at 12:00', 'tomorrow uses parent version');
    assertEq(anchor.clone().add(3, 'days').calendar(anchor), 'Next week at 12:00', 'next week uses parent version');
    assertEq(anchor.clone().subtract(1, 'day').calendar(anchor), 'Yesterday at 12:00', 'yesterday uses parent version');
    assertEq(anchor.clone().subtract(3, 'days').calendar(anchor), 'Last week at 12:00', 'last week uses parent version');
    assertEq(anchor.clone().subtract(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version -');
    assertEq(anchor.clone().add(7, 'days').calendar(anchor), 'whatever', 'sameElse uses parent version +');
  });

// Test function vs obj both directions

  it('long date format', function () {
    moment.defineLocale('ldf', null);
    moment.defineLocale('ldf', {
      longDateFormat: {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
      }
    });
    moment.updateLocale('ldf', {
      longDateFormat: {
        LLL: '[child] MMMM D, YYYY h:mm A',
        LLLL: '[child] dddd, MMMM D, YYYY h:mm A'
      }
    });

    moment.locale('ldf');
    var anchor = moment.utc('2015-09-06T12:34:56', moment.ISO_8601);
    assertEq(anchor.format('LTS'), '12:34:56 PM', 'LTS uses base');
    assertEq(anchor.format('LT'), '12:34 PM', 'LT uses base');
    assertEq(anchor.format('L'), '09/06/2015', 'L uses base');
    assertEq(anchor.format('l'), '9/6/2015', 'l uses base');
    assertEq(anchor.format('LL'), 'September 6, 2015', 'LL uses base');
    assertEq(anchor.format('ll'), 'Sep 6, 2015', 'll uses base');
    assertEq(anchor.format('LLL'), 'child September 6, 2015 12:34 PM', 'LLL uses child');
    assertEq(anchor.format('lll'), 'child Sep 6, 2015 12:34 PM', 'lll uses child');
    assertEq(anchor.format('LLLL'), 'child Sunday, September 6, 2015 12:34 PM', 'LLLL uses child');
    assertEq(anchor.format('llll'), 'child Sun, Sep 6, 2015 12:34 PM', 'llll uses child');
  });

  it('ordinal', function () {
    moment.defineLocale('ordinal-1', null);
    moment.defineLocale('ordinal-1', {
      ordinal: '%dx'
    });
    moment.updateLocale('ordinal-1', {
      ordinal: '%dy'
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string');

    moment.defineLocale('ordinal-2', null);
    moment.defineLocale('ordinal-2', {
      ordinal: '%dx'
    });
    moment.updateLocale('ordinal-2', {
      ordinal: function (num) {
        return num + 'y';
      }
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child function');

    moment.defineLocale('ordinal-3', null);
    moment.defineLocale('ordinal-3', {
      ordinal: function (num) {
        return num + 'x';
      }
    });
    moment.updateLocale('ordinal-3', {
      ordinal: '%dy'
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string (overwrite parent function)');
  });

  it('ordinal parse', function () {
    moment.defineLocale('ordinal-parse-1', null);
    moment.defineLocale('ordinal-parse-1', {
      dayOfMonthOrdinalParse: /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-1', {
      dayOfMonthOrdinalParse: /\d{1,2}y/
    });

    assertOk(moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child');

    moment.defineLocale('ordinal-parse-2', null);
    moment.defineLocale('ordinal-parse-2', {
      dayOfMonthOrdinalParse: /\d{1,2}x/
    });
    moment.updateLocale('ordinal-parse-2', {
      dayOfMonthOrdinalParse: /\d{1,2}/
    });

    assertOk(moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child (default)');
  });

  it('months', function () {
    moment.defineLocale('months', null);
    moment.defineLocale('months', {
      months: 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split('_')
    });
    moment.updateLocale('months', {
      parentLocale: 'base-months',
      months: 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth '.split('_')
    });
    assertEq(moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'), 'First', 'months uses child');
  });

  it('update existing locale', function () {
    moment.updateLocale('de', {
      monthsShort: ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']
    });
    assertEq(moment('2017-02-01').format('YYYY MMM MMMM'), '2017 FEB Februar');
    moment.updateLocale('de', null);
  });
});
