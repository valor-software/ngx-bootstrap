import { getSetGlobalLocale } from './locales.service';
import { toInt } from '../utils/type-checks';

getSetGlobalLocale('sv', {
  dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
  ordinal: num => {
      const b = num % 10;
      // tslint:disable-next-line:no-bitwise
      const output = (~~(num % 100 / 10) === 1) ? 'e' :
          (b === 1) ? 'a' :
          (b === 2) ? 'a' :
          (b === 3) ? 'e' : 'e';

      return num + output;
  }
});
