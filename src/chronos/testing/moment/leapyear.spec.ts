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
