import { addFormatToken } from '../format-functions';
import { unix } from '../utils/date-getters';
import { addRegexToken, matchSigned, matchTimestamp } from '../parse/regex';
import { addParseToken} from '../parse/token';
import { toInt } from '../utils/type-checks';
import { DateArray } from '../types';

// FORMATTING

addFormatToken('X', null, null, function (date: Date): string {
  return unix(date).toString(10);
});
addFormatToken('x', null, null, function (date: Date): string {
  return date.valueOf().toString(10);
});

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);

addParseToken('X', function (input: string): DateArray {
  return getDateArray(new Date(parseFloat(input) * 1000));
});

addParseToken('x', function (input: string): DateArray {
  return getDateArray(new Date(toInt(input)));
});

export function getDateArray(date: Date): DateArray {
  return [date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()];
}
