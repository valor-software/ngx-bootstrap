import { DateParsingConfig } from './parsing.types';
import { getParsingFlags } from './parsing-flags';

export function isValid(config: DateParsingConfig): boolean {
  if (config._isValid == null) {
    const flags = getParsingFlags(config);
    const parsedParts = Array.prototype.some.call(flags.parsedDateParts, function (i: number) {
      return i != null;
    });
    let isNowValid = !isNaN(config._d && config._d.getTime()) &&
      flags.overflow < 0 &&
      !flags.empty &&
      !flags.invalidMonth &&
      !flags.invalidWeekday &&
      !flags.weekdayMismatch &&
      !flags.nullInput &&
      !flags.invalidFormat &&
      !flags.userInvalidated &&
      (!flags.meridiem || (flags.meridiem && parsedParts));

    if (config._strict) {
      isNowValid = isNowValid &&
        flags.charsLeftOver === 0 &&
        flags.unusedTokens.length === 0 &&
        flags.bigHour === undefined;
    }

    if (Object.isFrozen == null || !Object.isFrozen(config)) {
      config._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }

  return config._isValid;
}

export function createInvalid(config: DateParsingConfig, flags?: { nullInput: boolean }): DateParsingConfig {
  config._d = new Date(NaN);
  Object.assign(getParsingFlags(config), flags || { userInvalidated: true });

  return config;
}

export function markInvalid(config: DateParsingConfig): DateParsingConfig {
  config._isValid = false;

  return config;
}
