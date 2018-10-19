import { Locale, LocaleData } from './locale.class';
export declare function mergeConfigs(parentConfig: LocaleData, childConfig: LocaleData): LocaleData;
export declare function getSetGlobalLocale(key?: string | string[], values?: LocaleData): string;
export declare function defineLocale(name: string, config?: LocaleData): Locale;
export declare function updateLocale(name: string, config?: LocaleData): Locale;
export declare function getLocale(key?: string | string[]): Locale;
export declare function listLocales(): string[];
