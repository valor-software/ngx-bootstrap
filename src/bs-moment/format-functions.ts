import { Locale } from './locale/locale.class';
import { zeroFill } from './utils';
import { isFunction } from './utils/type-checks';
import { DateFormatterFn } from './types';

export let formatFunctions: {
  [key: string]: (date: Date, locale: Locale) => string;
} = {};
export let formatTokenFunctions: { [key: string]: DateFormatterFn } = {};

// tslint:disable-next-line
export const formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
export function addFormatToken(
  token: string,
  padded: { [key: number]: any },
  ordinal: string,
  callback: DateFormatterFn
): void {
  const func: DateFormatterFn = callback;
  if (token) {
    formatTokenFunctions[token] = func;
  }
  if (padded as { [key: number]: any }) {
    const key = padded[0] as string;
    formatTokenFunctions[key] = function(
      date: Date,
      format: string,
      locale?: Locale
    ): string {
      return zeroFill(
        func.apply(null, arguments),
        padded[1] as number,
        padded[2] as boolean
      );
    };
  }
  if (ordinal) {
    formatTokenFunctions[ordinal] = function(
      date: Date,
      format: string,
      locale: Locale
    ): string {
      // todo: fix this
      return locale.ordinal(func.apply(null, arguments), token);
    };
  }
}

export function makeFormatFunction(
  format: string
): (date: Date, locale: Locale) => string {
  const array: string[] = format.match(formattingTokens);
  const length = array.length;
  const formatArr: string[] | DateFormatterFn[] = new Array(length);
  for (let i = 0; i < length; i++) {
    formatArr[i] = formatTokenFunctions[array[i]]
      ? formatTokenFunctions[array[i]]
      : removeFormattingTokens(array[i]);
  }

  return function(date: Date, locale: Locale): string {
    let output = '';
    for (let j = 0; j < length; j++) {
      output += isFunction(formatArr[j] as DateFormatterFn)
        ? (formatArr[j] as DateFormatterFn).call(null, date, format, locale)
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
