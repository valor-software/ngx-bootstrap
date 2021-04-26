import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('quarter', () => {

  it('library quarter getter', function () {
    assertEq(moment([1985, 1, 4]).quarter(), 1, 'Feb  4 1985 is Q1');
    assertEq(moment([2029, 8, 18]).quarter(), 3, 'Sep 18 2029 is Q3');
    assertEq(moment([2013, 3, 24]).quarter(), 2, 'Apr 24 2013 is Q2');
    assertEq(moment([2015, 2, 5]).quarter(), 1, 'Mar  5 2015 is Q1');
    assertEq(moment([1970, 0, 2]).quarter(), 1, 'Jan  2 1970 is Q1');
    assertEq(moment([2001, 11, 12]).quarter(), 4, 'Dec 12 2001 is Q4');
    assertEq(moment([2000, 0, 2]).quarter(), 1, 'Jan  2 2000 is Q1');
  });

  it('quarter setter singular', function () {
    var m = moment([2014, 4, 11]);
    assertEq(m.quarter(2).month(), 4, 'set same quarter');
    assertEq(m.quarter(3).month(), 7, 'set 3rd quarter');
    assertEq(m.quarter(1).month(), 1, 'set 1st quarter');
    assertEq(m.quarter(4).month(), 10, 'set 4th quarter');
  });

  it('quarter setter plural', function () {
    var m = moment([2014, 4, 11]);
    assertEq(m.quarters(2).month(), 4, 'set same quarter');
    assertEq(m.quarters(3).month(), 7, 'set 3rd quarter');
    assertEq(m.quarters(1).month(), 1, 'set 1st quarter');
    assertEq(m.quarters(4).month(), 10, 'set 4th quarter');
  });

  it('quarter setter programmatic', function () {
    var m = moment([2014, 4, 11]);
    assertEq(m.set('quarter', 2).month(), 4, 'set same quarter');
    assertEq(m.set('quarter', 3).month(), 7, 'set 3rd quarter');
    assertEq(m.set('quarter', 1).month(), 1, 'set 1st quarter');
    assertEq(m.set('quarter', 4).month(), 10, 'set 4th quarter');
  });

  it('quarter setter programmatic plural', function () {
    var m = moment([2014, 4, 11]);
    assertEq(m.set('quarters', 2).month(), 4, 'set same quarter');
    assertEq(m.set('quarters', 3).month(), 7, 'set 3rd quarter');
    assertEq(m.set('quarters', 1).month(), 1, 'set 1st quarter');
    assertEq(m.set('quarters', 4).month(), 10, 'set 4th quarter');
  });

  it('quarter setter programmatic abbr', function () {
    var m = moment([2014, 4, 11]);
    assertEq(m.set('Q', 2).month(), 4, 'set same quarter');
    assertEq(m.set('Q', 3).month(), 7, 'set 3rd quarter');
    assertEq(m.set('Q', 1).month(), 1, 'set 1st quarter');
    assertEq(m.set('Q', 4).month(), 10, 'set 4th quarter');
  });

  it('quarter setter only month changes', function () {
    var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(4);
    assertEq(m.year(), 2014, 'keep year');
    assertEq(m.month(), 10, 'set month');
    assertEq(m.date(), 11, 'keep date');
    assertEq(m.hour(), 1, 'keep hour');
    assertEq(m.minute(), 2, 'keep minutes');
    assertEq(m.second(), 3, 'keep seconds');
    assertEq(m.millisecond(), 4, 'keep milliseconds');
  });

  it('quarter setter bubble to next year', function () {
    var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(7);
    assertEq(m.year(), 2015, 'year bubbled');
    assertEq(m.month(), 7, 'set month');
    assertEq(m.date(), 11, 'keep date');
    assertEq(m.hour(), 1, 'keep hour');
    assertEq(m.minute(), 2, 'keep minutes');
    assertEq(m.second(), 3, 'keep seconds');
    assertEq(m.millisecond(), 4, 'keep milliseconds');
  });

  it('quarter diff', function () {
    assertEq(moment('2014-01-01').diff(moment('2014-04-01'), 'quarter'),
      -1, 'diff -1 quarter');
    assertEq(moment('2014-04-01').diff(moment('2014-01-01'), 'quarter'),
      1, 'diff 1 quarter');
    assertEq(moment('2014-05-01').diff(moment('2014-01-01'), 'quarter'),
      1, 'diff 1 quarter');
    assertOk(Math.abs((4 / 3) - moment('2014-05-01').diff(
      moment('2014-01-01'), 'quarter', true)) < 0.00001,
      'diff 1 1/3 quarter');
    assertEq(moment('2015-01-01').diff(moment('2014-01-01'), 'quarter'),
      4, 'diff 4 quarters');
  });

  it('quarter setter bubble to previous year', function () {
    var m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(-3);
    assertEq(m.year(), 2013, 'year bubbled');
    assertEq(m.month(), 1, 'set month');
    assertEq(m.date(), 11, 'keep date');
    assertEq(m.hour(), 1, 'keep hour');
    assertEq(m.minute(), 2, 'keep minutes');
    assertEq(m.second(), 3, 'keep seconds');
    assertEq(m.millisecond(), 4, 'keep milliseconds');
  });
});
