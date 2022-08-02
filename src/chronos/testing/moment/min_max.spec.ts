import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

function assertEqualDates(a: any, b: any, msg?: string): void {
  assertDeepEq(a.toString() && a.toString() || a, b.toString && b.toString() || b, msg);
}

describe('min max', () => {

  it('min', function () {
    var now = moment(),
      future = now.clone().add(1, 'month'),
      past = now.clone().subtract(1, 'month'),
      invalid = moment.invalid();

    assertEqualDates(moment.min(now, future, past), past, 'min(now, future, past)');
    assertEqualDates(moment.min(future, now, past), past, 'min(future, now, past)');
    assertEqualDates(moment.min(future, past, now), past, 'min(future, past, now)');
    assertEqualDates(moment.min(past, future, now), past, 'min(past, future, now)');
    assertEqualDates(moment.min(now, past), past, 'min(now, past)');
    assertEqualDates(moment.min(past, now), past, 'min(past, now)');
    assertEqualDates(moment.min(now), now, 'min(now, past)');

    assertEqualDates(moment.min([now, future, past]), past, 'min([now, future, past])');
    assertEqualDates(moment.min([now, past]), past, 'min(now, past)');
    assertEqualDates(moment.min([now]), now, 'min(now)');

    assertEqualDates(moment.min([now, invalid]), invalid, 'min(now, invalid)');
    assertEqualDates(moment.min([invalid, now]), invalid, 'min(invalid, now)');
  });

  it('max', function () {
    var now = moment(),
      future = now.clone().add(1, 'month'),
      past = now.clone().subtract(1, 'month'),
      invalid = moment.invalid();

    assertEqualDates(moment.max(now, future, past), future, 'max(now, future, past)');
    assertEqualDates(moment.max(future, now, past), future, 'max(future, now, past)');
    assertEqualDates(moment.max(future, past, now), future, 'max(future, past, now)');
    assertEqualDates(moment.max(past, future, now), future, 'max(past, future, now)');
    assertEqualDates(moment.max(now, past), now, 'max(now, past)');
    assertEqualDates(moment.max(past, now), now, 'max(past, now)');
    assertEqualDates(moment.max(now), now, 'max(now, past)');

    assertEqualDates(moment.max([now, future, past]), future, 'max([now, future, past])');
    assertEqualDates(moment.max([now, past]), now, 'max(now, past)');
    assertEqualDates(moment.max([now]), now, 'max(now)');

    assertEqualDates(moment.max([now, invalid]), invalid, 'max(now, invalid)');
    assertEqualDates(moment.max([invalid, now]), invalid, 'max(invalid, now)');
  });
});
