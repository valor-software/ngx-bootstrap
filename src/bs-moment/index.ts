import { parseDate } from './create/local';

export { parseDate } from './create/local';
export { formatDate } from './format';

export {
  defineLocale,
  getSetGlobalLocale,
  listLocales
} from './locale/locales.service';

export { LocaleData } from './locale/locale.class';

console.log(parseDate('Jan', 'MMM'));
