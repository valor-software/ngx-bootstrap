import { DateArray } from '../parse/token';
import { HOUR, MILLISECOND, MINUTE, SECOND } from '../units/constants';
import { createUTCDate } from '../utils';
import { createDate } from '../utils/date-setters';

function currentDateArray(isUTC: boolean): DateArray {
  // hooks is actually the exported moment object
  const nowValue = new Date();
  if (isUTC) {
    return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
  }

  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
export function configFromArray(input: DateArray) {
  const _isUTC = false;
  const currentDate = currentDateArray(_isUTC);

  // compute day of the year from weeks and weekdays
  // if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
  //   dayOfYearFromWeekInfo(config);
  // }

  // if the day of the year is set, figure out what it is
  // if (config._dayOfYear != null) {
  //   yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
  //
  //   if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
  //     getParsingFlags(config)._overflowDayOfYear = true;
  //   }
  //
  //   date = createUTCDate(yearToUse, 0, config._dayOfYear);
  //   config._a[MONTH] = date.getUTCMonth();
  //   config._a[DATE] = date.getUTCDate();
  // }

  // Default to current date.
  // * if no year, month, day of month are given, default to today
  // * if day of month is given, default month and year
  // * if month is given, default only year
  // * if year is given, don't default anything
  let i;
  for (i = 0; i < 3 && input[i] == null; ++i) {
    input[i] = currentDate[i];
  }

  // Zero out whatever was not defaulted, including time
  for (; i < 7; i++) {
    input[i] = (input[i] == null) ? (i === 2 ? 1 : 0) : input[i];
  }

  // Check for 24:00:00.000
  if (input[HOUR] === 24 &&
    input[MINUTE] === 0 &&
    input[SECOND] === 0 &&
    input[MILLISECOND] === 0) {
    // config._nextDay = true;
    input[HOUR] = 0;
  }

  const _date = (_isUTC ? createUTCDate : createDate).apply(null, input);
  // expectedWeekday = _isUTC ? _date.getUTCDay() : _date.getDay();

  // Apply timezone offset from input. The actual utcOffset can be changed
  // with parseZone.
  // if (config._tzm != null) {
  //   _date.setUTCMinutes(_date.getUTCMinutes() - config._tzm);
  // }

  // if (config._nextDay) {
  //   input[HOUR] = 24;
  // }

  // check for mismatching day of week
  // if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
  //   getParsingFlags(config).weekdayMismatch = true;
  // }
  return _date;
}

/*function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;

    // TODO: We need to take the current isoWeekYear, but that depends on
    // how we interpret now (local, utc, fixed offset). So create
    // a now version of current config (take local/utc/offset flags, and
    // create now).
    weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;

    var curWeek = weekOfYear(createLocal(), dow, doy);

    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

    // Default to current week.
    week = defaults(w.w, curWeek.week);

    if (w.d != null) {
      // weekday -- low day numbers are considered next week
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      // local weekday -- counting starts from begining of week
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      // default to begining of week
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}*/
