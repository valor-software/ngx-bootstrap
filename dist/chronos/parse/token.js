// tslint:disable:max-line-length
import { hasOwnProp, isArray, isFunction, isNumber, isString, toInt } from '../utils/type-checks';
var tokens = {};
export function addParseToken(token, callback) {
    var _token = isString(token) ? [token] : token;
    var func = callback;
    if (isNumber(callback)) {
        func = function (input, array, config) {
            array[callback] = toInt(input);
            return config;
        };
    }
    if (isArray(_token) && isFunction(func)) {
        var i = void 0;
        for (i = 0; i < _token.length; i++) {
            tokens[_token[i]] = func;
        }
    }
}
export function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, _token) {
        config._w = config._w || {};
        return callback(input, config._w, config, _token);
    });
}
export function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
    return config;
}
//# sourceMappingURL=token.js.map