import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

function equal(a, b, message) {
  assertOk(Math.abs(a - b) < 0.00000001, '(' + a + ' === ' + b + ') ' + message);
}

function dstForYear(year) {
  var start = moment([year]),
    end = moment([year + 1]),
    current = start.clone(),
    last;

  while (current < end) {
    last = current.clone();
    current.add(24, 'hour');
    if (last.utcOffset() !== current.utcOffset()) {
      end = current.clone();
      current = last.clone();
      break;
    }
  }

  while (current < end) {
    last = current.clone();
    current.add(1, 'hour');
    if (last.utcOffset() !== current.utcOffset()) {
      return {
        moment: last,
        diff: -(current.utcOffset() - last.utcOffset()) / 60
      };
    }
  }
}

describe('diff', () => {

  it('diff', function () {
    assertEq(moment(1000).diff(0), 1000, '1 second - 0 = 1000');
    assertEq(moment(1000).diff(500), 500, '1 second - 0.5 seconds = 500');
    assertEq(moment(0).diff(1000), -1000, '0 - 1 second = -1000');
    assertEq(moment(new Date(1000)).diff(1000), 0, '1 second - 1 second = 0');
    var oneHourDate = new Date(2015, 5, 21),
      nowDate = new Date(+oneHourDate);
    oneHourDate.setHours(oneHourDate.getHours() + 1);
    assertEq(moment(oneHourDate).diff(nowDate), 60 * 60 * 1000, '1 hour from now = 3600000');
  });

  it('diff key after', function () {
    assertEq(moment([2010]).diff([2011], 'years'), -1, 'year diff');
    assertEq(moment([2010]).diff([2010, 2], 'months'), -2, 'month diff');
    assertEq(moment([2010]).diff([2010, 0, 7], 'weeks'), 0, 'week diff');
    assertEq(moment([2010]).diff([2010, 0, 8], 'weeks'), -1, 'week diff');
    assertEq(moment([2010]).diff([2010, 0, 21], 'weeks'), -2, 'week diff');
    assertEq(moment([2010]).diff([2010, 0, 22], 'weeks'), -3, 'week diff');
    assertEq(moment([2010]).diff([2010, 0, 4], 'days'), -3, 'day diff');
    assertEq(moment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, 'hour diff');
    assertEq(moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, 'minute diff');
    assertEq(moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, 'second diff');
  });

  it('diff key before', function () {
    assertEq(moment([2011]).diff([2010], 'years'), 1, 'year diff');
    assertEq(moment([2010, 2]).diff([2010], 'months'), 2, 'month diff');
    assertEq(moment([2010, 0, 4]).diff([2010], 'days'), 3, 'day diff');
    assertEq(moment([2010, 0, 7]).diff([2010], 'weeks'), 0, 'week diff');
    assertEq(moment([2010, 0, 8]).diff([2010], 'weeks'), 1, 'week diff');
    assertEq(moment([2010, 0, 21]).diff([2010], 'weeks'), 2, 'week diff');
    assertEq(moment([2010, 0, 22]).diff([2010], 'weeks'), 3, 'week diff');
    assertEq(moment([2010, 0, 1, 4]).diff([2010], 'hours'), 4, 'hour diff');
    assertEq(moment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'), 5, 'minute diff');
    assertEq(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'), 6, 'second diff');
  });

  it('diff key before singular', function () {
    assertEq(moment([2011]).diff([2010], 'year'), 1, 'year diff singular');
    assertEq(moment([2010, 2]).diff([2010], 'month'), 2, 'month diff singular');
    assertEq(moment([2010, 0, 4]).diff([2010], 'day'), 3, 'day diff singular');
    assertEq(moment([2010, 0, 7]).diff([2010], 'week'), 0, 'week diff singular');
    assertEq(moment([2010, 0, 8]).diff([2010], 'week'), 1, 'week diff singular');
    assertEq(moment([2010, 0, 21]).diff([2010], 'week'), 2, 'week diff singular');
    assertEq(moment([2010, 0, 22]).diff([2010], 'week'), 3, 'week diff singular');
    assertEq(moment([2010, 0, 1, 4]).diff([2010], 'hour'), 4, 'hour diff singular');
    assertEq(moment([2010, 0, 1, 0, 5]).diff([2010], 'minute'), 5, 'minute diff singular');
    assertEq(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'second'), 6, 'second diff singular');
  });

  it('diff key before abbreviated', function () {
    assertEq(moment([2011]).diff([2010], 'y'), 1, 'year diff abbreviated');
    assertEq(moment([2010, 2]).diff([2010], 'M'), 2, 'month diff abbreviated');
    assertEq(moment([2010, 0, 4]).diff([2010], 'd'), 3, 'day diff abbreviated');
    assertEq(moment([2010, 0, 7]).diff([2010], 'w'), 0, 'week diff abbreviated');
    assertEq(moment([2010, 0, 8]).diff([2010], 'w'), 1, 'week diff abbreviated');
    assertEq(moment([2010, 0, 21]).diff([2010], 'w'), 2, 'week diff abbreviated');
    assertEq(moment([2010, 0, 22]).diff([2010], 'w'), 3, 'week diff abbreviated');
    assertEq(moment([2010, 0, 1, 4]).diff([2010], 'h'), 4, 'hour diff abbreviated');
    assertEq(moment([2010, 0, 1, 0, 5]).diff([2010], 'm'), 5, 'minute diff abbreviated');
    assertEq(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 's'), 6, 'second diff abbreviated');
  });

  it('diff month', function () {
    assertEq(moment([2011, 0, 31]).diff([2011, 2, 1], 'months'), -1, 'month diff');
  });

  it('diff across DST', function () {
    var dst = dstForYear(2012), a, b, daysInMonth;
    if (!dst) {
      assertEq(42, 42, 'at least one assertion');
      return;
    }

    a = dst.moment;
    b = a.clone().utc().add(12, 'hours').local();
    daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;
    assertEq(b.diff(a, 'milliseconds', true), 12 * 60 * 60 * 1000,
      'ms diff across DST');
    assertEq(b.diff(a, 'seconds', true), 12 * 60 * 60,
      'second diff across DST');
    assertEq(b.diff(a, 'minutes', true), 12 * 60,
      'minute diff across DST');
    assertEq(b.diff(a, 'hours', true), 12,
      'hour diff across DST');
    equal(b.diff(a, 'days', true), (12 - dst.diff) / 24,
      'day diff across DST');
    equal(b.diff(a, 'weeks', true), (12 - dst.diff) / 24 / 7,
      'week diff across DST');
    assertOk(0.95 / (2 * 31) < b.diff(a, 'months', true),
      'month diff across DST, lower bound');
    assertOk(b.diff(a, 'month', true) < 1.05 / (2 * 28),
      'month diff across DST, upper bound');
    assertOk(0.95 / (2 * 31 * 12) < b.diff(a, 'years', true),
      'year diff across DST, lower bound');
    assertOk(b.diff(a, 'year', true) < 1.05 / (2 * 28 * 12),
      'year diff across DST, upper bound');

    a = dst.moment;
    b = a.clone().utc().add(12 + dst.diff, 'hours').local();
    daysInMonth = (a.daysInMonth() + b.daysInMonth()) / 2;

    assertEq(b.diff(a, 'milliseconds', true),
      (12 + dst.diff) * 60 * 60 * 1000,
      'ms diff across DST');
    assertEq(b.diff(a, 'seconds', true), (12 + dst.diff) * 60 * 60,
      'second diff across DST');
    assertEq(b.diff(a, 'minutes', true), (12 + dst.diff) * 60,
      'minute diff across DST');
    assertEq(b.diff(a, 'hours', true), (12 + dst.diff),
      'hour diff across DST');
    assertEq(b.diff(a, 'days', true), 12 / 24, 'day diff across DST');
    equal(b.diff(a, 'weeks', true), 12 / 24 / 7,
      'week diff across DST');
    assertOk(0.95 / (2 * 31) < b.diff(a, 'months', true),
      'month diff across DST, lower bound');
    assertOk(b.diff(a, 'month', true) < 1.05 / (2 * 28),
      'month diff across DST, upper bound');
    assertOk(0.95 / (2 * 31 * 12) < b.diff(a, 'years', true),
      'year diff across DST, lower bound');
    assertOk(b.diff(a, 'year', true) < 1.05 / (2 * 28 * 12),
      'year diff across DST, upper bound');
  });

  it('diff overflow', function () {
    assertEq(moment([2011]).diff([2010], 'months'), 12, 'month diff');
    assertEq(moment([2010, 0, 2]).diff([2010], 'hours'), 24, 'hour diff');
    assertEq(moment([2010, 0, 1, 2]).diff([2010], 'minutes'), 120, 'minute diff');
    assertEq(moment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'), 240, 'second diff');
  });

  it('diff between utc and local', function () {
    if (moment([2012]).utcOffset() === moment([2011]).utcOffset()) {
      // Russia's utc offset on 1st of Jan 2012 vs 2011 is different
      assertEq(moment([2012]).utc().diff([2011], 'years'), 1, 'year diff');
    }
    assertEq(moment([2010, 2, 2]).utc().diff([2010, 0, 2], 'months'), 2, 'month diff');
    assertEq(moment([2010, 0, 4]).utc().diff([2010], 'days'), 3, 'day diff');
    assertEq(moment([2010, 0, 22]).utc().diff([2010], 'weeks'), 3, 'week diff');
    assertEq(moment([2010, 0, 1, 4]).utc().diff([2010], 'hours'), 4, 'hour diff');
    assertEq(moment([2010, 0, 1, 0, 5]).utc().diff([2010], 'minutes'), 5, 'minute diff');
    assertEq(moment([2010, 0, 1, 0, 0, 6]).utc().diff([2010], 'seconds'), 6, 'second diff');
  });

  it('diff floored', function () {
    assertEq(moment([2010, 0, 1, 23]).diff([2010], 'day'), 0, '23 hours = 0 days');
    assertEq(moment([2010, 0, 1, 23, 59]).diff([2010], 'day'), 0, '23:59 hours = 0 days');
    assertEq(moment([2010, 0, 1, 24]).diff([2010], 'day'), 1, '24 hours = 1 day');
    assertEq(moment([2010, 0, 2]).diff([2011, 0, 1], 'year'), 0, 'year rounded down');
    assertEq(moment([2011, 0, 1]).diff([2010, 0, 2], 'year'), 0, 'year rounded down');
    assertEq(moment([2010, 0, 2]).diff([2011, 0, 2], 'year'), -1, 'year rounded down');
    assertEq(moment([2011, 0, 2]).diff([2010, 0, 2], 'year'), 1, 'year rounded down');
  });

  it('year diffs include dates', function () {
    assertOk(moment([2012, 1, 19]).diff(moment([2002, 1, 20]), 'years', true) < 10, 'year diff should include date of month');
  });

  it('month diffs', function () {
    // due to floating point math errors, these tests just need to be accurate within 0.00000001
    assertEq(moment([2012, 0, 1]).diff([2012, 1, 1], 'months', true), -1, 'Jan 1 to Feb 1 should be 1 month');
    equal(moment([2012, 0, 1]).diff([2012, 0, 1, 12], 'months', true), -0.5 / 31, 'Jan 1 to Jan 1 noon should be 0.5 / 31 months');
    assertEq(moment([2012, 0, 15]).diff([2012, 1, 15], 'months', true), -1, 'Jan 15 to Feb 15 should be 1 month');
    assertEq(moment([2012, 0, 28]).diff([2012, 1, 28], 'months', true), -1, 'Jan 28 to Feb 28 should be 1 month');
    assertEq(moment([2012, 0, 31]).diff([2012, 1, 29], 'months', true), -1, 'Jan 31 to Feb 29 should be 1 month');
    assertOk(-1 > moment([2012, 0, 31]).diff([2012, 2, 1], 'months', true), 'Jan 31 to Mar 1 should be more than 1 month');
    assertOk(-30 / 28 < moment([2012, 0, 31]).diff([2012, 2, 1], 'months', true), 'Jan 31 to Mar 1 should be less than 1 month and 1 day');
    equal(moment([2012, 0, 1]).diff([2012, 0, 31], 'months', true), -(30 / 31), 'Jan 1 to Jan 31 should be 30 / 31 months');
    assertOk(0 < moment('2014-02-01').diff(moment('2014-01-31'), 'months', true), 'jan-31 to feb-1 diff is positive');
  });

  it('exact month diffs', function () {
    // generate all pairs of months and compute month diff, with fixed day
    // of month = 15.

    var m1, m2;
    for (m1 = 0; m1 < 12; ++m1) {
      for (m2 = m1; m2 < 12; ++m2) {
        assertEq(moment([2013, m2, 15]).diff(moment([2013, m1, 15]), 'months', true), m2 - m1,
          'month diff from 2013-' + m1 + '-15 to 2013-' + m2 + '-15');
      }
    }
  });

  it('year diffs', function () {
    // due to floating point math errors, these tests just need to be accurate within 0.00000001
    equal(moment([2012, 0, 1]).diff([2013, 0, 1], 'years', true), -1, 'Jan 1 2012 to Jan 1 2013 should be 1 year');
    equal(moment([2012, 1, 28]).diff([2013, 1, 28], 'years', true), -1, 'Feb 28 2012 to Feb 28 2013 should be 1 year');
    equal(moment([2012, 2, 1]).diff([2013, 2, 1], 'years', true), -1, 'Mar 1 2012 to Mar 1 2013 should be 1 year');
    equal(moment([2012, 11, 1]).diff([2013, 11, 1], 'years', true), -1, 'Dec 1 2012 to Dec 1 2013 should be 1 year');
    equal(moment([2012, 11, 31]).diff([2013, 11, 31], 'years', true), -1, 'Dec 31 2012 to Dec 31 2013 should be 1 year');
    equal(moment([2012, 0, 1]).diff([2013, 6, 1], 'years', true), -1.5, 'Jan 1 2012 to Jul 1 2013 should be 1.5 years');
    equal(moment([2012, 0, 31]).diff([2013, 6, 31], 'years', true), -1.5, 'Jan 31 2012 to Jul 31 2013 should be 1.5 years');
    equal(moment([2012, 0, 1]).diff([2013, 0, 1, 12], 'years', true), -1 - (0.5 / 31) / 12, 'Jan 1 2012 to Jan 1 2013 noon should be 1+(0.5 / 31) / 12 years');
    equal(moment([2012, 0, 1]).diff([2013, 6, 1, 12], 'years', true), -1.5 - (0.5 / 31) / 12, 'Jan 1 2012 to Jul 1 2013 noon should be 1.5+(0.5 / 31) / 12 years');
    equal(moment([2012, 1, 29]).diff([2013, 1, 28], 'years', true), -1, 'Feb 29 2012 to Feb 28 2013 should be 1-(1 / 28.5) / 12 years');
  });

  it('negative zero', function () {
    function isNegative(n) {
      return (1 / n) < 0;
    }

    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'months')), 'month diff on same date is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'years')), 'year diff on same date is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'quarters')), 'quarter diff on same date is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1, 1]), 'days')), 'days diff on same date is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1, 0, 1]), 'hours')), 'hour diff on same hour is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1, 0, 0, 1]), 'minutes')), 'minute diff on same minute is zero, not -0');
    assertOk(!isNegative(moment([2012, 0, 1]).diff(moment([2012, 0, 1, 0, 0, 0, 1]), 'seconds')), 'second diff on same second is zero, not -0');
  });
});
