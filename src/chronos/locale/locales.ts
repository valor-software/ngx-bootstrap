// internal storage for locale config files
import { Locale, LocaleData } from './locale.class';
import { baseConfig } from './locale.defaults';
import { hasOwnProp, isArray, isObject, isString, isUndefined, toInt } from '../utils/type-checks';
import { compareArrays } from '../utils/compare-arrays';

import { initWeek } from '../units/week';
import { initWeekYear } from '../units/week-year';
import { initYear } from '../units/year';
import { initTimezone } from '../units/timezone';
import { initTimestamp } from '../units/timestamp';
import { initSecond } from '../units/second';
import { initQuarter } from '../units/quarter';
import { initOffset } from '../units/offset';
import { initMinute } from '../units/minute';
import { initMillisecond } from '../units/millisecond';
import { initMonth } from '../units/month';
import { initHour } from '../units/hour';
import { initDayOfYear } from '../units/day-of-year';
import { initDayOfWeek } from '../units/day-of-week';
import { initDayOfMonth } from '../units/day-of-month';

const locales: { [key: string]: Locale } = {};
const localeFamilies: { [key: string]: {name: string; config: LocaleData}[] } = {};
let globalLocale: Locale;

function normalizeLocale(key: string): string {
  return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least,
// but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names: string[]): Locale {
  let next;
  let locale;
  let i = 0;

  while (i < names.length) {
    const split = normalizeLocale(names[i]).split('-');
    let j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split('-') : null;
    while (j > 0) {
      locale = loadLocale(split.slice(0, j).join('-'));
      if (locale) {
        return locale;
      }
      if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
        // the next array item is better than a shallower substring of this one
        break;
      }
      j--;
    }
    i++;
  }

  return null;
}

export function mergeConfigs(parentConfig: LocaleData,
                             childConfig: LocaleData) {
  const res: LocaleData = Object.assign({}, parentConfig);

  for (const childProp in childConfig) {
    if (!hasOwnProp(childConfig, childProp)) {
      continue;
    }

    if (isObject(parentConfig[childProp]) && isObject(childConfig[childProp])) {
      res[childProp as any] = {};
      Object.assign(res[childProp], parentConfig[childProp]);
      Object.assign(res[childProp], childConfig[childProp]);
    } else if (childConfig[childProp] != null) {
      res[childProp as any] = childConfig[childProp];
    } else {
      delete res[childProp as any];
    }
  }
  for (const parentProp in parentConfig) {
    if (
      hasOwnProp(parentConfig, parentProp) &&
      !hasOwnProp(childConfig, parentProp) &&
      isObject(parentConfig[parentProp as keyof LocaleData])
    ) {
      // make sure changes to properties don't modify parent config
      res[parentProp as any] = Object.assign({}, res[parentProp as keyof LocaleData]);
    }
  }

  return res;
}


function loadLocale(name: string): Locale {
  // no way!
  /* var oldLocale = null;
   // TODO: Find a better way to register and load all the locales in Node
   if (!locales[name] && (typeof module !== 'undefined') &&
     module && module.exports) {
     try {
       oldLocale = globalLocale._abbr;
       var aliasedRequire = require;
       aliasedRequire('./locale/' + name);
       getSetGlobalLocale(oldLocale);
     } catch (e) {}
   }*/
  if (!locales[name]) {
    console.error(`Khronos locale error: please load locale "${name}" before using it`);
    // throw new Error(`Khronos locale error: please load locale "${name}" before using it`);
  }

  return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
export function getSetGlobalLocale(key?: string | string[], values?: LocaleData): string {
  let data: Locale;

  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else if (isString(key)) {
      data = defineLocale(key, values);
    }

    if (data) {
      globalLocale = data;
    }
  }

  return globalLocale && globalLocale._abbr;
}

export function defineLocale(name: string, config?: LocaleData): Locale {
  if (config === null) {
    // useful for testing
    delete locales[name];
    globalLocale = getLocale('en');

    return null;
  }

  if (!config) {
    return;
  }

  let parentConfig = baseConfig;
  config.abbr = name;
  if (config.parentLocale != null) {
    if (locales[config.parentLocale] != null) {
      parentConfig = locales[config.parentLocale]._config;
    } else {
      if (!localeFamilies[config.parentLocale]) {
        localeFamilies[config.parentLocale] = [];
      }
      localeFamilies[config.parentLocale].push({ name, config });

      return null;
    }
  }

  locales[name] = new Locale(mergeConfigs(parentConfig, config));

  if (localeFamilies[name]) {
    localeFamilies[name].forEach(function (x) {
      defineLocale(x.name, x.config);
    });
  }

  // backwards compat for now: also set the locale
  // make sure we set the locale AFTER all child locales have been
  // created, so we won't end up with the child locale set.
  getSetGlobalLocale(name);


  return locales[name];
}

export function updateLocale(name: string, config?: LocaleData): Locale {
  let _config = config;

  if (_config != null) {
    let parentConfig = baseConfig;
    // MERGE
    const tmpLocale = loadLocale(name);
    if (tmpLocale != null) {
      parentConfig = tmpLocale._config;
    }
    _config = mergeConfigs(parentConfig, _config);
    const locale = new Locale(_config);
    locale.parentLocale = locales[name];
    locales[name] = locale;

    // backwards compat for now: also set the locale
    getSetGlobalLocale(name);
  } else {
    // pass null for config to unupdate, useful for tests
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }

  return locales[name];
}

// returns locale data
export function getLocale(key?: string | string[]): Locale {
  setDefaultLocale();

  if (!key) {
    return globalLocale;
  }
  // let locale;
  const _key = isArray(key) ? key : [key];

  return chooseLocale(_key);
}

export function listLocales(): string[] {
  return Object.keys(locales);
}

function setDefaultLocale(): void {
  if (locales[`en`]) {

    return undefined;
  }

  getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal(num: number): string {
      const b = num % 10;
      const output =
        toInt((num % 100) / 10) === 1
          ? 'th'
          : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';

      return num + output;
    }
  });

  initWeek();
  initWeekYear();
  initYear();
  initTimezone();
  initTimestamp();
  initSecond();
  initQuarter();
  initOffset();
  initMonth();
  initMinute();
  initMillisecond();
  initHour();
  initDayOfYear();
  initDayOfWeek();
  initDayOfMonth();
}
