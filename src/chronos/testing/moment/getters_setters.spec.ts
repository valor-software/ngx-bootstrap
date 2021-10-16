import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('getters and setters', () => {

  it('getters', function () {
    var a = moment([2011, 9, 12, 6, 7, 8, 9]);
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
    assertEq(a.milliseconds(), 9, 'milliseconds');
  });

  it('getters programmatic', function () {
    var a = moment([2011, 9, 12, 6, 7, 8, 9]);
    assertEq(a.get('year'), 2011, 'year');
    assertEq(a.get('month'), 9, 'month');
    assertEq(a.get('date'), 12, 'date');
    assertEq(a.get('day'), 3, 'day');
    assertEq(a.get('hour'), 6, 'hour');
    assertEq(a.get('minute'), 7, 'minute');
    assertEq(a.get('second'), 8, 'second');
    assertEq(a.get('milliseconds'), 9, 'milliseconds');

    //actual getters tested elsewhere
    assertEq(a.get('weekday'), a.weekday(), 'weekday');
    assertEq(a.get('isoWeekday'), a.isoWeekday(), 'isoWeekday');
    assertEq(a.get('week'), a.week(), 'week');
    assertEq(a.get('isoWeek'), a.isoWeek(), 'isoWeek');
    assertEq(a.get('dayOfYear'), a.dayOfYear(), 'dayOfYear');

    //getter no longer sets values when passed an object
    // assertEq(moment([2016, 0, 1]).get({ year: 2015 }).year(), 2016, 'getter no longer sets values when passed an object');
  });

// DEPRECATED
  /*it('setters plural', function () {
      var a = moment();
      testing.expectedDeprecations('years accessor', 'months accessor', 'dates accessor');

      a.years(2011);
      a.months(9);
      a.dates(12);
      a.hours(6);
      a.minutes(7);
      a.seconds(8);
      a.milliseconds(9);
      assertEq(a.years(), 2011, 'years');
      assertEq(a.months(), 9, 'months');
      assertEq(a.dates(), 12, 'dates');
      assertEq(a.days(), 3, 'days');
      assertEq(a.hours(), 6, 'hours');
      assertEq(a.minutes(), 7, 'minutes');
      assertEq(a.seconds(), 8, 'seconds');
      assertEq(a.milliseconds(), 9, 'milliseconds');
  });

  it('setters singular', function () {
      var a = moment();
      a.year(2011);
      a.month(9);
      a.date(12);
      a.hour(6);
      a.minute(7);
      a.second(8);
      a.millisecond(9);
      assertEq(a.year(), 2011, 'year');
      assertEq(a.month(), 9, 'month');
      assertEq(a.date(), 12, 'date');
      assertEq(a.day(), 3, 'day');
      assertEq(a.hour(), 6, 'hour');
      assertEq(a.minute(), 7, 'minute');
      assertEq(a.second(), 8, 'second');
      assertEq(a.millisecond(), 9, 'milliseconds');
  });*/

  it('setters', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(9);
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
    assertEq(a.milliseconds(), 9, 'milliseconds');

    // Test month() behavior. See https://github.com/timrwood/moment/pull/822
    a = moment('20130531', 'YYYYMMDD');
    a.month(3);
    assertEq(a.month(), 3, 'month edge case');
  });

/*  it('setters should handle garbage input', function () {
    var a = moment();
    a.set('year', 2011);
    a.set('month', 9);
    a.set('date', 12);
    a.set('hours', 6);
    a.set('minutes', 7);
    a.set('seconds', 8);
    a.set('milliseconds', 9);

    a.year(undefined);
    a.month('foo');
    a.date(null);
    a.day({ a: 2, b: 3 });
    a.hours('[1]');
    a.minutes(undefined);
    a.seconds(null);
    a.milliseconds(NaN);

    assertEq(a.year(), 2011, 'year - provided undefined');
    assertEq(a.month(), 9, 'month - provided null');
    assertEq(a.date(), 12, 'date - provided [1]');
    assertEq(a.day(), 3, 'day - provided Infinity');
    assertEq(a.hours(), 6, 'hour - provided new Date');
    assertEq(a.minutes(), 7, 'minute - provided {a:1,b:2}');
    assertEq(a.seconds(), 8, 'second - provided foo');
    assertEq(a.milliseconds(), 9, 'milliseconds - provided Infinity');
  });*/

  it('setter programmatic', function () {
    var a = moment();
    a.set('year', 2011);
    a.set('month', 9);
    a.set('date', 12);
    a.set('hours', 6);
    a.set('minutes', 7);
    a.set('seconds', 8);
    a.set('milliseconds', 9);
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
    assertEq(a.milliseconds(), 9, 'milliseconds');

    // Test month() behavior. See https://github.com/timrwood/moment/pull/822
    a = moment('20130531', 'YYYYMMDD');
    a.month(3);
    assertEq(a.month(), 3, 'month edge case');
  });

  it('setters programatic with weeks', function () {
    var a = moment();
    a.set('weekYear', 2001);
    a.set('week', 49);
    a.set('day', 4);

    assertEq(a.weekYear(), 2001, 'weekYear');
    assertEq(a.week(), 49, 'week');
    assertEq(a.day(), 4, 'day');

    a.set('weekday', 1);
    assertEq(a.weekday(), 1, 'weekday');
  });

  it('setters programatic with weeks ISO', function () {
    var a = moment();
    a.set('isoWeekYear', 2001);
    a.set('isoWeek', 49);
    a.set('isoWeekday', 4);

    assertEq(a.isoWeekYear(), 2001, 'isoWeekYear');
    assertEq(a.isoWeek(), 49, 'isoWeek');
    assertEq(a.isoWeekday(), 4, 'isoWeekday');
  });

  it('setters strings', function () {
    var a = moment([2012]).locale('en');
    assertEq(a.clone().day(0).day('Wednesday').day(), 3, 'day full name');
    assertEq(a.clone().day(0).day('Wed').day(), 3, 'day short name');
    assertEq(a.clone().day(0).day('We').day(), 3, 'day minimal name');
    assertEq(a.clone().day(0).day('invalid').day(), 0, 'invalid day name');
    assertEq(a.clone().month(0).month('April').month(), 3, 'month full name');
    assertEq(a.clone().month(0).month('Apr').month(), 3, 'month short name');
    assertEq(a.clone().month(0).month('invalid').month(), 0, 'invalid month name');
  });

  it('setters - falsey values', function () {
    var a = moment();
    // ensure minutes wasn't coincidentally 0 already
    a.minutes(1);
    a.minutes(0);
    assertEq(a.minutes(), 0, 'falsey value');
  });

  it('chaining setters', function () {
    var a = moment();
    a.year(2011)
      .month(9)
      .date(12)
      .hours(6)
      .minutes(7)
      .seconds(8);
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
  });

  it('setter with multiple unit values', function () {
    var a = moment();
    a.set({
      year: 2011,
      month: 9,
      date: 12,
      hours: 6,
      minutes: 7,
      seconds: 8,
      milliseconds: 9
    });
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
    assertEq(a.milliseconds(), 9, 'milliseconds');

    var c = moment([2016, 0, 1]);
    assertEq(c.set({ weekYear: 2016 }).weekYear(), 2016, 'week year correctly sets with object syntax');
    assertEq(c.set({ quarter: 3 }).quarter(), 3, 'quarter sets correctly with object syntax');
  });

  it('day setter', function () {
    var a = moment([2011, 0, 15]);
    assertEq(moment(a).day(0).date(), 9, 'set from saturday to sunday');
    assertEq(moment(a).day(6).date(), 15, 'set from saturday to saturday');
    assertEq(moment(a).day(3).date(), 12, 'set from saturday to wednesday');

    a = moment([2011, 0, 9]);
    assertEq(moment(a).day(0).date(), 9, 'set from sunday to sunday');
    assertEq(moment(a).day(6).date(), 15, 'set from sunday to saturday');
    assertEq(moment(a).day(3).date(), 12, 'set from sunday to wednesday');

    a = moment([2011, 0, 12]);
    assertEq(moment(a).day(0).date(), 9, 'set from wednesday to sunday');
    assertEq(moment(a).day(6).date(), 15, 'set from wednesday to saturday');
    assertEq(moment(a).day(3).date(), 12, 'set from wednesday to wednesday');

    assertEq(moment(a).day(-7).date(), 2, 'set from wednesday to last sunday');
    assertEq(moment(a).day(-1).date(), 8, 'set from wednesday to last saturday');
    assertEq(moment(a).day(-4).date(), 5, 'set from wednesday to last wednesday');

    assertEq(moment(a).day(7).date(), 16, 'set from wednesday to next sunday');
    assertEq(moment(a).day(13).date(), 22, 'set from wednesday to next saturday');
    assertEq(moment(a).day(10).date(), 19, 'set from wednesday to next wednesday');

    assertEq(moment(a).day(14).date(), 23, 'set from wednesday to second next sunday');
    assertEq(moment(a).day(20).date(), 29, 'set from wednesday to second next saturday');
    assertEq(moment(a).day(17).date(), 26, 'set from wednesday to second next wednesday');
  });

  it('year setter', function () {
    var a = moment([2015, 3, 15]);
    assertEq(moment(a).year(2016).format('YYYY-MM-DD'), '2016-04-15', 'set from 2015 to 2016');
    assertEq(moment(a).year(2011).format('YYYY-MM-DD'), '2011-04-15', 'set from 2015 to 2011');

    var b = moment([2012, 1, 29]);
    assertEq(moment(b).year(2017).format('YYYY-MM-DD'), '2017-02-28', 'set from last day of february on a leap year to a non leap year');
    assertEq(moment(b).year(2004).format('YYYY-MM-DD'), '2004-02-29', 'set from last day of february on a leap year to a leap year');

    var c = moment([2012, 9, 4]);
    assertEq(moment(c).year(2017).format('YYYY-MM-DD'), '2017-10-04', 'set from a random day on a leap year to a non leap year');
    assertEq(moment(c).year(2004).format('YYYY-MM-DD'), '2004-10-04', 'set from a random day on a leap year to a leap year');
  });

  it('object set ordering', function () {
    var a = moment([2016, 3, 30]);
    assertEq(a.set({ date: 31, month: 4 }).date(), 31, 'setter order automatically arranged by size');
    var b = moment([2015, 1, 28]);
    assertEq(b.set({ date: 29, year: 2016 }).format('YYYY-MM-DD'), '2016-02-29', 'year is prioritized over date');
    //check a nonexistent time in US isn't set
    var c = moment([2016, 2, 13]);
    c.set({
      hour: 2,
      minutes: 30,
      date: 14
    });
    assertEq(c.format('YYYY-MM-DDTHH:mm'), '2016-03-14T02:30', 'setting hours, minutes date puts date first allowing time set to work');
  });

  //  no no no
/*  it('string setters', function () {
    var a = moment();
    a.year('2011');
    a.month('9');
    a.date('12');
    a.hours('6');
    a.minutes('7');
    a.seconds('8');
    a.milliseconds('9');
    assertEq(a.year(), 2011, 'year');
    assertEq(a.month(), 9, 'month');
    assertEq(a.date(), 12, 'date');
    assertEq(a.day(), 3, 'day');
    assertEq(a.hours(), 6, 'hour');
    assertEq(a.minutes(), 7, 'minute');
    assertEq(a.seconds(), 8, 'second');
    assertEq(a.milliseconds(), 9, 'milliseconds');
  });*/

  // todo: use sinon
  xit('setters across DST +1', function () {
    var oldUpdateOffset = moment.updateOffset,
      // Based on a real story somewhere in America/Los_Angeles
      dstAt = moment('2014-03-09T02:00:00-08:00').parseZone(),
      m;

    // moment.updateOffset = function (mom, keepTime) {
    //   if (mom.isBefore(dstAt)) {
    //     mom.utcOffset(-8, keepTime);
    //   } else {
    //     mom.utcOffset(-7, keepTime);
    //   }
    // };

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.year(2013);
    assertEq(m.format(), '2013-03-15T00:00:00-08:00', 'year across +1');

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.month(0);
    assertEq(m.format(), '2014-01-15T00:00:00-08:00', 'month across +1');

    m = moment('2014-03-15T00:00:00-07:00').parseZone();
    m.date(1);
    assertEq(m.format(), '2014-03-01T00:00:00-08:00', 'date across +1');

    m = moment('2014-03-09T03:05:00-07:00').parseZone();
    m.hour(0);
    assertEq(m.format(), '2014-03-09T00:05:00-08:00', 'hour across +1');

    moment.updateOffset = oldUpdateOffset;
  });

  // todo: use sinon
  xit('setters across DST -1', function () {
    var oldUpdateOffset = moment.updateOffset,
      // Based on a real story somewhere in America/Los_Angeles
      dstAt = moment('2014-11-02T02:00:00-07:00').parseZone(),
      m;

    // moment.updateOffset = function (mom, keepTime) {
    //   if (mom.isBefore(dstAt)) {
    //     mom.utcOffset(-7, keepTime);
    //   } else {
    //     mom.utcOffset(-8, keepTime);
    //   }
    // };

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.year(2013);
    assertEq(m.format(), '2013-11-15T00:00:00-07:00', 'year across -1');

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.month(0);
    assertEq(m.format(), '2014-01-15T00:00:00-07:00', 'month across -1');

    m = moment('2014-11-15T00:00:00-08:00').parseZone();
    m.date(1);
    assertEq(m.format(), '2014-11-01T00:00:00-07:00', 'date across -1');

    m = moment('2014-11-02T03:30:00-08:00').parseZone();
    m.hour(0);
    assertEq(m.format(), '2014-11-02T00:30:00-07:00', 'hour across -1');

    moment.updateOffset = oldUpdateOffset;
  });
});
