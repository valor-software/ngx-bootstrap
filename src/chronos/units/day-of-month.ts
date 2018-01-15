import { addFormatToken } from '../format/format';
import { getDate } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { DATE } from './constants';
import { toInt } from '../utils/type-checks';
import { DateArray, DateFormatterOptions } from '../types';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { DateParsingConfig } from '../create/parsing.types';

// FORMATTING

addFormatToken('D', ['DD', 2, false], 'Do',
  function (date: Date, opts: DateFormatterOptions): string {
    return getDate(date, opts.isUTC).toString(10);
  });

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D', match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
  return locale._dayOfMonthOrdinalParse || locale._ordinalParse;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do',
  function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
    array[DATE] = toInt(input.match(match1to2)[0]);

    return config;
  });
