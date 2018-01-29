import { diff } from './diff';
import { cloneWithOffset } from '../units/offset';
import { isFunction, isString } from '../utils/type-checks';
import { cloneDate } from '../create/clone';
import { startOf } from '../utils/start-end-of';
import { formatDate } from '../format';
import { getLocale } from '../locale/locales';
import { Locale } from '../locale/locale.class';
import { DateInput } from '../test/chain';
import { DateParsingConfig } from '../create/parsing.types';

export type CalendarSpecVal = string | ((m?: DateInput, now?: Date) => string);
export interface CalendarSpec {
  sameDay?: CalendarSpecVal;
  nextDay?: CalendarSpecVal;
  lastDay?: CalendarSpecVal;
  nextWeek?: CalendarSpecVal;
  lastWeek?: CalendarSpecVal;
  sameElse?: CalendarSpecVal;

  // any additional properties might be used with moment.calendarFormat
  [x: string]: CalendarSpecVal | void; // undefined
}

export function getCalendarFormat(date: Date, now: Date, config: DateParsingConfig) {
  const _diff = diff(date, now, 'day', true, config);

  switch (true) {
    case _diff < -6: return 'sameElse';
    case _diff < -1: return 'lastWeek';
    case _diff < 0: return 'lastDay';
    case _diff < 1: return 'sameDay';
    case _diff < 2: return 'nextDay';
    case _diff < 7: return 'nextWeek';
    default: return 'sameElse';
  }
}

export function calendar(date: Date,
                         time: Date,
                         formats: CalendarSpec,
                         locale: Locale = getLocale(),
                         config: DateParsingConfig = {}): string {
  // We want to compare the start of today, vs this.
  // Getting start-of-today depends on whether we're local/utc/offset or not.
  const now = time;
  const sod = startOf(cloneWithOffset(now, date,  config), 'day', config._isUTC);
  const format = getCalendarFormat(date, sod, {_isUTC: true, _offset: 0}) || 'sameElse';

  let output;
  if (formats) {
    const _format = formats[format];
    if (isString(_format)) {
      output = _format;
    }
    if (isFunction(_format)) {
      output = _format.call(null, date, now);
    }
  }

  if (!output) {
    output = locale.calendar(format, date, cloneDate(now));
  }

  return formatDate(date, output, config._locale._abbr, config._isUTC, config._offset);
}
