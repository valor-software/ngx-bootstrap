// todo: fix day of week first
/*
import { addFormatToken } from '../format-functions';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from '../parse/regex';
import { addWeekParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
import { parseTwoDigitYear } from './year';
import { dayOfYearFromWeeks, weekOfYear, weeksInYear } from './week-calendar-utils';
import { Locale } from '../locale/locale.class';
import { getISOWeek, getWeek } from './week';
import { getDayOfWeek } from '../utils/date-getters';
import { createUTCDate } from '../utils';

// FORMATTING

addFormatToken(null, ['gg', 2], null,
  function (date: Date, format: string, locale: Locale): string {
    // return this.weekYear() % 100;
    return (getSetWeekYear(date, locale) % 100).toString(10);
  });

addFormatToken(null, ['GG', 2], null, function (date: Date, format: string, locale: Locale): string {
  // return this.isoWeekYear() % 100;
  return (getSetISOWeekYear(date, locale) % 100).toString(10);
});

function addWeekYearFormatToken(token, getter) {
  addFormatToken(null, [token, token.length], null, getter);
}

addWeekYearFormatToken('gggg', getSetWeekYear);
addWeekYearFormatToken('ggggg', getSetWeekYear);
addWeekYearFormatToken('GGGG', getSetISOWeekYear);
addWeekYearFormatToken('GGGGG', getSetISOWeekYear);

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G', matchSigned);
addRegexToken('g', matchSigned);
addRegexToken('GG', match1to2, match2);
addRegexToken('gg', match1to2, match2);
addRegexToken('GGGG', match1to4, match4);
addRegexToken('gggg', match1to4, match4);
addRegexToken('GGGGG', match1to6, match6);
addRegexToken('ggggg', match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
  week[token.substr(null, 2)] = toInt(input);

  return config;
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
  week[token] = parseTwoDigitYear(input);

  return config;
});

// MOMENTS

/!*export function getSetWeekYear(date: Date, locale: Locale) {
  return getSetWeekYearHelper(
    date,
    getWeek(date, locale),
    // todo: seems this one implemented incorrectly
    //   //   this.weekday(),
    getDayOfWeek(date),
    locale._week.dow,
    locale._week.doy);
}*!/

/!*
export function getSetISOWeekYear(date: Date) {
  return getSetWeekYearHelper(date, this.isoWeek(), this.isoWeekday(), 1, 4);
}

export function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}

export function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
    date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
*!/
*/
