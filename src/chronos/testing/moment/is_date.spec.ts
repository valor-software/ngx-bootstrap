import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('is date', () => {

  it('isDate recognizes Date objects', function () {
    assertOk(moment.isDate(new Date()), 'no args (now)');
    assertOk(moment.isDate(new Date([2014, 2, 15].toString())), 'array args');
    assertOk(moment.isDate(new Date('2014-03-15')), 'string args');
    assertOk(moment.isDate(new Date('does NOT look like a date')), 'invalid date');
  });

  it('isDate rejects non-Date objects', function () {
    assertOk(!moment.isDate(), 'nothing');
    assertOk(!moment.isDate(undefined), 'undefined');
    assertOk(!moment.isDate(null), 'string args');
    assertOk(!moment.isDate(42), 'number');
    assertOk(!moment.isDate('2014-03-15'), 'string');
    assertOk(!moment.isDate([2014, 2, 15]), 'array');
    assertOk(!moment.isDate({ year: 2014, month: 2, day: 15 }), 'object');
    assertOk(!moment.isDate({
      toString: function () {
        return '[object Date]';
      }
    }), 'lying object');
  });
});
