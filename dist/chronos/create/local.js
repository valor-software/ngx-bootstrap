import { createLocalOrUTC } from './from-anything';
import { isDate } from '../utils/type-checks';
export function parseDate(input, format, localeKey, strict, isUTC) {
    if (isDate(input)) {
        return input;
    }
    var config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
    return config._d;
}
//# sourceMappingURL=local.js.map