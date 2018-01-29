// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword
import { assert } from 'chai';
import { moment } from '../chain';
import { daysInMonth } from '../../units/month';
import { each } from '../test-helpers';

describe('days in month', () => {

  it('days in month', function () {
    each([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], function (days, i) {
      var firstDay = moment([2012, i]),
        lastDay = moment([2012, i, days]);
      assert.equal(firstDay.daysInMonth(), days, firstDay.format('L') + ' should have ' + days + ' days.');
      assert.equal(lastDay.daysInMonth(), days, lastDay.format('L') + ' should have ' + days + ' days.');
    });
  });

  it('days in month leap years', function () {
    assert.equal(moment([2010, 1]).daysInMonth(), 28, 'Feb 2010 should have 28 days');
    assert.equal(moment([2100, 1]).daysInMonth(), 28, 'Feb 2100 should have 28 days');
    assert.equal(moment([2008, 1]).daysInMonth(), 29, 'Feb 2008 should have 29 days');
    assert.equal(moment([2000, 1]).daysInMonth(), 29, 'Feb 2000 should have 29 days');
  });

  it('days in month with NaN inputs', function () {
    assert.ok(isNaN(daysInMonth(2, NaN)), 'month NaN inputs should return NaN');
    assert.ok(isNaN(daysInMonth(NaN, 0)), 'year NaN inputs should return NaN');
    // assert.ok(!moment([2010, null, null]).isValid(), 'Invalid date because month is NaN');
  });

  it('days in month with overflow', function () {
    assert.equal(daysInMonth(14, 22), daysInMonth(15, 10), 'positive overflow by 1');
    assert.equal(daysInMonth(14, 122), daysInMonth(24, 2), 'positive overflow by 10');
    assert.equal(daysInMonth(8, -2), daysInMonth(7, 10), 'negative overflow by 1');
    assert.equal(daysInMonth(-2380, -25), daysInMonth(-2383, 11), 'negative overflow by 3');
  });

  it('days in month consistent with Date()', function () {
    var oldMethod = function (year, month) {
      return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    };
    assert.equal(daysInMonth(14, 22), oldMethod(14, 22), 'positive overflow by 1');
    assert.equal(daysInMonth(14, 122), oldMethod(14, 122), 'positive overflow by 10');
    assert.equal(daysInMonth(8, -2), oldMethod(8, -2), 'negative overflow by 1');
    assert.equal(daysInMonth(-2380, -25), oldMethod(-2380, -25), 'negative overflow by 3');
  });

});
