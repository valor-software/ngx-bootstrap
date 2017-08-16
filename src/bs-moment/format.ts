// moment.js
// version : 2.18.1
// authors : Tim Wood, Iskren Chernev, Moment.js contributors
// license : MIT
// momentjs.com

import { formatFunctions, makeFormatFunction } from './format-functions';
import { Locale } from './locale/locale.class';
import './units';
import { getLocale } from './locale/locales.service';
import './locale';
import { isDateValid } from './utils/type-checks';
import { DateFormatterFn } from '../datepicker/models/index';

export function formatDate(date: Date, format: string, locale = 'en'): string {
  // todo: use default format
  // if (!inputString) {
  //   inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  // }
  const _locale = getLocale(locale);
  const output = formatMoment(date, format, _locale);
  // return this.localeData().postformat(output);
  return _locale.postformat(output);
}

// format date using native date object
export function formatMoment(date: Date, format: string, locale: Locale) {
  if (!isDateValid(date)) {
    return locale.invalidDate;
  }

  // todo: not sure we need to support LTS|LT and other formats
  // format = expandFormat(format, localeData);
  formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

  return formatFunctions[format](date, locale);
}
