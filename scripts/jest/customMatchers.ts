/**
 * @copyright Angular ng-bootstrap team
 */

export const matchers = {
  toHaveCssClass(/*util, customEqualityTests*/) {
    return {compare: buildError(false), negativeCompare: buildError(true)};

    function buildError(isNot) {
      return function (actual, className) {
        const orNot = isNot ? 'not ' : '';
        return {
          pass: actual.classList.contains(className) === !isNot,
          message: `Expected ${actual.outerHTML} ${orNot} to contain the CSS class "${className}"`
        };
      };
    }
  }
};

jasmine.addMatchers(matchers)

