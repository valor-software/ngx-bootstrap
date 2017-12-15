import { createLocal } from './parse';

export { formatDate } from './format';
export { createLocal } from './parse';

export {
  defineLocale,
  getSetGlobalLocale,
  listLocales
} from './locale/locales.service';
export { LocaleData } from './locale/locale.class';

console.log(createLocal('Jan', 'MMM'));
