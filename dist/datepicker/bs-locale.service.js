import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var BsLocaleService = (function () {
    function BsLocaleService() {
        this._defaultLocale = 'en';
        this._locale = new BehaviorSubject(this._defaultLocale);
        this._localeChange = this._locale.asObservable();
    }
    Object.defineProperty(BsLocaleService.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsLocaleService.prototype, "localeChange", {
        get: function () {
            return this._localeChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsLocaleService.prototype, "currentLocale", {
        get: function () {
            return this._locale.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BsLocaleService.prototype.use = function (locale) {
        if (locale === this.currentLocale) {
            return;
        }
        this._locale.next(locale);
    };
    BsLocaleService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BsLocaleService.ctorParameters = function () { return []; };
    return BsLocaleService;
}());
export { BsLocaleService };
//# sourceMappingURL=bs-locale.service.js.map