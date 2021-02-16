// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('leap year', () => {

  it('leap year', function () {
    assertEq(moment([2010, 0, 1]).isLeapYear(), false, '2010');
    assertEq(moment([2100, 0, 1]).isLeapYear(), false, '2100');
    assertEq(moment([2008, 0, 1]).isLeapYear(), true, '2008');
    assertEq(moment([2000, 0, 1]).isLeapYear(), true, '2000');
  });
});
