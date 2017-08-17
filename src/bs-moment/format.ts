// moment.js
// version : 2.18.1
// authors : Tim Wood, Iskren Chernev, Moment.js contributors
// license : MIT
// momentjs.com

import { formatFunctions, makeFormatFunction } from './format-functions';
import './locale';
import { Locale } from './locale/locale.class';
import { getLocale } from './locale/locales.service';
import './units';
import { isDateValid } from './utils/type-checks';

export function formatDate(date: Date, format: string, locale = 'en'): string {
  const _locale = getLocale(locale);
  const output = formatMoment(date, format, _locale);
  return _locale.postformat(output);
}

// format date using native date object
export function formatMoment(date: Date, format: string, locale: Locale) {
  if (!isDateValid(date)) {
    return locale.invalidDate;
  }

  formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
  return formatFunctions[format](date, locale);
}
