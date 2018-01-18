import { DateParsingConfig, DateParsingFlags } from './parsing.types';

function defaultParsingFlags(): DateParsingFlags {
  // We need to deep clone this object.
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}

export function getParsingFlags(config: DateParsingConfig): DateParsingFlags {
  if (config._pf == null) {
    config._pf = defaultParsingFlags();
  }

  return config._pf;
}
