import { getLocale } from '../locale/locales';
import { DateParsingConfig } from '../create/parsing.types';
import { isDurationValid } from './valid';
import { bubble, daysToMonths, monthsToDays } from './bubble';
import { DateObject } from '../types';
import { Locale } from '../locale/locale.class';
import { normalizeUnits } from '../units/aliases';
import { relativeTime } from './humanize';
import { toInt } from '../utils/type-checks';

export class Duration {
  _milliseconds: number;
  _days: number;
  _months: number;
  _data: Partial<DateObject> = {};
  _locale: Locale = getLocale();
  _isValid: boolean;

  constructor(duration: Partial<DateObject>, config: DateParsingConfig = {}) {
    this._locale = config && config._locale || getLocale();
    // const normalizedInput = normalizeObjectUnits(duration);
    const normalizedInput = duration;
    const years = normalizedInput.year || 0;
    const quarters = normalizedInput.quarter || 0;
    const months = normalizedInput.month || 0;
    const weeks = normalizedInput.week || 0;
    const days = normalizedInput.day || 0;
    const hours = normalizedInput.hours || 0;
    const minutes = normalizedInput.minutes || 0;
    const seconds = normalizedInput.seconds || 0;
    const milliseconds = normalizedInput.milliseconds || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
      seconds * 1000 +
      minutes * 60 * 1000 + // 1000 * 60
      hours * 1000 * 60 * 60; // using 1000 * 60 * 60
    // instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
      weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
      quarters * 3 +
      years * 12;

    // this._data = {};

    // this._locale = getLocale();

    // this._bubble();
    return bubble(this);
  }

  isValid(): boolean {
    return this._isValid;
  }

  humanize(withSuffix?: boolean): string {
    // throw new Error(`TODO: implement`);

    if (!this.isValid()) {
      return this.localeData().invalidDate;
    }

    const locale = this.localeData();
    let output = relativeTime(this, !withSuffix, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  localeData(): Locale {
    return this._locale;
  }

  locale(): string;
  locale(localeKey: string): Duration;
  locale(localeKey?: string): Duration | string {
    if (!localeKey) {
      return this._locale._abbr;
    }

    this._locale = getLocale(localeKey) || this._locale;

    return this;
  }


  abs(): Duration {
    const mathAbs = Math.abs;

    const data = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);

    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.month = mathAbs(data.month);
    data.year = mathAbs(data.year);

    return this;
  }

  as(_units: string): number {
    if (!this.isValid()) {
      return NaN;
    }
    let days;
    let months;
    const milliseconds = this._milliseconds;

    const units = normalizeUnits(_units);

    if (units === 'month' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      return units === 'month' ? months : months / 12;
    }

    // handle milliseconds separately because of floating point math errors (issue #1867)
    days = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case 'week'   :
        return days / 7 + milliseconds / 6048e5;
      case 'day'    :
        return days + milliseconds / 864e5;
      case 'hours'   :
        return days * 24 + milliseconds / 36e5;
      case 'minutes' :
        return days * 1440 + milliseconds / 6e4;
      case 'seconds' :
        return days * 86400 + milliseconds / 1000;
      // Math.floor prevents floating point math errors here
      case 'milliseconds':
        return Math.floor(days * 864e5) + milliseconds;
      default:
        throw new Error(`Unknown unit ${units}`);
    }
  }

  valueOf () {
    if (!this.isValid()) {
      return NaN;
    }

    return (
      this._milliseconds +
      this._days * 864e5 +
      (this._months % 12) * 2592e6 +
      toInt(this._months / 12) * 31536e6
    );
  }
}

export function isDuration(obj: any): obj is Duration {
  return obj instanceof Duration;
}
