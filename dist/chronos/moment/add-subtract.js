import { createDuration } from '../duration/create';
import { absRound } from '../utils/abs-round';
import { getDate, getMonth, getTime } from '../utils/date-getters';
import { setDate, setMonth, setTime } from '../utils/date-setters';
import { cloneDate } from '../create/clone';
export function add(date, val, period, isUTC) {
    var dur = createDuration(val, period);
    return addSubtract(date, dur, 1, isUTC);
}
export function subtract(date, val, period, isUTC) {
    var dur = createDuration(val, period);
    return addSubtract(date, dur, -1, isUTC);
}
export function addSubtract(date, duration, isAdding, isUTC) {
    var milliseconds = duration._milliseconds;
    var days = absRound(duration._days);
    var months = absRound(duration._months);
    // todo: add timezones support
    // const _updateOffset = updateOffset == null ? true : updateOffset;
    if (months) {
        setMonth(date, getMonth(date, isUTC) + months * isAdding, isUTC);
    }
    if (days) {
        setDate(date, getDate(date, isUTC) + days * isAdding, isUTC);
    }
    if (milliseconds) {
        setTime(date, getTime(date) + milliseconds * isAdding);
    }
    return cloneDate(date);
    // todo: add timezones support
    // if (_updateOffset) {
    //   hooks.updateOffset(date, days || months);
    // }
}
//# sourceMappingURL=add-subtract.js.map