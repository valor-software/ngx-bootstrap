import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils';
export var ProgressbarComponent = (function () {
    function ProgressbarComponent(config) {
        this.isStacked = false;
        Object.assign(this, config);
    }
    Object.defineProperty(ProgressbarComponent.prototype, "value", {
        /** current value of progress bar. Could be a number or array of objects like {"value":15,"type":"info","label":"15 %"} */
        set: function (value) {
            this.isStacked = Array.isArray(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ProgressbarComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    ProgressbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'progressbar',
                    template: "\n    <div progress [animate]=\"animate\" [max]=\"max\" [style.width]=\"!isBs3 ? '100%' : 'auto'\">\n      <bar [type]=\"type\" [value]=\"_value\" *ngIf=\"!isStacked\">\n          <ng-content></ng-content>\n      </bar>\n      <template [ngIf]=\"isStacked\">\n        <bar *ngFor=\"let item of _value\" [type]=\"item.type\" [value]=\"item.value\">{{item.label}}</bar>\n      </template>\n    </div>\n  ",
                    styles: ["\n    :host {\n      width: 100%;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: ProgressbarConfig, },
    ]; };
    ProgressbarComponent.propDecorators = {
        'animate': [{ type: Input },],
        'max': [{ type: Input },],
        'type': [{ type: Input },],
        'value': [{ type: Input },],
    };
    return ProgressbarComponent;
}());
//# sourceMappingURL=progressbar.component.js.map