// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword
import { assert } from 'chai';
import { moment } from '../chain';

describe('days in year', () => {
// https://github.com/moment/moment/issues/3717
  it('YYYYDDD should not parse DDD=000', function () {
    assert.equal(moment(7000000, moment.ISO_8601, true).isValid(), false);
    assert.equal(moment('7000000', moment.ISO_8601, true).isValid(), false);
    assert.equal(moment(7000000, moment.ISO_8601, false).isValid(), false);
  });
});
