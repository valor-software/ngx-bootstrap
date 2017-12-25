import { addFormatToken } from '../format/format';
import { Locale } from '../locale/locale.class';
import { getDay } from '../utils/date-getters';
import { addRegexToken, match1to2 } from '../parse/regex';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addWeekParseToken } from '../parse/token';
import { getParsingFlags } from '../create/parsing-flags';
import { isNumber, isString, toInt } from '../utils/type-checks';
import { DateFormatterOptions, WeekParsing } from '../types';
import { DateParsingConfig } from '../create/parsing.types';
import { add } from '../moment/add-subtract';
import { getLocale } from '../locale/locales.service';

// FORMATTING

addFormatToken('d', null, 'do',
  function (date: Date, opts: DateFormatterOptions): string {
    return getDay(date, opts.isUTC).toString(10);
  });

addFormatToken('dd', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.locale.weekdaysShort(date, opts.isUTC);
  });

addFormatToken('ddd', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.locale.weekdaysMin(date, opts.isUTC);
  });

addFormatToken('dddd', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.locale.weekdays(date, opts.format, opts.isUTC);
  });

addFormatToken('e', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
  return getDay(date, opts.isUTC).toString(10);
});
addFormatToken('E', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
  return getISODayOfWeek(date, opts.isUTC).toString(10);
});

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d', match1to2);
addRegexToken('e', match1to2);
addRegexToken('E', match1to2);

addRegexToken('ddd', function (isStrict: boolean, locale: Locale): RegExp {
  return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd', function (isStrict: boolean, locale: Locale): RegExp {
  return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'],
  function (input: string, week: WeekParsing, config: DateParsingConfig, token) {
    const weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = !!input;
    }

    return config;
  });

addWeekParseToken(['d', 'e', 'E'],
  function (input: string, week: WeekParsing, config: DateParsingConfig, token: string): DateParsingConfig {
    week[token] = toInt(input);

    return config;
  });

// HELPERS

function parseWeekday(input: string | number, locale: Locale): number {
  if (!isString(input)) {
    return input;
  }

  const _num = parseInt(input, 10);
  if (!isNaN(_num)) {
    return _num;
  }

  const _weekDay = locale.weekdaysParse(input);
  if (isNumber(_weekDay)) {
    return _weekDay;
  }

  return null;
}

function parseIsoWeekday(input: string | number, locale: Locale): number {
  if (isString(input)) {
    return locale.weekdaysParse(input) % 7 || 7;
  }

  return isNumber(input) && isNaN(input) ? null : input;
}

// MOMENTS

export function getSetDayOfWeek(date: Date, input: number, opts: { isUTC?: boolean; locale: Locale }): Date | number {
  if (!input) {
    return getDayOfWeek(date, opts.isUTC);
  }

  return setDayOfWeek(date, input, opts.locale, opts.isUTC);
}

export function setDayOfWeek(date: Date, input: number, locale?: Locale, isUTC?: boolean): Date {
  const _locale = locale ? locale : getLocale();
  const day = getDay(date, isUTC);
  const _input = parseWeekday(input, _locale);

  return add(date, _input - day, 'day');
}

export function getDayOfWeek(date: Date, isUTC?: boolean): number {
  return getDay(date, isUTC);
}

/********************************************/

// getSetLocaleDayOfWeek
export function getLocaleDayOfWeek(date: Date, locale?: Locale): number {
  const _locale = locale ? locale : getLocale();

  return (getDay(date) + 7 - _locale.firstDayOfWeek()) % 7;
}

export function getISODayOfWeek(date: Date, isUTC?: boolean): number {
  return getDay(date, isUTC) || 7;
}

