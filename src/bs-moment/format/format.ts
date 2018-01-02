import { Locale } from '../locale/locale.class';
import { zeroFill } from '../utils/zero-fill';
import { isFunction } from '../utils/type-checks';
import { DateFormatterOptions, DateFormatterFn } from '../types';

export let formatFunctions: {
  [key: string]: (date: Date, locale: Locale, isUTC?: boolean, offset?: number) => string;
} = {};
export let formatTokenFunctions: { [key: string]: DateFormatterFn } = {};

// tslint:disable-next-line
export const formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
export function addFormatToken(token: string,
                               padded: [string, number, boolean],
                               ordinal: string,
                               callback: DateFormatterFn): void {
  if (token) {
    formatTokenFunctions[token] = callback;
  }

  if (padded) {
    formatTokenFunctions[padded[0]] = function (): string {
      return zeroFill(callback.apply(null, arguments), padded[1], padded[2]);
    };
  }

  if (ordinal) {
    formatTokenFunctions[ordinal] = function (date: Date, opts: DateFormatterOptions): string {
      return opts.locale.ordinal(callback.apply(null, arguments), token);
    };
  }
}

export function makeFormatFunction(format: string): (date: Date, locale: Locale, isUTC?: boolean, offset?: number) => string {
  const array: string[] = format.match(formattingTokens);
  const length = array.length;

  const formatArr: string[] | DateFormatterFn[] = new Array(length);

  for (let i = 0; i < length; i++) {
    formatArr[i] = formatTokenFunctions[array[i]]
      ? formatTokenFunctions[array[i]]
      : removeFormattingTokens(array[i]);
  }

  return function (date: Date, locale: Locale, isUTC: boolean, offset = 0): string {
    let output = '';
    for (let j = 0; j < length; j++) {
      output += isFunction(formatArr[j])
        ? (formatArr[j] as DateFormatterFn).call(null, date, {format, locale, isUTC, offset})
        : formatArr[j];
    }

    return output;
  };
}

function removeFormattingTokens(input: string): string {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, '');
  }

  return input.replace(/\\/g, '');
}
