// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assert } from 'chai';
import { moment } from '../chain';

describe('min max', () => {

  it('min', function () {
    var now = moment(),
      future = now.clone().add(1, 'month'),
      past = now.clone().subtract(1, 'month'),
      invalid = moment.invalid();

    assert.deepEqual(moment.min(now, future, past), past, 'min(now, future, past)');
    assert.deepEqual(moment.min(future, now, past), past, 'min(future, now, past)');
    assert.deepEqual(moment.min(future, past, now), past, 'min(future, past, now)');
    assert.deepEqual(moment.min(past, future, now), past, 'min(past, future, now)');
    assert.deepEqual(moment.min(now, past), past, 'min(now, past)');
    assert.deepEqual(moment.min(past, now), past, 'min(past, now)');
    assert.deepEqual(moment.min(now), now, 'min(now, past)');

    assert.deepEqual(moment.min([now, future, past]), past, 'min([now, future, past])');
    assert.deepEqual(moment.min([now, past]), past, 'min(now, past)');
    assert.deepEqual(moment.min([now]), now, 'min(now)');

    assert.deepEqual(moment.min([now, invalid]), invalid, 'min(now, invalid)');
    assert.deepEqual(moment.min([invalid, now]), invalid, 'min(invalid, now)');
  });

  xit('max', function () {
    var now = moment(),
      future = now.clone().add(1, 'month'),
      past = now.clone().subtract(1, 'month'),
      invalid = moment.invalid();

    assert.deepEqual(moment.max(now, future, past), future, 'max(now, future, past)');
    assert.deepEqual(moment.max(future, now, past), future, 'max(future, now, past)');
    assert.deepEqual(moment.max(future, past, now), future, 'max(future, past, now)');
    assert.deepEqual(moment.max(past, future, now), future, 'max(past, future, now)');
    assert.deepEqual(moment.max(now, past), now, 'max(now, past)');
    assert.deepEqual(moment.max(past, now), now, 'max(past, now)');
    assert.deepEqual(moment.max(now), now, 'max(now, past)');

    assert.deepEqual(moment.max([now, future, past]), future, 'max([now, future, past])');
    assert.deepEqual(moment.max([now, past]), now, 'max(now, past)');
    assert.deepEqual(moment.max([now]), now, 'max(now)');

    assert.equal(moment.max([now, invalid]), invalid, 'max(now, invalid)');
    assert.equal(moment.max([invalid, now]), invalid, 'max(invalid, now)');
  });
});
