// tslint:disable:max-line-length max-file-line-count
import { add, subtract } from '../index';
import { getDate, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds } from '../utils/date-getters';
import { setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth, setSeconds } from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import { isArray, isBoolean, isDate, isDateValid, isFunction, isNumber, isObject, isString, isUndefined } from '../utils/type-checks';
import { formatDate } from '../format';
import { ISO_8601, RFC_2822 } from '../create/from-string-and-format';
import { getDateOffset, getUTCOffset, hasAlignedHourOffset, isDaylightSavingTime, setOffsetToParsedOffset, setUTCOffset } from '../units/offset';
import { isLeapYear, parseTwoDigitYear } from '../units/year';
import { isAfter, isBefore, isBetween, isSame, isSameOrAfter, isSameOrBefore } from '../utils/date-compare';
import { daysInMonth } from '../units/month';
import { getDayOfWeek, getISODayOfWeek, getLocaleDayOfWeek, parseWeekday, setDayOfWeek, setISODayOfWeek, setLocaleDayOfWeek } from '../units/day-of-week';
import { getISOWeek, getWeek, setISOWeek, setWeek } from '../units/week';
import { getISOWeeksInYear, getISOWeekYear, getSetISOWeekYear, getSetWeekYear, getWeeksInYear, getWeekYear } from '../units/week-year';
import { endOf, startOf } from '../utils/start-end-of';
import { getQuarter, setQuarter } from '../units/quarter';
import { getDayOfYear, setDayOfYear } from '../units/day-of-year';
import { getZoneAbbr, getZoneName } from '../units/timezone';
import { diff } from '../moment/diff';
import { calendar } from '../moment/calendar';
import { defineLocale, getLocale, getSetGlobalLocale, listLocales } from '../locale/locales';
import { max, min } from '../moment/min-max';
import { isDuration } from '../duration/constructor';
import { createLocalOrUTC } from '../create/from-anything';
import { createDuration } from '../duration/create';
export var moment = _moment;
function _moment(input, format, localeKey, strict, isUTC) {
    if (input instanceof Khronos) {
        var _date = input.clone();
        return isUTC ? _date.utc() : _date;
    }
    if (isBoolean(localeKey)) {
        return new Khronos(input, format, null, localeKey, isUTC);
    }
    return new Khronos(input, format, localeKey, strict, isUTC);
}
moment.utc = function (input, format, localeKey, strict) {
    return _moment(input, format, localeKey, strict, true);
};
moment.parseZone = function (input, format, localeKey, strict) {
    return _moment(input, format, localeKey, strict, true).parseZone();
};
moment.locale = getSetGlobalLocale;
moment.localeData = function (key) {
    if (key instanceof Khronos) {
        return key.localeData();
    }
    return getLocale(key);
};
// moment.utc = createUTC;
moment.unix = function (inp) { return new Khronos(inp * 1000); };
moment.ISO_8601 = ISO_8601;
moment.RFC_2822 = RFC_2822;
moment.defineLocale = defineLocale;
moment.parseTwoDigitYear = parseTwoDigitYear;
moment.isDate = isDate;
moment.invalid = function _invalid() {
    return new Khronos(new Date(NaN));
};
// duration(inp?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration;
moment.duration = function (input, unit) {
    var _unit = mapUnitOfTime(unit);
    if (isDate(input)) {
        throw new Error('todo implement');
    }
    if (input == null) {
        return createDuration();
    }
    if (isDuration(input)) {
        return createDuration(input, _unit, { _locale: input._locale });
    }
    if (isString(input) || isNumber(input) || isDuration(input) || isObject(input)) {
        return createDuration(input, _unit);
    }
    throw new Error('todo implement');
};
moment.min = function _min() {
    var dates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dates[_i] = arguments[_i];
    }
    var _firstArg = dates[0];
    var _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map(function (date) { return _moment(date); })
        .map(function (date) { return date.toDate(); });
    var _date = min.apply(void 0, _dates);
    return new Khronos(_date);
};
moment.max = function _max() {
    var dates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        dates[_i] = arguments[_i];
    }
    var _firstArg = dates[0];
    var _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map(function (date) { return _moment(date); })
        .map(function (date) { return date.toDate(); });
    var _date = max.apply(void 0, _dates);
    return new Khronos(_date);
};
moment.locales = function () {
    return listLocales();
};
var _unitsPriority = {
    year: 1,
    month: 8,
    week: 5,
    isoWeek: 5,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    hours: 13,
    weekYear: 1,
    isoWeekYear: 1,
    quarter: 7,
    date: 9,
    dayOfYear: 4,
    minutes: 14,
    seconds: 15,
    milliseconds: 16
};
// todo: do I need 2 mappers?
var _timeHashMap = {
    y: 'year',
    years: 'year',
    year: 'year',
    M: 'month',
    months: 'month',
    month: 'month',
    w: 'week',
    weeks: 'week',
    week: 'week',
    d: 'day',
    days: 'day',
    day: 'day',
    date: 'date',
    dates: 'date',
    D: 'date',
    h: 'hours',
    hour: 'hours',
    hours: 'hours',
    m: 'minutes',
    minute: 'minutes',
    minutes: 'minutes',
    s: 'seconds',
    second: 'seconds',
    seconds: 'seconds',
    ms: 'milliseconds',
    millisecond: 'milliseconds',
    milliseconds: 'milliseconds',
    quarter: 'quarter',
    quarters: 'quarter',
    q: 'quarter',
    Q: 'quarter',
    isoWeek: 'isoWeek',
    isoWeeks: 'isoWeek',
    W: 'isoWeek',
    weekYear: 'weekYear',
    weekYears: 'weekYear',
    gg: 'weekYears',
    isoWeekYear: 'isoWeekYear',
    isoWeekYears: 'isoWeekYear',
    GG: 'isoWeekYear',
    dayOfYear: 'dayOfYear',
    dayOfYears: 'dayOfYear',
    DDD: 'dayOfYear',
    weekday: 'weekday',
    weekdays: 'weekday',
    e: 'weekday',
    isoWeekday: 'isoWeekday',
    isoWeekdays: 'isoWeekday',
    E: 'isoWeekday'
};
function mapUnitOfTime(period) {
    return _timeHashMap[period];
}
function mapMomentInputObject(obj) {
    var _res = {};
    return Object.keys(obj)
        .reduce(function (res, key) {
        res[mapUnitOfTime(key)] = obj[key];
        return res;
    }, _res);
}
var Khronos = (function () {
    function Khronos(input, format, localeKey, strict, isUTC, offset) {
        if (strict === void 0) { strict = false; }
        if (isUTC === void 0) { isUTC = false; }
        this._date = new Date();
        this._isUTC = false;
        // locale will be needed to format invalid date message
        this._locale = getLocale(localeKey);
        // parse invalid input
        if (input === '' || input === null || (isNumber(input) && isNaN(input))) {
            this._date = new Date(NaN);
            return this;
        }
        this._isUTC = isUTC;
        if (this._isUTC) {
            this._offset = 0;
        }
        if (offset || offset === 0) {
            this._offset = offset;
        }
        this._isStrict = strict;
        this._format = format;
        if (!input && input !== 0 && !format) {
            this._date = new Date();
            return this;
        }
        if (isDate(input)) {
            this._date = cloneDate(input);
            return this;
        }
        // this._date = parseDate(input, format, localeKey, strict, isUTC);
        var config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
        this._date = config._d;
        this._offset = config._offset;
        this._isUTC = config._isUTC;
        this._isStrict = config._strict;
        this._format = config._f;
        this._tzm = config._tzm;
    }
    Khronos.prototype._toConfig = function () {
        return { _isUTC: this._isUTC, _locale: this._locale, _offset: this._offset, _tzm: this._tzm };
    };
    Khronos.prototype.locale = function (localeKey) {
        if (isUndefined(localeKey)) {
            return this._locale._abbr;
        }
        if (localeKey instanceof Khronos) {
            this._locale = localeKey._locale;
            return this;
        }
        var newLocaleData = getLocale(localeKey);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    };
    Khronos.prototype.localeData = function () {
        return this._locale;
    };
    // Basic
    Khronos.prototype.add = function (val, period) {
        var _this = this;
        if (isString(val)) {
            this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
        }
        if (isNumber(val)) {
            this._date = add(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            var _mapped_1 = mapMomentInputObject(val);
            Object.keys(_mapped_1)
                .forEach(function (key) { return add(_this._date, _mapped_1[key], key); });
        }
        return this;
    };
    // fixme: for some reason here 'null' for time is fine
    Khronos.prototype.calendar = function (time, formats) {
        var _time = time instanceof Khronos ? time : new Khronos(time || new Date());
        var _offset = (this._offset || 0) - (_time._offset || 0);
        var _config = Object.assign(this._toConfig(), { _offset: _offset });
        return calendar(this._date, _time._date, formats, this._locale, _config);
    };
    Khronos.prototype.clone = function () {
        var localeKey = this._locale && this._locale._abbr || 'en';
        // return new Khronos(cloneDate(this._date), this._format, localeKey, this._isStrict, this._isUTC);
        // fails if isUTC and offset
        // return new Khronos(new Date(this.valueOf()),
        return new Khronos(this._date, this._format, localeKey, this._isStrict, this._isUTC, this._offset);
    };
    Khronos.prototype.diff = function (b, unitOfTime, precise) {
        var unit = mapUnitOfTime(unitOfTime);
        var _b = b instanceof Khronos ? b : new Khronos(b);
        // const zoneDelta = (_b.utcOffset() - this.utcOffset());
        // const config = Object.assign(this._toConfig(), {
        //   _offset: 0,
        //   _isUTC: true,
        //   _zoneDelta: zoneDelta
        // });
        // return diff(new Date(this.valueOf()), new Date(_b.valueOf()), unit, precise, config);
        return diff(this._date, _b.toDate(), unit, precise, this._toConfig());
    };
    Khronos.prototype.endOf = function (period) {
        var _per = mapUnitOfTime(period);
        this._date = endOf(this._date, _per, this._isUTC);
        return this;
    };
    Khronos.prototype.format = function (format) {
        return formatDate(this._date, format, this._locale && this._locale._abbr, this._isUTC, this._offset);
    };
    // todo: implement
    Khronos.prototype.from = function (time, withoutSuffix) {
        var _time = _moment(time);
        if (this.isValid() && _time.isValid()) {
            return createDuration({ to: this.toDate(), from: _time.toDate() })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        }
        return this.localeData().invalidDate;
    };
    Khronos.prototype.fromNow = function (withoutSuffix) {
        return this.from(new Date(), withoutSuffix);
    };
    Khronos.prototype.to = function (inp, suffix) {
        throw new Error("TODO: Implement");
    };
    Khronos.prototype.toNow = function (withoutPrefix) {
        throw new Error("TODO: Implement");
    };
    Khronos.prototype.subtract = function (val, period) {
        var _this = this;
        if (isString(val)) {
            this._date = subtract(this._date, parseInt(val, 10), mapUnitOfTime(period));
            return this;
        }
        if (isNumber(val)) {
            this._date = subtract(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            var _mapped_2 = mapMomentInputObject(val);
            Object.keys(_mapped_2)
                .forEach(function (key) { return subtract(_this._date, _mapped_2[key], key); });
        }
        return this;
    };
    Khronos.prototype.get = function (period) {
        if (period === 'dayOfYear') {
            return this.dayOfYear();
        }
        var unit = mapUnitOfTime(period);
        switch (unit) {
            case 'year':
                return this.year();
            case 'month':
                return this.month();
            // | 'week'
            case 'date':
                return this.date();
            case 'day':
                return this.day();
            case 'hours':
                return this.hours();
            case 'minutes':
                return this.minutes();
            case 'seconds':
                return this.seconds();
            case 'milliseconds':
                return this.milliseconds();
            case 'week':
                return this.week();
            case 'isoWeek':
                return this.isoWeek();
            case 'weekYear':
                return this.weekYear();
            case 'isoWeekYear':
                return this.isoWeekYear();
            case 'weekday':
                return this.weekday();
            case 'isoWeekday':
                return this.isoWeekday();
            case 'quarter':
                return this.quarter();
            default:
                throw new Error("Unknown moment.get('" + period + "')");
        }
    };
    Khronos.prototype.set = function (period, input) {
        var _this = this;
        if (isString(period)) {
            var unit = mapUnitOfTime(period);
            switch (unit) {
                case 'year':
                    return this.year(input);
                case 'month':
                    return this.month(input);
                // | 'week'
                case 'day':
                    return this.day(input);
                case 'date':
                    return this.date(input);
                case 'hours':
                    return this.hours(input);
                case 'minutes':
                    return this.minutes(input);
                case 'seconds':
                    return this.seconds(input);
                case 'milliseconds':
                    return this.milliseconds(input);
                case 'week':
                    return this.week(input);
                case 'isoWeek':
                    return this.isoWeek(input);
                case 'weekYear':
                    return this.weekYear(input);
                case 'isoWeekYear':
                    return this.isoWeekYear(input);
                case 'weekday':
                    return this.weekday(input);
                case 'isoWeekday':
                    return this.isoWeekday(input);
                case 'quarter':
                    return this.quarter(input);
                default:
                    throw new Error("Unknown moment.get('" + period + "')");
            }
        }
        if (isObject(period)) {
            var _mapped_3 = mapMomentInputObject(period);
            Object.keys(_mapped_3)
                .sort(function (a, b) {
                return _unitsPriority[a] - _unitsPriority[b];
            })
                .forEach(function (key) { return _this.set(key, _mapped_3[key]); });
        }
        return this;
    };
    Khronos.prototype.toString = function () {
        return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    };
    Khronos.prototype.toISOString = function () {
        if (!this.isValid()) {
            return null;
        }
        if (getFullYear(this._date, true) < 0 || getFullYear(this._date, true) > 9999) {
            return this.format('YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return this.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    };
    Khronos.prototype.inspect = function () {
        throw new Error('TODO: implement');
    };
    Khronos.prototype.toJSON = function () {
        return this.toISOString();
    };
    Khronos.prototype.toDate = function () {
        return new Date(this.valueOf());
    };
    Khronos.prototype.toObject = function () {
        return {
            // years: getFullYear(this._date, this._isUTC),
            // months: getMonth(this._date, this._isUTC),
            year: getFullYear(this._date, this._isUTC),
            month: getMonth(this._date, this._isUTC),
            date: getDate(this._date, this._isUTC),
            hours: getHours(this._date, this._isUTC),
            minutes: getMinutes(this._date, this._isUTC),
            seconds: getSeconds(this._date, this._isUTC),
            milliseconds: getMilliseconds(this._date, this._isUTC)
        };
    };
    Khronos.prototype.toArray = function () {
        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
    };
    // Dates boolean algebra
    Khronos.prototype.isAfter = function (date, unit) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isAfter(this._date, date.toDate(), _unit);
    };
    Khronos.prototype.isBefore = function (date, unit) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBefore(this.toDate(), date.toDate(), _unit);
    };
    Khronos.prototype.isBetween = function (from, to, unit, inclusivity) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBetween(this.toDate(), from.toDate(), to.toDate(), _unit, inclusivity);
    };
    Khronos.prototype.isSame = function (date, unit) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSame(this._date, date.toDate(), _unit);
    };
    Khronos.prototype.isSameOrAfter = function (date, unit) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrAfter(this._date, date.toDate(), _unit);
    };
    Khronos.prototype.isSameOrBefore = function (date, unit) {
        var _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrBefore(this._date, date.toDate(), _unit);
    };
    Khronos.prototype.isValid = function () {
        return isDateValid(this._date);
    };
    Khronos.prototype.valueOf = function () {
        return this._date.valueOf() - ((this._offset || 0) * 60000);
    };
    Khronos.prototype.unix = function () {
        // return getUnixTime(this._date);
        return Math.floor(this.valueOf() / 1000);
    };
    Khronos.prototype.utcOffset = function (b, keepLocalTime) {
        var _config = this._toConfig();
        if (!b && b !== 0) {
            return getUTCOffset(this._date, _config);
        }
        this._date = setUTCOffset(this._date, b, keepLocalTime, false, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    };
    Khronos.prototype.utc = function (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    };
    Khronos.prototype.local = function (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
                this.subtract(getDateOffset(this._date), 'm');
            }
        }
        return this;
    };
    Khronos.prototype.parseZone = function (input) {
        var _config = this._toConfig();
        this._date = setOffsetToParsedOffset(this._date, input, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    };
    Khronos.prototype.hasAlignedHourOffset = function (input) {
        return hasAlignedHourOffset(this._date, input ? input._date : void 0);
    };
    Khronos.prototype.isDST = function () {
        return isDaylightSavingTime(this._date);
    };
    Khronos.prototype.isLocal = function () {
        return !this._isUTC;
    };
    Khronos.prototype.isUtcOffset = function () {
        return this._isUTC;
    };
    Khronos.prototype.isUTC = function () {
        return this.isUtc();
    };
    Khronos.prototype.isUtc = function () {
        return this._isUTC && this._offset === 0;
    };
    // Timezone
    Khronos.prototype.zoneAbbr = function () {
        return getZoneAbbr(this._isUTC);
    };
    Khronos.prototype.zoneName = function () {
        return getZoneName(this._isUTC);
    };
    Khronos.prototype.year = function (year) {
        if (!year && year !== 0) {
            return getFullYear(this._date, this._isUTC);
        }
        this._date = cloneDate(setFullYear(this._date, year));
        return this;
    };
    Khronos.prototype.weekYear = function (val) {
        if (!val && val !== 0) {
            return getWeekYear(this._date, this._locale);
        }
        var date = getSetWeekYear(this._date, val, this._locale);
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    };
    Khronos.prototype.isoWeekYear = function (val) {
        if (!val && val !== 0) {
            return getISOWeekYear(this._date);
        }
        var date = getSetISOWeekYear(this._date, val);
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    };
    Khronos.prototype.isLeapYear = function () {
        return isLeapYear(getFullYear(this.toDate(), this.isUTC()));
    };
    Khronos.prototype.month = function (month) {
        if (!month && month !== 0) {
            return getMonth(this._date, this._isUTC);
        }
        var _month = month;
        if (isString(month)) {
            var locale = this._locale || getLocale();
            _month = locale.monthsParse(month);
        }
        if (isNumber(_month)) {
            this._date = cloneDate(setMonth(this._date, _month, this._isUTC));
        }
        return this;
    };
    Khronos.prototype.hour = function (hours) {
        return this.hours(hours);
    };
    Khronos.prototype.hours = function (hours) {
        if (!hours && hours !== 0) {
            return getHours(this._date, this._isUTC);
        }
        this._date = cloneDate(setHours(this._date, hours, this._isUTC));
        return this;
    };
    Khronos.prototype.minute = function (minutes) {
        return this.minutes(minutes);
    };
    Khronos.prototype.minutes = function (minutes) {
        if (!minutes && minutes !== 0) {
            return getMinutes(this._date, this._isUTC);
        }
        this._date = cloneDate(setMinutes(this._date, minutes, this._isUTC));
        return this;
    };
    Khronos.prototype.second = function (seconds) {
        return this.seconds(seconds);
    };
    Khronos.prototype.seconds = function (seconds) {
        if (!seconds && seconds !== 0) {
            return getSeconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setSeconds(this._date, seconds, this._isUTC));
        return this;
    };
    Khronos.prototype.millisecond = function (ms) {
        return this.milliseconds(ms);
    };
    Khronos.prototype.milliseconds = function (seconds) {
        if (!seconds && seconds !== 0) {
            return getMilliseconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setMilliseconds(this._date, seconds, this._isUTC));
        return this;
    };
    Khronos.prototype.date = function (date) {
        if (!date && date !== 0) {
            return getDate(this._date, this._isUTC);
        }
        this._date = cloneDate(setDate(this._date, date, this._isUTC));
        return this;
    };
    Khronos.prototype.day = function (input) {
        if (!input && input !== 0) {
            return getDayOfWeek(this._date, this._isUTC);
        }
        var _input = input;
        if (isString(input)) {
            _input = parseWeekday(input, this._locale);
        }
        if (isNumber(_input)) {
            this._date = setDayOfWeek(this._date, _input, this._locale, this._isUTC);
        }
        return this;
    };
    Khronos.prototype.weekday = function (val) {
        if (!val && val !== 0) {
            return getLocaleDayOfWeek(this._date, this._locale, this._isUTC);
        }
        this._date = setLocaleDayOfWeek(this._date, val, { locale: this._locale, isUTC: this._isUTC });
        return this;
    };
    Khronos.prototype.isoWeekday = function (val) {
        if (!val && val !== 0) {
            return getISODayOfWeek(this._date);
        }
        this._date = setISODayOfWeek(this._date, val);
        return this;
    };
    Khronos.prototype.dayOfYear = function (val) {
        if (!val && val !== 0) {
            return getDayOfYear(this._date);
        }
        this._date = setDayOfYear(this._date, val);
        return this;
    };
    Khronos.prototype.week = function (input) {
        if (!input && input !== 0) {
            return getWeek(this._date, this._locale);
        }
        this._date = setWeek(this._date, input, this._locale);
        return this;
    };
    Khronos.prototype.weeks = function (input) {
        return this.week(input);
    };
    Khronos.prototype.isoWeek = function (val) {
        if (!val && val !== 0) {
            return getISOWeek(this._date);
        }
        this._date = setISOWeek(this._date, val);
        return this;
    };
    Khronos.prototype.isoWeeks = function (val) {
        return this.isoWeek(val);
    };
    Khronos.prototype.weeksInYear = function () {
        return getWeeksInYear(this._date, this._isUTC, this._locale);
    };
    Khronos.prototype.isoWeeksInYear = function () {
        return getISOWeeksInYear(this._date, this._isUTC);
    };
    Khronos.prototype.daysInMonth = function () {
        return daysInMonth(getFullYear(this._date, this._isUTC), getMonth(this._date, this._isUTC));
    };
    Khronos.prototype.quarter = function (val) {
        if (!val && val !== 0) {
            return getQuarter(this._date, this._isUTC);
        }
        this._date = setQuarter(this._date, val, this._isUTC);
        return this;
    };
    Khronos.prototype.quarters = function (val) {
        return this.quarter(val);
    };
    Khronos.prototype.startOf = function (period) {
        var _per = mapUnitOfTime(period);
        this._date = startOf(this._date, _per, this._isUTC);
        return this;
    };
    return Khronos;
}());
export { Khronos };
//# sourceMappingURL=chain.js.map