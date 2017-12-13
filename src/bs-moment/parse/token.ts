import { hasOwnProp, isArray, isFunction, isNumber, isString, toInt } from '../utils/type-checks';
import { Locale } from '../locale/locale.class';

export type DateArray = number[];
export type DateParseTokenFn = (input: string, array: DateArray, locale: Locale, token: string) => DateArray;
const tokens: {[key: string]: DateParseTokenFn} = {};

export function addParseToken(token: string | string[], callback: DateParseTokenFn | number) {
  const _token = isString(token) ? [token] : token;
  let func = callback;

  if (isNumber(callback)) {
    func = function (input: string, array: DateArray): DateArray {
      array[callback] = toInt(input);

      return array;
    };
  }

  if (isArray<string>(_token) && isFunction(func)) {
    let i;
    for (i = 0; i < _token.length; i++) {
      tokens[_token[i]] = func;
    }
  }
}
/*
export function addWeekParseToken(token: string | string[], callback: DateParseTokenFn): void {
  addParseToken(token, function (input: string, array: DateArray, locale: Locale, _token: string) {
    // config._w = config._w || {};
    return callback(input, config._w, config, _token);
  });
}*/


export function addTimeToArrayFromToken(token: string, input: string, array: DateArray, locale: Locale): DateArray {
  // (input: string, array: DateArray, locale: Locale, token: string) => DateArray;
  if (input != null && hasOwnProp(tokens, token)) {
    return tokens[token](input, array, locale, token);
  }

  return array;
}

// export function addParseToken (token, callback) {
//     var i, func = callback;
//     if (typeof token === 'string') {
//         token = [token];
//     }
//     if (isNumber(callback)) {
//         func = function (input, array) {
//             array[callback] = toInt(input);
//         };
//     }
//     for (i = 0; i < token.length; i++) {
//         tokens[token[i]] = func;
//     }
// }
//
// export function addWeekParseToken (token, callback) {
//     addParseToken(token, function (input, array, config, token) {
//         config._w = config._w || {};
//         callback(input, config._w, config, token);
//     });
// }
//
// export function addTimeToArrayFromToken(token, input, config) {
//     if (input != null && hasOwnProp(tokens, token)) {
//         tokens[token](input, config._a, config, token);
//     }
// }
