import { parse } from './parse';

export { formatDate } from './format';
export { parse } from './parse';

export {
  defineLocale,
  getSetGlobalLocale,
  listLocales
} from './locale/locales.service';
export { LocaleData } from './locale/locale.class';

console.log(parse('Jan', 'MMM'));
