import { assertEq, assertDeepEq, assertOk, assertNotEqual } from '../test-helpers';
import { moment } from '../chain';


describe('to type', () => {

  it('toObject', function () {
    var expected = {
      year: 2010,
      month: 3,
      date: 5,
      hours: 15,
      minutes: 10,
      seconds: 3,
      milliseconds: 123
    };
    assertDeepEq(moment(expected).toObject(), expected, 'toObject invalid');
  });

  it('toArray', function () {
    var expected = [2014, 11, 26, 11, 46, 58, 17];
    assertDeepEq(moment(expected).toArray(), expected, 'toArray invalid');
  });

  it('toDate returns a copy of the internal date', function () {
    var m = moment();
    var d = m.toDate();
    m.year(0);
    assertNotEqual(d, m.toDate());
  });

  it('toJSON', function () {
    if (Date.prototype.toISOString) {
      var expected = new Date().toISOString();
      assertDeepEq(moment(expected).toJSON(), expected, 'toJSON invalid');
    } else {
      // IE8
      expect(0);
    }
  });

  it('toJSON works when moment is frozen', function () {
    if (Date.prototype.toISOString) {
      var expected = new Date().toISOString();
      var m = moment(expected);
      if (Object.freeze != null) {
        Object.freeze(m);
      }
      assertDeepEq(m.toJSON(), expected, 'toJSON when frozen invalid');
    } else {
      // IE8
      expect(0);
    }
  });
});
