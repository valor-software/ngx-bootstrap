// moment function createLocal (src/lib/create/local.js)
import { hasOwnProp, isArray, isObject, isObjectEmpty, toInt } from './utils/type-checks';
import { getLocale } from './locale/locales.service';
import { isDate } from 'rxjs/util/isDate';
import { expandFormat } from './format';
import { Locale } from './locale/locale.class';
import { formattingTokens, formatTokenFunctions } from './format-functions';
import { getParseRegexForToken } from './parse/regex';
import { addTimeToArrayFromToken, DateArray } from './parse/token';
import { HOUR } from './units/constants';
import { configFromArray } from './create/from-array';

export function parseDate(input: string, format?: string, localeKey?: string, strict?: boolean): Date {
  return createLocalOrUtc(input, format, localeKey, strict, false);
}

// src/lib/create/from-anything.js
export function createLocalOrUtc(input: string, format?: string, localeKey?: string, strict?: boolean, isUTC?: boolean): Date {
  let _input = input;
  if ((isObject(input) && isObjectEmpty(input)) || (isArray(input) && input.length === 0)) {
    _input = void 0;
  }

  // c._isAMomentObject = true;
  // c._useUTC = c._isUTC = isUTC;
  // c._l = locale;
  // c._i = input;
  // c._f = format;
  // c._strict = strict;
  return createFromConfig(_input, format, localeKey, strict, isUTC);
}

// src/lib/create/from-anything.js
export function createFromConfig(input: string, format?: string, localeKey?: string, strict?: boolean, isUTC?: boolean): Date {
  // var res = new Moment(checkOverflow(prepareConfig(input, format, localeKey, strict, isUTC)));
  const res = prepareConfig(input, format, localeKey, strict, isUTC);
  // if (res._nextDay) {
    // Adding is smart enough around DST
    // res.add(1, 'd');
    // res._nextDay = undefined;
  // }

  return res;
}

// src/lib/create/from-anything.js
export function prepareConfig(input: string, format?: string, localeKey?: string, strict?: boolean, isUTC?: boolean): Date {
  // var input = config._i,
  //   format = config._f;

  const _locale = getLocale(localeKey);
  let _input = input;


  if (input === null || (format === undefined && input === '')) {
    return createInvalid({ nullInput: true });
  }

  if (typeof input === 'string') {
    _input = _locale.preparse(input);
  }

  // if (isMoment(input)) {
  //   return new Moment(checkOverflow(input));
  // } else
  if (isDate(input)) {
    return input;
  }
  // if (isArray(format)) {
    // configFromStringAndArray(config);
  // } else if (format) {
    // configFromStringAndFormat(config);
  // }

  return configFromInput(_input, format, _locale);
}


function configFromInput(input: string, format: string = '', locale: Locale): Date {
  // if (isUndefined(input)) {
  //   config._d = new Date(hooks.now());
  // } else
  //   if (isDate(input)) {
  //   config._d = new Date(input.valueOf());
  // } else
  if (typeof input === 'string') {
    return configFromString(input, format, locale);
  }
  // else
  // if (isArray(input)) {
  // config._a = map(input.slice(0), function (obj) {
  //   return parseInt(obj, 10);
  // });
  // configFromArray(config);
  // } else
  //   if (isObject(input)) {
  //   configFromObject(config);
  // } else if (isNumber(input)) {
  //   from milliseconds
  // config._d = new Date(input);
  // } else {
  //   hooks.createFromInputFallback(config);
  // }
}

// src/lib/create/from-string.js

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
// tslint:disable-next-line
const extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

const tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

