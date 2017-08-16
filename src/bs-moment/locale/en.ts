import { getSetGlobalLocale } from './locales.service';
import { toInt } from '../utils/type-checks';

getSetGlobalLocale('en', {
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (number: number): string {
    const b = number % 10;
    const output = (toInt(number % 100 / 10) === 1) ? 'th' :
      (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
    return number + output;
  }
});
