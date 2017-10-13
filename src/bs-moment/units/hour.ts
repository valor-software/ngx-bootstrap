// import { makeGetSet } from '../moment/get-set';
// import { addFormatToken } from '../format/format';
// import { addUnitAlias } from './aliases';
// import { addUnitPriority } from './priorities';
// import { addRegexToken, match1to2, match2, match3to4, match5to6 } from '../parse/regex';
// import { addParseToken } from '../parse/token';
// import { HOUR, MINUTE, SECOND } from './constants';
// import toInt from '../utils/to-int';
// import zeroFill from '../utils/zero-fill';
// import getParsingFlags from '../create/parsing-flags';

// FORMATTING

import { getHours, getMinutes, getSeconds } from '../utils/date-getters';
import { addFormatToken } from '../format-functions';
import { zeroFill } from '../utils';
import { Locale } from '../locale/locale.class';

function hFormat(date: Date): number {
  return getHours(date) % 12 || 12;
}

function kFormat(date: Date): number {
  return getHours(date) || 24;
}

addFormatToken('H', ['HH', 2], null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return getHours(date).toString(10);
});
addFormatToken('h', ['hh', 2], null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return hFormat(date).toString(10);
});
addFormatToken('k', ['kk', 2], null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return kFormat(date).toString(10);
});

addFormatToken('hmm', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return `${hFormat(date)}${zeroFill(getMinutes(date), 2)}`;
});

addFormatToken('hmmss', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return `${hFormat(date)}${zeroFill(getMinutes(date), 2)}${zeroFill(
    getSeconds(date),
    2
  )}`;
});

addFormatToken('Hmm', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return `${getHours(date)}${zeroFill(getMinutes(date), 2)}`;
});

addFormatToken('Hmmss', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return `${getHours(date)}${zeroFill(getMinutes(date), 2)}${zeroFill(
    getSeconds(date),
    2
  )}`;
});

function meridiem(token: string, lowercase: boolean): void {
  addFormatToken(token, null, null, function(
    date: Date,
    format: string,
    locale?: Locale
  ): string {
    return locale.meridiem(getHours(date), getMinutes(date), lowercase);
  });
}

meridiem('a', true);
meridiem('A', false);
