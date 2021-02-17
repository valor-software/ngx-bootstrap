import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

var symbolMap = {
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')'
  },
  numberMap = {
    '!': '1',
    '@': '2',
    '#': '3',
    '$': '4',
    '%': '5',
    '^': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0'
  };

describe('preparse and postformat', () => {
  beforeEach(() => {
    moment.locale('symbol', {
      preparse: function (str: string) {
        return str.replace(/[!@#$%\^&*()]/g, function (match) {
          return numberMap[match];
        });
      },

      postformat: function (str: string) {
        return str.replace(/\d/g, function (match) {
          return symbolMap[match];
        });
      }
    });
  });

  afterEach(() => {
    moment.defineLocale('symbol', null);
  });

  it('transform', function () {
    assertEq(moment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346025600, 'preparse string + format');
    assertEq(moment.utc('@)!@-)*-@&').unix(), 1346025600, 'preparse ISO8601 string');
    assertEq(moment.unix(1346025600).utc().format('YYYY-MM-DD'), '@)!@-)*-@&', 'postformat');
  });

  it('transform from', function () {
    var start = moment([2007, 1, 28]);

    assertEq(start.from(moment([2007, 1, 28]).add({ s: 90 }), true), '@ minutes', 'postformat should work on moment.fn.from');
    assertEq(moment().add(6, 'd').fromNow(true), '^ days', 'postformat should work on moment.fn.fromNow');
    assertEq(moment.duration(10, 'h').humanize(), '!) hours', 'postformat should work on moment.duration.fn.humanize');
  });

  it('calendar day', function () {
    var a = moment().hours(12).minutes(0).seconds(0);

    assertEq(moment(a).calendar(), 'Today at !@:)) PM', 'today at the same time');
    assertEq(moment(a).add({ m: 25 }).calendar(), 'Today at !@:@% PM', 'Now plus 25 min');
    assertEq(moment(a).add({ h: 1 }).calendar(), 'Today at !:)) PM', 'Now plus 1 hour');
    assertEq(moment(a).add({ d: 1 }).calendar(), 'Tomorrow at !@:)) PM', 'tomorrow at the same time');
    assertEq(moment(a).subtract({ h: 1 }).calendar(), 'Today at !!:)) AM', 'Now minus 1 hour');
    assertEq(moment(a).subtract({ d: 1 }).calendar(), 'Yesterday at !@:)) PM', 'yesterday at the same time');
  });
});
