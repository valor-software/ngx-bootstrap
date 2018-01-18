import { hasOwnProp, isFunction } from '../utils/type-checks';
import { Locale } from '../locale/locale.class';

export const match1 = /\d/;            //       0 - 9
export const match2 = /\d\d/;          //      00 - 99
export const match3 = /\d{3}/;         //     000 - 999
export const match4 = /\d{4}/;         //    0000 - 9999
export const match6 = /[+-]?\d{6}/;    // -999999 - 999999
export const match1to2 = /\d\d?/;         //       0 - 99
export const match3to4 = /\d\d\d\d?/;     //     999 - 9999
export const match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
export const match1to3 = /\d{1,3}/;       //       0 - 999
export const match1to4 = /\d{1,4}/;       //       0 - 9999
export const match1to6 = /[+-]?\d{1,6}/;  // -999999 - 999999

export const matchUnsigned = /\d+/;           //       0 - inf
export const matchSigned = /[+-]?\d+/;      //    -inf - inf

export const matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
export const matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

export const matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
// tslint:disable-next-line
export const matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

export type RegExpTokenFn = (isStrict: boolean, locale: Locale) => RegExp;
const regexes: {[key: string]: RegExpTokenFn} = {};


export function addRegexToken(token: string, regex: RegExp | RegExpTokenFn, strictRegex?: RegExp): void {
  if (isFunction(regex)) {
    regexes[token] = regex;

    return;
  }

  regexes[token] = function (isStrict: boolean, locale: Locale) {
    return (isStrict && strictRegex) ? strictRegex : regex;
  };
}

export function getParseRegexForToken(token: string, locale: Locale): RegExp {
  const _strict = false;
  if (!hasOwnProp(regexes, token)) {
    return new RegExp(unescapeFormat(token));
  }

  return regexes[token](_strict, locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(str: string): string {
  // tslint:disable-next-line
  return regexEscape(str
    .replace('\\', '')
    .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (matched, p1, p2, p3, p4) => p1 || p2 || p3 || p4)
  );
}

export function regexEscape(str: string): string {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
