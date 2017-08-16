import { addFormatToken } from '../format-functions';
import { isLeapYear } from './year';
import { Locale } from '../locale/locale.class';
import { mod } from '../utils';
import { getMonth } from '../utils/date-getters';

export function daysInMonth(year: number, month: number): number {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  const modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function (date: Date, format: string): string {
  return (getMonth(date) + 1).toString();
});

addFormatToken('MMM', null, null, function (date: Date, format: string, locale?: Locale): string {
  return locale.monthsShort(date, format) as string;
});

addFormatToken('MMMM', null, null, function (date: Date, format: string, locale?: Locale): string {
  return locale.months(date, format) as string;
});

// ALIASES

// addUnitAlias('month', 'M');

// PRIORITY

// addUnitPriority('month', 8);



/*
function handleStrictParse(monthName: string, format, strict) {
  var i, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    // this is not used
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i = 0; i < 12; ++i) {
      mom = createUTC([2000, i]);
      this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
    }
  }

  if (strict) {
    if (format === 'MMM') {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format === 'MMM') {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}

export function localeMonthsParse(monthName, format, strict) {
  var i, mom, regex;

  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format, strict);
  }

  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }

  // TODO: add sorting
  // Sorting makes sure if one month (or abbr) is a prefix of another
  // see sorting in computeMonthsParse
  for (i = 0; i < 12; i++) {
    // make the regex if we don't have it already
    mom = createUTC([2000, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
      this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
    }
    if (!strict && !this._monthsParse[i]) {
      regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
      this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
    }
    // test the regex
    if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
}
*/

// MOMENTS

/*
export function setMonth(date: Date, value) {
  let dayOfMonth;

  if (!isValidDate(date)) {
    // No op
    return date;
  }

  if (typeof value === 'string') {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = date.localeData().monthsParse(value);
      // TODO: Another silent failure?
      if (!isNumber(value)) {
        return date;
      }
    }
  }

  dayOfMonth = Math.min(date.date(), daysInMonth(date.year(), value));
  date._d['set' + (date._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
  return date;
}

export function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return getMonth;
  }
}
*/
/*
export function getDaysInMonth(date: Date) {
  return daysInMonth(getFullYear(date), getMonth(date));
}

var defaultMonthsShortRegex = matchWord;

export function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, '_monthsRegex')) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, '_monthsShortRegex')) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ?
      this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}

var defaultMonthsRegex = matchWord;

export function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, '_monthsRegex')) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, '_monthsRegex')) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ?
      this._monthsStrictRegex : this._monthsRegex;
  }
}

function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }

  var shortPieces = [], longPieces = [], mixedPieces = [],
    i, mom;
  for (i = 0; i < 12; i++) {
    // make the regex if we don't have it already
    mom = createUTC([2000, i]);
    shortPieces.push(this.monthsShort(mom, ''));
    longPieces.push(this.months(mom, ''));
    mixedPieces.push(this.months(mom, ''));
    mixedPieces.push(this.monthsShort(mom, ''));
  }
  // Sorting makes sure if one month (or abbr) is a prefix of another it
  // will match the longer piece.
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i = 0; i < 12; i++) {
    shortPieces[i] = regexEscape(shortPieces[i]);
    longPieces[i] = regexEscape(longPieces[i]);
  }
  for (i = 0; i < 24; i++) {
    mixedPieces[i] = regexEscape(mixedPieces[i]);
  }

  this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
  this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}*/
