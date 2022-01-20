import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';


describe('start and end of units', () => {

  it('start of year', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('y');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 0, 'strip out the month');
    assertEq(m.date(), 1, 'strip out the day');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of year', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('y');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 11, 'set the month');
    assertEq(m.date(), 31, 'set the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of quarter', function () {
    var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarter'),
      ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('quarters'),
      ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).startOf('Q');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.quarter(), 2, 'keep the quarter');
    assertEq(m.month(), 3, 'strip out the month');
    assertEq(m.date(), 1, 'strip out the day');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of quarter', function () {
    var m = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarter'),
      ms = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('quarters'),
      ma = moment(new Date(2011, 4, 2, 3, 4, 5, 6)).endOf('Q');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.quarter(), 2, 'keep the quarter');
    assertEq(m.month(), 5, 'set the month');
    assertEq(m.date(), 30, 'set the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of month', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('M');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 1, 'strip out the day');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of month', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('M');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 28, 'set the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of week', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('w');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 0, 'rolls back to January');
    //assertEq(m.day(), 0, 'set day of week');
    //assertEq(m.date(), 30, 'set correct date');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of week', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    //assertEq(m.day(), 6, 'set the day of the week');
    //assertEq(m.date(), 5, 'set the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of iso-week', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeek'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('isoWeeks'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('W');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 0, 'rollback to January');
    assertEq(m.isoWeekday(), 1, 'set day of iso-week');
    assertEq(m.date(), 31, 'set correct date');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of iso-week', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeek'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('isoWeeks'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('W');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.isoWeekday(), 7, 'set the day of the week');
    assertEq(m.date(), 6, 'set the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of day', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('d');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of day', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('d');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of date', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('date'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('dates');

    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 0, 'strip out the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of date', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('date'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('dates');

    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 23, 'set the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });


  it('start of hour', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('h');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 0, 'strip out the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of hour', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('h');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 59, 'set the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of minute', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('m');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 4, 'keep the minutes');
    assertEq(m.seconds(), 0, 'strip out the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of minute', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('m');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 4, 'keep the minutes');
    assertEq(m.seconds(), 59, 'set the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  it('start of second', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('s');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 4, 'keep the minutes');
    assertEq(m.seconds(), 5, 'keep the the seconds');
    assertEq(m.milliseconds(), 0, 'strip out the milliseconds');
  });

  it('end of second', function () {
    var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second'),
      ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds'),
      ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('s');
    assertEq(+m, +ms, 'Plural or singular should work');
    assertEq(+m, +ma, 'Full or abbreviated should work');
    assertEq(m.year(), 2011, 'keep the year');
    assertEq(m.month(), 1, 'keep the month');
    assertEq(m.date(), 2, 'keep the day');
    assertEq(m.hours(), 3, 'keep the hours');
    assertEq(m.minutes(), 4, 'keep the minutes');
    assertEq(m.seconds(), 5, 'keep the seconds');
    assertEq(m.milliseconds(), 999, 'set the seconds');
  });

  // todo: use sinon
  xit('startOf across DST +1', function () {
    var oldUpdateOffset = moment.updateOffset,
      // Based on a real story somewhere in America/Los_Angeles
      dstAt = moment('2014-03-09T02:00:00-08:00').parseZone(),
      m;

    moment.updateOffset = function (mom, keepTime) {
      if (mom.isBefore(dstAt)) {
        mom.utcOffset(-8, keepTime);
      } else {
        mom.utcOffset(-7, keepTime);
      }
    };

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.startOf('y');
    assertEq(m.format(), '2014-01-01T00:00:00-08:00', 'startOf(\'year\') across +1');

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.startOf('M');
    assertEq(m.format(), '2014-03-01T00:00:00-08:00', 'startOf(\'month\') across +1');

    m = moment('2014-03-09T09:00:00-07:00').parseZone();
    m.startOf('d');
    assertEq(m.format(), '2014-03-09T00:00:00-08:00', 'startOf(\'day\') across +1');

    m = moment('2014-03-09T03:05:00-07:00').parseZone();
    m.startOf('h');
    assertEq(m.format(), '2014-03-09T03:00:00-07:00', 'startOf(\'hour\') after +1');

    m = moment('2014-03-09T01:35:00-08:00').parseZone();
    m.startOf('h');
    assertEq(m.format(), '2014-03-09T01:00:00-08:00', 'startOf(\'hour\') before +1');

    // There is no such time as 2:30-7 to try startOf('hour') across that

    moment.updateOffset = oldUpdateOffset;
  });

  // todo: sinon
  xit('startOf across DST -1', function () {
    var oldUpdateOffset = moment.updateOffset,
      // Based on a real story somewhere in America/Los_Angeles
      dstAt = moment('2014-11-02T02:00:00-07:00').parseZone(),
      m;

    moment.updateOffset = function (mom, keepTime) {
      if (mom.isBefore(dstAt)) {
        mom.utcOffset(-7, keepTime);
      } else {
        mom.utcOffset(-8, keepTime);
      }
    };

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.startOf('y');
    assertEq(m.format(), '2014-01-01T00:00:00-07:00', 'startOf(\'year\') across -1');

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.startOf('M');
    assertEq(m.format(), '2014-11-01T00:00:00-07:00', 'startOf(\'month\') across -1');

    m = moment('2014-11-02T09:00:00-08:00').parseZone();
    m.startOf('d');
    assertEq(m.format(), '2014-11-02T00:00:00-07:00', 'startOf(\'day\') across -1');

    // note that utc offset is -8
    m = moment('2014-11-02T01:30:00-08:00').parseZone();
    m.startOf('h');
    assertEq(m.format(), '2014-11-02T01:00:00-08:00', 'startOf(\'hour\') after +1');

    // note that utc offset is -7
    m = moment('2014-11-02T01:30:00-07:00').parseZone();
    m.startOf('h');
    assertEq(m.format(), '2014-11-02T01:00:00-07:00', 'startOf(\'hour\') before +1');

    moment.updateOffset = oldUpdateOffset;
  });

  it('endOf millisecond and no-arg', function () {
    var m = moment();
    assertEq(+m, +m.clone().endOf(), 'endOf without argument should change time');
    assertEq(+m, +m.clone().endOf('ms'), 'endOf with ms argument should change time');
    assertEq(+m, +m.clone().endOf('millisecond'), 'endOf with millisecond argument should change time');
    assertEq(+m, +m.clone().endOf('milliseconds'), 'endOf with milliseconds argument should change time');
  });
});
