import { DateParsingConfig } from './parsing.types';
import { configFromISO, configFromRFC2822 } from './from-string';
import { expandFormat } from '../format';
import { formattingTokens, formatTokenFunctions } from '../format/format';
import { isArray, isString } from '../utils/type-checks';
import { getParseRegexForToken } from '../parse/regex';
import { addTimeToArrayFromToken } from '../parse/token';
import { HOUR } from '../units/constants';
import { configFromArray } from './from-array';
import { getParsingFlags } from './parsing-flags';
import { checkOverflow } from './check-overflow';
import { Locale } from '../locale/locale.class';

// constant that refers to the ISO standard
// hooks.ISO_8601 = function () {};
export const ISO_8601 = 'ISO_8601';

// constant that refers to the RFC 2822 form
// hooks.RFC_2822 = function () {};
export const RFC_2822 = 'RFC_2822';

// date from string and format string
export function configFromStringAndFormat(config: DateParsingConfig): DateParsingConfig {
  // TODO: Move this to another part of the creation flow to prevent circular deps
  if (config._f === ISO_8601) {
    return configFromISO(config);
  }
  if (config._f === RFC_2822) {
    return configFromRFC2822(config);
  }
  config._a = [];
  getParsingFlags(config).empty = true;

  if (isArray(config._f) || (!config._i && config._i !== 0)) {
    return config;
  }

  // This array is used to make a Date, either with `new Date` or `Date.UTC`

  let input = config._i.toString();
  let totalParsedInputLength = 0;
  const inputLength = input.length;
  const tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

  let i;
  let token;
  let parsedInput;
  let skipped;
  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];
    parsedInput = (input.match(getParseRegexForToken(token, config._locale)) || [])[0];
    if (parsedInput) {
      skipped = input.substr(0, input.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      input = input.slice(input.indexOf(parsedInput) + parsedInput.length);
      totalParsedInputLength += parsedInput.length;
    }
    // don't parse if it's not a known token
    if (formatTokenFunctions[token]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token);
      }

      addTimeToArrayFromToken(token, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token);
    }
  }

  // add remaining unparsed input length to the string
  getParsingFlags(config).charsLeftOver = inputLength - totalParsedInputLength;
  if (input.length > 0) {
    getParsingFlags(config).unusedInput.push(input);
  }

  // clear _12h flag if hour is <= 12
  if (config._a[HOUR] <= 12 &&
    getParsingFlags(config).bigHour === true &&
    config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }

  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  // handle meridiem
  config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

  configFromArray(config);

  return checkOverflow(config);
}


function meridiemFixWrap(locale: Locale, _hour: number, meridiem: string): number {
  let hour = _hour;

  if (meridiem == null) {
    // nothing to do
    return hour;
  }

  if (locale.meridiemHour != null) {
    return locale.meridiemHour(hour, meridiem);
  }

  if (locale.isPM == null) {
    // this is not supposed to happen
    return hour;
  }
  // Fallback
  const isPm = locale.isPM(meridiem);
  if (isPm && hour < 12) {
    hour += 12;
  }

  if (!isPm && hour === 12) {
    hour = 0;
  }

  return hour;
}
