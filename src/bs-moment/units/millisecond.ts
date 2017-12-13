// tslint:disable:no-bitwise
// FORMATTING

import { addFormatToken } from '../format-functions';
import { addRegexToken, match1, match1to3, match2, match3, matchUnsigned } from '../parse/regex';
import { MILLISECOND } from './constants';
import { toInt } from '../utils/type-checks';
import { addParseToken, DateArray } from '../parse/token';

addFormatToken('S', null, null, function (date: Date): string {
  return (~~(date.getMilliseconds() / 100)).toString(10);
});

addFormatToken(null, ['SS', 2], null, function (date: Date): string {
  return (~~(date.getMilliseconds() / 10)).toString(10);
});

addFormatToken(null, ['SSS', 3], null, function (date: Date): string {
  return (date.getMilliseconds()).toString(10);
});
addFormatToken(null, ['SSSS', 4], null, function (date: Date): string {
  return (date.getMilliseconds() * 10).toString(10);
});
addFormatToken(null, ['SSSSS', 5], null, function (date: Date): string {
  return (date.getMilliseconds() * 100).toString(10);
});
addFormatToken(null, ['SSSSSS', 6], null, function (date: Date): string {
  return (date.getMilliseconds() * 1000).toString(10);
});
addFormatToken(null, ['SSSSSSS', 7], null, function (date: Date): string {
  return (date.getMilliseconds() * 10000).toString(10);
});
addFormatToken(null, ['SSSSSSSS', 8], null, function (date: Date): string {
  return (date.getMilliseconds() * 100000).toString(10);
});
addFormatToken(null, ['SSSSSSSSS', 9], null, function (date: Date): string {
  return (date.getMilliseconds() * 1000000).toString(10);
});


// ALIASES

// addUnitAlias('millisecond', 'ms');

// PRIORITY

// addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S', match1to3, match1);
addRegexToken('SS', match1to3, match2);
addRegexToken('SSS', match1to3, match3);

let token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
  addRegexToken(token, matchUnsigned);
}

function parseMs(input: string, array: DateArray): DateArray {
  array[MILLISECOND] = toInt(parseFloat(`0.${input}`) * 1000);

  return array;
}

for (token = 'S'; token.length <= 9; token += 'S') {
  addParseToken(token, parseMs);
}
// MOMENTS

