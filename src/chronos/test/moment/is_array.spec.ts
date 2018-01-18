// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assert } from 'chai';
import { isArray } from '../../utils/type-checks';

describe('is array', () => {

  it('isArray recognizes Array objects', function () {
    assert.ok(isArray([1, 2, 3]), 'array args');
    assert.ok(isArray([]), 'empty array');
    assert.ok(isArray(new Array(1, 2, 3)), 'array constructor');
  });

  it('isArray rejects non-Array objects', function () {
    assert.ok(!isArray(), 'nothing');
    assert.ok(!isArray(undefined), 'undefined');
    assert.ok(!isArray(null), 'null');
    assert.ok(!isArray(123), 'number');
    assert.ok(!isArray('[1,2,3]'), 'string');
    assert.ok(!isArray(new Date()), 'date');
    assert.ok(!isArray({ a: 1, b: 2 }), 'object');
  });
});
