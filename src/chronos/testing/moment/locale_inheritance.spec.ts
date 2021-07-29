import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';


xdescribe('locale inheritance', () => {

it('calendar', function () {
    moment.defineLocale('base-cal', {
        calendar : {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]'
        }
    });
    moment.defineLocale('child-cal', {
        parentLocale: 'base-cal',
        calendar: {
            sameDay: '[Today] HH:mm',
            nextDay: '[Tomorrow] HH:mm',
            nextWeek: '[Next week] HH:mm'
        }
    });

    moment.locale('child-cal');
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
    moment.defineLocale('base-cal-2', {
        calendar: {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: '[Next week at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last week at] HH:mm',
            sameElse: '[whatever]'
        }
    });
    moment.defineLocale('child-cal-2', {
        parentLocale: 'base-cal-2'
    });
    moment.locale('child-cal-2');
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
    moment.defineLocale('base-ldf', {
        longDateFormat : {
            LTS  : 'h:mm:ss A',
            LT   : 'h:mm A',
            L    : 'MM/DD/YYYY',
            LL   : 'MMMM D, YYYY',
            LLL  : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        }
    });
    moment.defineLocale('child-ldf', {
        parentLocale: 'base-ldf',
        longDateFormat: {
            LLL  : '[child] MMMM D, YYYY h:mm A',
            LLLL : '[child] dddd, MMMM D, YYYY h:mm A'
        }
    });

    moment.locale('child-ldf');
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
    moment.defineLocale('base-ordinal-1', {
        ordinal : '%dx'
    });
    moment.defineLocale('child-ordinal-1', {
        parentLocale: 'base-ordinal-1',
        ordinal : '%dy'
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string');

    moment.defineLocale('base-ordinal-2', {
        ordinal : '%dx'
    });
    moment.defineLocale('child-ordinal-2', {
        parentLocale: 'base-ordinal-2',
        ordinal : function (num) {
            return num + 'y';
        }
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child function');

    moment.defineLocale('base-ordinal-3', {
        ordinal : function (num) {
            return num + 'x';
        }
    });
    moment.defineLocale('child-ordinal-3', {
        parentLocale: 'base-ordinal-3',
        ordinal : '%dy'
    });

    assertEq(moment.utc('2015-02-03', moment.ISO_8601).format('Do'), '3y', 'ordinal uses child string (overwrite parent function)');
});

it('ordinal parse', function () {
    moment.defineLocale('base-ordinal-parse-1', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.defineLocale('child-ordinal-parse-1', {
        parentLocale: 'base-ordinal-parse-1',
        dayOfMonthOrdinalParse : /\d{1,2}y/
    });

    assertOk(moment.utc('2015-01-1y', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child');

    moment.defineLocale('base-ordinal-parse-2', {
        dayOfMonthOrdinalParse : /\d{1,2}x/
    });
    moment.defineLocale('child-ordinal-parse-2', {
        parentLocale: 'base-ordinal-parse-2',
        dayOfMonthOrdinalParse : /\d{1,2}/
    });

    assertOk(moment.utc('2015-01-1', 'YYYY-MM-Do', true).isValid(), 'ordinal parse uses child (default)');
});

it('months', function () {
    moment.defineLocale('base-months', {
        months : 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split('_')
    });
    moment.defineLocale('child-months', {
        parentLocale: 'base-months',
        months : 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth '.split('_')
    });
    assertEq(moment.utc('2015-01-01', 'YYYY-MM-DD').format('MMMM'), 'First', 'months uses child');
});

it('define child locale before parent', function () {
    moment.defineLocale('months-x', null);
    moment.defineLocale('base-months-x', null);

    moment.defineLocale('months-x', {
        parentLocale: 'base-months-x',
        months : 'First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth '.split('_')
    });
    assertEq(moment.locale(), 'en', 'failed to set a locale requiring missing parent');
    moment.defineLocale('base-months-x', {
        months : 'One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve'.split('_')
    });
    assertEq(moment.locale(), 'base-months-x', 'defineLocale should also set the locale (regardless of child locales)');

    assertEq(moment().locale('months-x').month(0).format('MMMM'), 'First', 'loading child before parent locale works');
});
});