const isoDates = [
  ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
  ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
  ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
  ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
  ['YYYY-DDD', /\d{4}-\d{3}/],
  ['YYYY-MM', /\d{4}-\d\d/, false],
  ['YYYYYYMMDD', /[+-]\d{10}/],
  ['YYYYMMDD', /\d{8}/],
  // YYYYMM is NOT allowed by the standard
  ['GGGG[W]WWE', /\d{4}W\d{3}/],
  ['GGGG[W]WW', /\d{4}W\d{2}/, false],
  ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
const isoTimes = [
  ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
  ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
  ['HH:mm:ss', /\d\d:\d\d:\d\d/],
  ['HH:mm', /\d\d:\d\d/],
  ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
  ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
  ['HHmmss', /\d\d\d\d\d\d/],
  ['HHmm', /\d\d\d\d/],
  ['HH', /\d\d/]
];

const aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format or fallback
export function configFromString(input: string, format: string, locale: Locale): Date {
  const matched = aspNetJsonRegex.exec(input);

  if (matched !== null) {
    return new Date(+matched[1]);
  }

  if (isISODate(input)) {
    return configFromISO(input, format, locale);
  }

  // if (isRFC2822(input)) {
  //   return configFromRFC2822(input);
  // }

  // Final attempt, use Input Fallback
  // hooks.createFromInputFallback(config);
}

// src/lib/create/from-string.js
export function isISODate(input: string): boolean {
  return !!(extendedIsoRegex.exec(input) || basicIsoRegex.exec(input));
}

// date from iso format
export function configFromISO(input: string, format: string, locale: Locale): Date {
  let i, l, allowTime, dateFormat, timeFormat, tzFormat;
  const match = extendedIsoRegex.exec(input) || basicIsoRegex.exec(input);
  if (!match) {
    return createInvalid();
  }
  // getParsingFlags(config).iso = true;

  for (i = 0, l = isoDates.length; i < l; i++) {
    if ((isoDates[i][1] as RegExp).exec(match[1])) {
      dateFormat = isoDates[i][0];
      allowTime = isoDates[i][2] !== false;
      break;
    }
  }

  if (!dateFormat) {
    return createInvalid();
  }

  if (match[3]) {
    for (i = 0, l = isoTimes.length; i < l; i++) {
      if ((isoTimes[i][1] as RegExp).exec(match[3])) {
        // match[2] should be 'T' or space
        timeFormat = (match[2] || ' ') + isoTimes[i][0];
        break;
      }
    }
    if (!timeFormat) {
      return createInvalid();
    }
  }

  if (!allowTime && timeFormat != null) {
    return createInvalid();
  }

  if (match[4]) {
    if (tzRegex.exec(match[4])) {
      tzFormat = 'Z';
    } else {
      return createInvalid();
    }
  }

  const _format = dateFormat + (timeFormat || '') + (tzFormat || '');

  return configFromStringAndFormat(input, _format, locale);
}

// src/lib/create/vadid.js
// todo: drop flags
export function createInvalid(flags?: Object): Date {
  return new Date(NaN);
  // var m = createUTC(NaN);
  // if (flags != null) {
  //   extend(getParsingFlags(m), flags);
  // }
  // else {
  //   getParsingFlags(m).userInvalidated = true;
  // }
  //
  // return m;
}

// src/lib/create/from-string-and-format.js
// from string and format
// date from string and format string
export function configFromStringAndFormat(input: string, format: string, locale: Locale): Date {
  const _strict = false;
  // TODO: Move this to another part of the creation flow to prevent circular deps
  // if (config._f === hooks.ISO_8601) {
  //   configFromISO(config);
  //   return;
  // }
  // if (config._f === hooks.RFC_2822) {
  //   configFromRFC2822(config);
  //   return;
  // }
  // config._a = [];
  // todo: who are you?
  let _dateArray: DateArray = [];
  // getParsingFlags(config).empty = true;

  // This array is used to make a Date, either with `new Date` or `Date.UTC`
  let _input = input;
  let i, parsedInput, token, skipped,
    totalParsedInputLength = 0;

  const stringLength = _input.length;
  const tokens = expandFormat(format, locale).match(formattingTokens) || [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];
    parsedInput = (_input.match(getParseRegexForToken(token, locale)) || [])[0];
    // console.log('token', token, 'parsedInput', parsedInput,
    //         'regex', getParseRegexForToken(token, config));
    if (parsedInput) {
      skipped = _input.substr(0, _input.indexOf(parsedInput));
      // if (skipped.length > 0) {
      //   getParsingFlags(config).unusedInput.push(skipped);
      // }
      _input = _input.slice(_input.indexOf(parsedInput) + parsedInput.length);
      totalParsedInputLength += parsedInput.length;
    }
    // don't parse if it's not a known token
    if (formatTokenFunctions[token]) {
      // if (parsedInput) {
      //   getParsingFlags(config).empty = false;
      // }
      // else {
      //   getParsingFlags(config).unusedTokens.push(token);
      // }
      _dateArray = addTimeToArrayFromToken(token, parsedInput, _dateArray, locale);
    }
    // else if (_strict && !parsedInput) {
      // getParsingFlags(config).unusedTokens.push(token);
    // }
  }

  // add remaining unparsed input length to the string
  // getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  // if (_input.length > 0) {
    // getParsingFlags(config).unusedInput.push(_input);
  // }

  // clear _12h flag if hour is <= 12
  // if (_dateArray[HOUR] <= 12 &&
  //   getParsingFlags(config).bigHour === true &&
  //   _dateArray[HOUR] > 0) {
  //   getParsingFlags(config).bigHour = undefined;
  // }

  // getParsingFlags(config).parsedDateParts = _dateArray.slice(0);
  // getParsingFlags(config).meridiem = config._meridiem;
  // handle meridiem
  // _dateArray[HOUR] = meridiemFixWrap(config._locale, _dateArray[HOUR], config._meridiem);

  return configFromArray(_dateArray);
  // checkOverflow(config);
}

// src/lib/create/from-string-and-array.js
// date from string and array of format strings
// export function configFromStringAndArray(config) {
//   var tempConfig,
//     bestMoment,
//
//     scoreToBeat,
//     i,
//     currentScore;
//
//   // if (config._f.length === 0) {
//   //   getParsingFlags(config).invalidFormat = true;
//   //   config._d = new Date(NaN);
//   //   return;
//   // }
//
//   for (i = 0; i < config._f.length; i++) {
//     currentScore = 0;
//     tempConfig = copyConfig({}, config);
//     if (config._useUTC != null) {
//       tempConfig._useUTC = config._useUTC;
//     }
//     tempConfig._f = config._f[i];
//     configFromStringAndFormat(tempConfig);
//
//     if (!isValid(tempConfig)) {
//       continue;
//     }
//
//     // if there is any input that was not parsed add a penalty for that format
//     currentScore += getParsingFlags(tempConfig).charsLeftOver;
//
//     //or tokens
//     currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
//
//     getParsingFlags(tempConfig).score = currentScore;
//
//     if (scoreToBeat == null || currentScore < scoreToBeat) {
//       scoreToBeat = currentScore;
//       bestMoment = tempConfig;
//     }
//   }
//
//   extend(config, bestMoment || tempConfig);
// }
