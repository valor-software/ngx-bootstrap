import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('add and subtract', () => {

  it('add short reverse args', function () {
    var a = moment(), b, c, d;
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add({ ms: 50 }).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add({ s: 1 }).seconds(), 9, 'Add seconds');
    assertEq(a.add({ m: 1 }).minutes(), 8, 'Add minutes');
    assertEq(a.add({ h: 1 }).hours(), 7, 'Add hours');
    assertEq(a.add({ d: 1 }).date(), 13, 'Add date');
    assertEq(a.add({ w: 1 }).date(), 20, 'Add week');
    assertEq(a.add({ M: 1 }).month(), 10, 'Add month');
    assertEq(a.add({ y: 1 }).year(), 2012, 'Add year');
    assertEq(a.add({ Q: 1 }).month(), 1, 'Add quarter');

    b = moment([2010, 0, 31]).add({ M: 1 });
    c = moment([2010, 1, 28]).subtract({ M: 1 });
    d = moment([2010, 1, 28]).subtract({ Q: 1 });

    assertEq(b.month(), 1, 'add month, jan 31st to feb 28th');
    assertEq(b.date(), 28, 'add month, jan 31st to feb 28th');
    assertEq(c.month(), 0, 'subtract month, feb 28th to jan 28th');
    assertEq(c.date(), 28, 'subtract month, feb 28th to jan 28th');
    assertEq(d.month(), 10, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    assertEq(d.date(), 28, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    assertEq(d.year(), 2009, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
  });

  it('add long reverse args', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add({ milliseconds: 50 }).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add({ seconds: 1 }).seconds(), 9, 'Add seconds');
    assertEq(a.add({ minutes: 1 }).minutes(), 8, 'Add minutes');
    assertEq(a.add({ hours: 1 }).hours(), 7, 'Add hours');
    assertEq(a.add({ days: 1 }).date(), 13, 'Add date');
    assertEq(a.add({ weeks: 1 }).date(), 20, 'Add week');
    assertEq(a.add({ months: 1 }).month(), 10, 'Add month');
    assertEq(a.add({ years: 1 }).year(), 2012, 'Add year');
    assertEq(a.add({ quarters: 1 }).month(), 1, 'Add quarter');
  });

  it('add long singular reverse args', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add({ millisecond: 50 }).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add({ second: 1 }).seconds(), 9, 'Add seconds');
    assertEq(a.add({ minute: 1 }).minutes(), 8, 'Add minutes');
    assertEq(a.add({ hour: 1 }).hours(), 7, 'Add hours');
    assertEq(a.add({ day: 1 }).date(), 13, 'Add date');
    assertEq(a.add({ week: 1 }).date(), 20, 'Add week');
    assertEq(a.add({ month: 1 }).month(), 10, 'Add month');
    assertEq(a.add({ year: 1 }).year(), 2012, 'Add year');
    assertEq(a.add({ quarter: 1 }).month(), 1, 'Add quarter');
  });

  /* DEPRECATED
  it('add string long reverse args', function () {
    var a = moment(), b;

    testing.expectedDeprecations('moment().add(period, number)');

    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    b = a.clone();

    assertEq(a.add('millisecond', 50).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add('second', 1).seconds(), 9, 'Add seconds');
    assertEq(a.add('minute', 1).minutes(), 8, 'Add minutes');
    assertEq(a.add('hour', 1).hours(), 7, 'Add hours');
    assertEq(a.add('day', 1).date(), 13, 'Add date');
    assertEq(a.add('week', 1).date(), 20, 'Add week');
    assertEq(a.add('month', 1).month(), 10, 'Add month');
    assertEq(a.add('year', 1).year(), 2012, 'Add year');
    assertEq(b.add('day', '01').date(), 13, 'Add date');
    assertEq(a.add('quarter', 1).month(), 1, 'Add quarter');
  });

  it('add string long singular reverse args', function () {
    var a = moment(), b;

    testing.expectedDeprecations('moment().add(period, number)');

    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    b = a.clone();

    assertEq(a.add('milliseconds', 50).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add('seconds', 1).seconds(), 9, 'Add seconds');
    assertEq(a.add('minutes', 1).minutes(), 8, 'Add minutes');
    assertEq(a.add('hours', 1).hours(), 7, 'Add hours');
    assertEq(a.add('days', 1).date(), 13, 'Add date');
    assertEq(a.add('weeks', 1).date(), 20, 'Add week');
    assertEq(a.add('months', 1).month(), 10, 'Add month');
    assertEq(a.add('years', 1).year(), 2012, 'Add year');
    assertEq(b.add('days', '01').date(), 13, 'Add date');
    assertEq(a.add('quarters', 1).month(), 1, 'Add quarter');
  });

  it('add string short reverse args', function () {
    var a = moment();
    testing.expectedDeprecations('moment().add(period, number)');

    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add('ms', 50).milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add('s', 1).seconds(), 9, 'Add seconds');
    assertEq(a.add('m', 1).minutes(), 8, 'Add minutes');
    assertEq(a.add('h', 1).hours(), 7, 'Add hours');
    assertEq(a.add('d', 1).date(), 13, 'Add date');
    assertEq(a.add('w', 1).date(), 20, 'Add week');
    assertEq(a.add('M', 1).month(), 10, 'Add month');
    assertEq(a.add('y', 1).year(), 2012, 'Add year');
    assertEq(a.add('Q', 1).month(), 1, 'Add quarter');
  });*/

  it('add string long', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add(50, 'millisecond').milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add(1, 'second').seconds(), 9, 'Add seconds');
    assertEq(a.add(1, 'minute').minutes(), 8, 'Add minutes');
    assertEq(a.add(1, 'hour').hours(), 7, 'Add hours');
    assertEq(a.add(1, 'day').date(), 13, 'Add date');
    assertEq(a.add(1, 'week').date(), 20, 'Add week');
    assertEq(a.add(1, 'month').month(), 10, 'Add month');
    assertEq(a.add(1, 'year').year(), 2012, 'Add year');
    assertEq(a.add(1, 'quarter').month(), 1, 'Add quarter');
  });

  it('add string long singular', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add(50, 'milliseconds').milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add(1, 'seconds').seconds(), 9, 'Add seconds');
    assertEq(a.add(1, 'minutes').minutes(), 8, 'Add minutes');
    assertEq(a.add(1, 'hours').hours(), 7, 'Add hours');
    assertEq(a.add(1, 'days').date(), 13, 'Add date');
    assertEq(a.add(1, 'weeks').date(), 20, 'Add week');
    assertEq(a.add(1, 'months').month(), 10, 'Add month');
    assertEq(a.add(1, 'years').year(), 2012, 'Add year');
    assertEq(a.add(1, 'quarters').month(), 1, 'Add quarter');
  });

  it('add string short', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add(50, 'ms').milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add(1, 's').seconds(), 9, 'Add seconds');
    assertEq(a.add(1, 'm').minutes(), 8, 'Add minutes');
    assertEq(a.add(1, 'h').hours(), 7, 'Add hours');
    assertEq(a.add(1, 'd').date(), 13, 'Add date');
    assertEq(a.add(1, 'w').date(), 20, 'Add week');
    assertEq(a.add(1, 'M').month(), 10, 'Add month');
    assertEq(a.add(1, 'y').year(), 2012, 'Add year');
    assertEq(a.add(1, 'Q').month(), 1, 'Add quarter');
  });

  // DEPRECATED
  /*it('add strings string short reversed', function () {
    var a = moment();
    testing.expectedDeprecations('moment().add(period, number)');

    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add('ms', '50').milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add('s', '1').seconds(), 9, 'Add seconds');
    assertEq(a.add('m', '1').minutes(), 8, 'Add minutes');
    assertEq(a.add('h', '1').hours(), 7, 'Add hours');
    assertEq(a.add('d', '1').date(), 13, 'Add date');
    assertEq(a.add('w', '1').date(), 20, 'Add week');
    assertEq(a.add('M', '1').month(), 10, 'Add month');
    assertEq(a.add('y', '1').year(), 2012, 'Add year');
    assertEq(a.add('Q', '1').month(), 1, 'Add quarter');
  });

  it('subtract strings string short reversed', function () {
    var a = moment();
    testing.expectedDeprecations('moment().subtract(period, number)');

    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.subtract('ms', '50').milliseconds(), 450, 'Subtract milliseconds');
    assertEq(a.subtract('s', '1').seconds(), 7, 'Subtract seconds');
    assertEq(a.subtract('m', '1').minutes(), 6, 'Subtract minutes');
    assertEq(a.subtract('h', '1').hours(), 5, 'Subtract hours');
    assertEq(a.subtract('d', '1').date(), 11, 'Subtract date');
    assertEq(a.subtract('w', '1').date(), 4, 'Subtract week');
    assertEq(a.subtract('M', '1').month(), 8, 'Subtract month');
    assertEq(a.subtract('y', '1').year(), 2010, 'Subtract year');
    assertEq(a.subtract('Q', '1').month(), 5, 'Subtract quarter');
  });*/

  it('add strings string short', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add('50', 'ms').milliseconds(), 550, 'Add milliseconds');
    assertEq(a.add('1', 's').seconds(), 9, 'Add seconds');
    assertEq(a.add('1', 'm').minutes(), 8, 'Add minutes');
    assertEq(a.add('1', 'h').hours(), 7, 'Add hours');
    assertEq(a.add('1', 'd').date(), 13, 'Add date');
    assertEq(a.add('1', 'w').date(), 20, 'Add week');
    assertEq(a.add('1', 'M').month(), 10, 'Add month');
    assertEq(a.add('1', 'y').year(), 2012, 'Add year');
    assertEq(a.add('1', 'Q').month(), 1, 'Add quarter');
  });

  it('add no string with milliseconds default', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.add(50).milliseconds(), 550, 'Add milliseconds');
  });

  it('subtract strings string short', function () {
    var a = moment();
    a.year(2011);
    a.month(9);
    a.date(12);
    a.hours(6);
    a.minutes(7);
    a.seconds(8);
    a.milliseconds(500);

    assertEq(a.subtract('50', 'ms').milliseconds(), 450, 'Subtract milliseconds');
    assertEq(a.subtract('1', 's').seconds(), 7, 'Subtract seconds');
    assertEq(a.subtract('1', 'm').minutes(), 6, 'Subtract minutes');
    assertEq(a.subtract('1', 'h').hours(), 5, 'Subtract hours');
    assertEq(a.subtract('1', 'd').date(), 11, 'Subtract date');
    assertEq(a.subtract('1', 'w').date(), 4, 'Subtract week');
    assertEq(a.subtract('1', 'M').month(), 8, 'Subtract month');
    assertEq(a.subtract('1', 'y').year(), 2010, 'Subtract year');
    assertEq(a.subtract('1', 'Q').month(), 5, 'Subtract quarter');
  });

  it('add across DST', function () {
    // Detect Safari bug and bail. Hours on 13th March 2011 are shifted
    // with 1 ahead.
    if (new Date(2011, 2, 13, 5, 0, 0).getHours() !== 5) {
      expect(0);
      return;
    }

    var a = moment(new Date(2011, 2, 12, 5, 0, 0)),
      b = moment(new Date(2011, 2, 12, 5, 0, 0)),
      c = moment(new Date(2011, 2, 12, 5, 0, 0)),
      d = moment(new Date(2011, 2, 12, 5, 0, 0)),
      e = moment(new Date(2011, 2, 12, 5, 0, 0));
    a.add(1, 'days');
    b.add(24, 'hours');
    c.add(1, 'months');
    e.add(1, 'quarter');

    assertEq(a.hours(), 5, 'adding days over DST difference should result in the same hour');
    if (b.isDST() && !d.isDST()) {
      assertEq(b.hours(), 6, 'adding hours over DST difference should result in a different hour');
    } else if (!b.isDST() && d.isDST()) {
      assertEq(b.hours(), 4, 'adding hours over DST difference should result in a different hour');
    } else {
      assertEq(b.hours(), 5, 'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time');
    }
    assertEq(c.hours(), 5, 'adding months over DST difference should result in the same hour');
    assertEq(e.hours(), 5, 'adding quarters over DST difference should result in the same hour');
  });

  it('add decimal values of days and months', function () {
    assertEq(moment([2016, 3, 3]).add(1.5, 'days').date(), 5, 'adding 1.5 days is rounded to adding 2 day');
    assertEq(moment([2016, 3, 3]).add(-1.5, 'days').date(), 1, 'adding -1.5 days is rounded to adding -2 day');
    assertEq(moment([2016, 3, 1]).add(-1.5, 'days').date(), 30, 'adding -1.5 days on first of month wraps around');
    assertEq(moment([2016, 3, 3]).add(1.5, 'months').month(), 5, 'adding 1.5 months adds 2 months');
    assertEq(moment([2016, 3, 3]).add(-1.5, 'months').month(), 1, 'adding -1.5 months adds -2 months');
    assertEq(moment([2016, 0, 3]).add(-1.5, 'months').month(), 10, 'adding -1.5 months at start of year wraps back');
    assertEq(moment([2016, 3, 3]).subtract(1.5, 'days').date(), 1, 'subtract 1.5 days is rounded to subtract 2 day');
    assertEq(moment([2016, 3, 2]).subtract(1.5, 'days').date(), 31, 'subtract 1.5 days subtracts 2 days');
    assertEq(moment([2016, 1, 1]).subtract(1.1, 'days').date(), 31, 'subtract 1.1 days wraps to previous month');
    assertEq(moment([2016, 3, 3]).subtract(-1.5, 'days').date(), 5, 'subtract -1.5 days is rounded to subtract -2 day');
    assertEq(moment([2016, 3, 30]).subtract(-1.5, 'days').date(), 2, 'subtract -1.5 days on last of month wraps around');
    assertEq(moment([2016, 3, 3]).subtract(1.5, 'months').month(), 1, 'subtract 1.5 months subtract 2 months');
    assertEq(moment([2016, 3, 3]).subtract(-1.5, 'months').month(), 5, 'subtract -1.5 months subtract -2 month');
    assertEq(moment([2016, 11, 31]).subtract(-1.5, 'months').month(), 1, 'subtract -1.5 months at end of year wraps back');
    assertEq(moment([2016, 0, 1]).add(1.5, 'years').format('YYYY-MM-DD'), '2017-07-01', 'add 1.5 years adds 1 year six months');
    assertEq(moment([2016, 0, 1]).add(1.6, 'years').format('YYYY-MM-DD'), '2017-08-01', 'add 1.6 years becomes 1.6*12 = 19.2, round, 19 months');
    assertEq(moment([2016, 0, 1]).add(1.1, 'quarters').format('YYYY-MM-DD'), '2016-04-01', 'add 1.1 quarters 1.1*3=3.3, round, 3 months');
  });
});
