import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class BsLocaleService {
    private _defaultLocale;
    private _locale;
    private _localeChange;
    readonly locale: BehaviorSubject<string>;
    readonly localeChange: Observable<string>;
    readonly currentLocale: string;
    use(locale: string): void;
}
