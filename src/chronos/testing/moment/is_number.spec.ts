import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';
import { isNumber } from '../../utils/type-checks';

describe('is number', () => {
  it('isNumber recognizes numbers', function () {
    assertOk(isNumber(1), 'simple integer');
    assertOk(isNumber(0), 'simple number');
    assertOk(isNumber(-0), 'silly number');
    assertOk(isNumber(1010010293029), 'large number');
    assertOk(isNumber(Infinity), 'largest number');
    assertOk(isNumber(-Infinity), 'smallest number');
    assertOk(isNumber(NaN), 'not number');
    assertOk(isNumber(1.100393830000), 'decimal numbers');
    assertOk(isNumber(Math.LN2), 'natural log of two');
    assertOk(isNumber(Math.PI), 'delicious number');
    assertOk(isNumber(5e10), 'scientifically notated number');
    assertOk(isNumber(new Number(1)), 'number primitive wrapped in an object'); // jshint ignore:line
  });

  it('isNumber rejects non-numbers', function () {
    assertOk(!isNumber(), 'nothing');
    assertOk(!isNumber(undefined), 'undefined');
    assertOk(!isNumber(null), 'null');
    assertOk(!isNumber([1]), 'array');
    assertOk(!isNumber('[1,2,3]'), 'string');
    assertOk(!isNumber(new Date()), 'date');
    assertOk(!isNumber({ a: 1, b: 2 }), 'object');
  });
});
