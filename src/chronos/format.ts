// moment.js
// version : 2.18.1
// authors : Tim Wood, Iskren Chernev, Moment.js contributors
// license : MIT
// momentjs.com

import './units/index';
import { formatFunctions, makeFormatFunction } from './format/format';
import { Locale } from './locale/locale.class';
import { getLocale } from './locale/locales';
import { isDateValid } from './utils/type-checks';

export function formatDate(date: Date, format: string, locale?: string, isUTC?: boolean, offset = 0): string {
  const _locale = getLocale(locale || 'en');
  if (!_locale) {
    throw new Error(
      `Locale "${locale}" is not defined, please add it with "defineLocale(...)"`
    );
  }

  const _format = format || (isUTC ?  'YYYY-MM-DDTHH:mm:ss[Z]' : 'YYYY-MM-DDTHH:mm:ssZ');

  const output = formatMoment(date, _format, _locale, isUTC, offset);

  if (!output) {
    return output;
  }

  return _locale.postformat(output);
}

// format date using native date object
export function formatMoment(date: Date, _format: string, locale: Locale, isUTC?: boolean, offset = 0): string {
  if (!isDateValid(date)) {
    return locale.invalidDate;
  }

  const format = expandFormat(_format, locale);
  formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

  return formatFunctions[format](date, locale, isUTC, offset);
}

export function expandFormat(_format: string, locale: Locale): string {
  let format = _format;
  let i = 5;
  const localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

  const replaceLongDateFormatTokens = (input: any) => {
    return locale.formatLongDate(input) || input;
  };

  localFormattingTokens.lastIndex = 0;
  while (i >= 0 && localFormattingTokens.test(format)) {
    format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
    localFormattingTokens.lastIndex = 0;
    i -= 1;
  }

  return format;
}
