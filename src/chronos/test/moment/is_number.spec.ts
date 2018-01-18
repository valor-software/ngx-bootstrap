// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name number-literal-format no-construct
import { assert } from 'chai';
import { moment } from '../chain';
import { isNumber } from '../../utils/type-checks';

describe('is number', () => {
  it('isNumber recognizes numbers', function () {
    assert.ok(isNumber(1), 'simple integer');
    assert.ok(isNumber(0), 'simple number');
    assert.ok(isNumber(-0), 'silly number');
    assert.ok(isNumber(1010010293029), 'large number');
    assert.ok(isNumber(Infinity), 'largest number');
    assert.ok(isNumber(-Infinity), 'smallest number');
    assert.ok(isNumber(NaN), 'not number');
    assert.ok(isNumber(1.100393830000), 'decimal numbers');
    assert.ok(isNumber(Math.LN2), 'natural log of two');
    assert.ok(isNumber(Math.PI), 'delicious number');
    assert.ok(isNumber(5e10), 'scientifically notated number');
    assert.ok(isNumber(new Number(1)), 'number primitive wrapped in an object'); // jshint ignore:line
  });

  it('isNumber rejects non-numbers', function () {
    assert.ok(!isNumber(), 'nothing');
    assert.ok(!isNumber(undefined), 'undefined');
    assert.ok(!isNumber(null), 'null');
    assert.ok(!isNumber([1]), 'array');
    assert.ok(!isNumber('[1,2,3]'), 'string');
    assert.ok(!isNumber(new Date()), 'date');
    assert.ok(!isNumber({ a: 1, b: 2 }), 'object');
  });
});
