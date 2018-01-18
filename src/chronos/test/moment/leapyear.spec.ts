// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assert } from 'chai';
import { moment } from '../chain';

describe('leap year', () => {

  it('leap year', function () {
    assert.equal(moment([2010, 0, 1]).isLeapYear(), false, '2010');
    assert.equal(moment([2100, 0, 1]).isLeapYear(), false, '2100');
    assert.equal(moment([2008, 0, 1]).isLeapYear(), true, '2008');
    assert.equal(moment([2000, 0, 1]).isLeapYear(), true, '2000');
  });
});
