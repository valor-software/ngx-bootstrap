// tslint:disable:max-line-length
import { hasOwnProp, isArray, isFunction, isNumber, isString, toInt } from '../utils/type-checks';
import { DateParsingConfig } from '../create/parsing.types';
import { DateArray, DateParseTokenFn } from '../types';

const tokens: {[key: string]: DateParseTokenFn} = {};

export function addParseToken(token: string | string[], callback: DateParseTokenFn | number) {
  const _token = isString(token) ? [token] : token;
  let func = callback;

  if (isNumber(callback)) {
    func = function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
      array[callback] = toInt(input);

      return config;
    };
  }

  if (isArray<string>(_token) && isFunction(func)) {
    let i;
    for (i = 0; i < _token.length; i++) {
      tokens[_token[i]] = func;
    }
  }
}

export function addWeekParseToken(token: string[], callback: DateParseTokenFn): void {
  addParseToken(token, function (input: string, array: DateArray, config: DateParsingConfig, _token: string): DateParsingConfig {
    config._w = config._w || {};

    return callback(input, config._w, config, _token);
  });
}


export function addTimeToArrayFromToken(token: string, input: string, config: DateParsingConfig): DateParsingConfig {
  if (input != null && hasOwnProp(tokens, token)) {
    tokens[token](input, config._a, config, token);
  }

  return config;
}
