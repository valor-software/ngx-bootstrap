import { getLocale } from '../locale/locales';
import { DateParsingConfig } from '../create/parsing.types';
import { isDurationValid } from './valid';
import { bubble } from './bubble';
import { DateObject } from '../types';
import { Locale } from '../locale/locale.class';

export class Duration {
  _milliseconds: number;
  _days: number;
  _months: number;
  _data: Partial<DateObject> = {};
  _locale: Locale;

  constructor(duration: Partial<DateObject>, config?: DateParsingConfig) {
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

    if (config) {
      config._isValid = isDurationValid(normalizedInput);
    }

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
}

export function isDuration(obj: any): obj is Duration {
  return obj instanceof Duration;
}
