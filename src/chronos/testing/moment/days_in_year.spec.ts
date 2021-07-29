import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('days in year', () => {
// https://github.com/moment/moment/issues/3717
  it('YYYYDDD should not parse DDD=000', function () {
    assertEq(moment(7000000, moment.ISO_8601, true).isValid(), false);
    assertEq(moment('7000000', moment.ISO_8601, true).isValid(), false);
    assertEq(moment(7000000, moment.ISO_8601, false).isValid(), false);
  });
});
