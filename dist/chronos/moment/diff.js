import { cloneWithOffset, getUTCOffset } from '../units/offset';
import { absFloor } from '../utils';
import { isDateValid, isNumber } from '../utils/type-checks';
import { getFullYear, getMonth } from '../utils/date-getters';
import { add } from './add-subtract';
import { cloneDate } from '../create/clone';
export function diff(date, input, units, asFloat, config) {
    if (config === void 0) { config = {}; }
    if (!isDateValid(date)) {
        return NaN;
    }
    var that = cloneWithOffset(input, date, config);
    if (!isDateValid(that)) {
        return NaN;
    }
    // const zoneDelta = (getUTCOffset(input, dateConfig) - getUTCOffset(date, dateConfig)) * 6e4;
    var zoneDelta = isNumber(config._zoneDelta)
        ? config._zoneDelta * 6e4
        : (getUTCOffset(input, config) - getUTCOffset(date, config)) * 6e4;
    var output;
    switch (units) {
        case 'year':
            output = monthDiff(date, that) / 12;
            break;
        case 'month':
            output = monthDiff(date, that);
            break;
        case 'quarter':
            output = monthDiff(date, that) / 3;
            break;
        case 'seconds':
            output = (date.valueOf() - that.valueOf()) / 1e3;
            break; // 1000
        case 'minutes':
            output = (date.valueOf() - that.valueOf()) / 6e4;
            break; // 1000 * 60
        case 'hours':
            output = (date.valueOf() - that.valueOf()) / 36e5;
            break; // 1000 * 60 * 60
        case 'day':
            output = (date.valueOf() - that.valueOf() - zoneDelta) / 864e5;
            break; // 1000 * 60 * 60 * 24, negate dst
        case 'week':
            output = (date.valueOf() - that.valueOf() - zoneDelta) / 6048e5;
            break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default:
            output = date.valueOf() - that.valueOf();
    }
    return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
    // difference in months
    var wholeMonthDiff = ((getFullYear(b) - getFullYear(a)) * 12) + (getMonth(b) - getMonth(a));
    // b is in (anchor - 1 month, anchor + 1 month)
    var anchor = add(cloneDate(a), wholeMonthDiff, 'month');
    var anchor2;
    var adjust;
    if (b.valueOf() - anchor.valueOf() < 0) {
        anchor2 = add(cloneDate(a), wholeMonthDiff - 1, 'month');
        // linear across the month
        adjust = (b.valueOf() - anchor.valueOf()) / (anchor.valueOf() - anchor2.valueOf());
    }
    else {
        anchor2 = add(cloneDate(a), wholeMonthDiff + 1, 'month');
        // linear across the month
        adjust = (b.valueOf() - anchor.valueOf()) / (anchor2.valueOf() - anchor.valueOf());
    }
    // check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}
//# sourceMappingURL=diff.js.map