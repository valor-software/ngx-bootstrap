import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

xdescribe('calendar', () => {

it('passing a function', function () {
    var a  = moment().hours(13).minutes(0).seconds(0);
    assertEq(moment(a).calendar(null, {
        sameDay: function () {
            return 'h:mmA';
        }
    }), '1:00PM', 'should equate');
});

// https://stackoverflow.com/questions/34575750/how-to-stub-exported-function-in-es6
it('extending calendar options', function () {
    var calendarFormat = moment.calendarFormat;

    moment.calendarFormat = function (myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        var nextMonth = now.clone().add(1, 'month');

        var retVal =  diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' :
            (myMoment.month() === now.month() && myMoment.year() === now.year()) ? 'thisMonth' :
            (nextMonth.month() === myMoment.month() && nextMonth.year() === myMoment.year()) ? 'nextMonth' : 'sameElse';
        return retVal;
    };

    moment.updateLocale('en', {
        calendar : {
                sameDay : '[Today at] LT',
                nextDay : '[Tomorrow at] LT',
                nextWeek : 'dddd [at] LT',
                lastDay : '[Yesterday at] LT',
                lastWeek : '[Last] dddd [at] LT',
                thisMonth : '[This month on the] Do',
                nextMonth : '[Next month on the] Do',
                sameElse : 'L'
            }
    });
    var a = moment('2016-01-01').add(28, 'days');
    var b = moment('2016-01-01').add(1, 'month');
    try {
        assertEq(a.calendar('2016-01-01'), 'This month on the 29th', 'Ad hoc calendar format for this month');
        assertEq(b.calendar('2016-01-01'), 'Next month on the 1st', 'Ad hoc calendar format for next month');
        assertEq(a.locale('fr').calendar('2016-01-01'), a.locale('fr').format('L'), 'French falls back to default because thisMonth is not defined in that locale');
    } finally {
        moment.calendarFormat = calendarFormat;
        moment.updateLocale('en', null);
    }
});
});
