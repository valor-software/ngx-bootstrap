import { DateParsingConfig } from './parsing.types';
import { createInvalid, isValid } from './valid';
import { getParsingFlags } from './parsing-flags';
import { configFromStringAndFormat } from './from-string-and-format';

// date from string and array of format strings
export function configFromStringAndArray(config: DateParsingConfig): DateParsingConfig {
  let tempConfig;
  let bestMoment;
  let scoreToBeat;
  let currentScore;

  if (!config._f || config._f.length === 0) {
    getParsingFlags(config).invalidFormat = true;

    return createInvalid(config);
  }

  let i;
  for (i = 0; i < config._f.length; i++) {
    currentScore = 0;
    tempConfig = Object.assign({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat(tempConfig);

    if (!isValid(tempConfig)) {
      continue;
    }

    // if there is any input that was not parsed add a penalty for that format
    currentScore += getParsingFlags(tempConfig).charsLeftOver;

    // or tokens
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

    getParsingFlags(tempConfig).score = currentScore;

    if (scoreToBeat == null || currentScore < scoreToBeat) {
      scoreToBeat = currentScore;
      bestMoment = tempConfig;
    }
  }

  return Object.assign(config, bestMoment || tempConfig);
}
