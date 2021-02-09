xdescribe('is moment', () => {
  xit('should test', () => {
  });
});
/*
// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assertEq, assertDeepEq, assertOk } from '../testing-helpers';
import { moment } from '../chain';

describe('is moment', () => {

  it('is moment object', function () {
    var MyObj = function () {
      },
      extend = function (a, b) {
        var i;
        for (i in b) {
          a[i] = b[i];
        }
        return a;
      };
    MyObj.prototype.toDate = function () {
      return new Date();
    };

    assertOk(moment.isMoment(moment()), 'simple moment object');
    assertOk(moment.isMoment(moment(null)), 'invalid moment object');
    assertOk(moment.isMoment(extend({}, moment())), 'externally cloned moments are moments');
    assertOk(moment.isMoment(extend({}, moment.utc())), 'externally cloned utc moments are moments');

    assertOk(!moment.isMoment(new MyObj()), 'myObj is not moment object');
    assertOk(!moment.isMoment(moment), 'moment function is not moment object');
    assertOk(!moment.isMoment(new Date()), 'date object is not moment object');
    assertOk(!moment.isMoment(Object), 'Object is not moment object');
    assertOk(!moment.isMoment('foo'), 'string is not moment object');
    assertOk(!moment.isMoment(1), 'number is not moment object');
    assertOk(!moment.isMoment(NaN), 'NaN is not moment object');
    assertOk(!moment.isMoment(null), 'null is not moment object');
    assertOk(!moment.isMoment(undefined), 'undefined is not moment object');
  });

  it('is moment with hacked hasOwnProperty', function () {
    var obj = {};
    // HACK to suppress jshint warning about bad property name
    obj['hasOwnMoney'.replace('Money', 'Property')] = function () {
      return true;
    };

    assertOk(!moment.isMoment(obj), 'isMoment works even if passed object has a wrong hasOwnProperty implementation (ie8)');
  });
});
*/
