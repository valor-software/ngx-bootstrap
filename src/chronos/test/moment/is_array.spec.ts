// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { isArray } from '../../utils/type-checks';

describe('is array', () => {

  it('isArray recognizes Array objects', function () {
    assertOk(isArray([1, 2, 3]), 'array args');
    assertOk(isArray([]), 'empty array');
    assertOk(isArray(new Array(1, 2, 3)), 'array constructor');
  });

  it('isArray rejects non-Array objects', function () {
    assertOk(!isArray(), 'nothing');
    assertOk(!isArray(undefined), 'undefined');
    assertOk(!isArray(null), 'null');
    assertOk(!isArray(123), 'number');
    assertOk(!isArray('[1,2,3]'), 'string');
    assertOk(!isArray(new Date()), 'date');
    assertOk(!isArray({ a: 1, b: 2 }), 'object');
  });
});
