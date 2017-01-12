"use strict";
var core_1 = require('@angular/core');
var progressbar_config_1 = require('./progressbar.config');
var ProgressbarComponent = (function () {
    function ProgressbarComponent(config) {
        Object.assign(this, config);
    }
    ProgressbarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'progressbar',
                    template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: progressbar_config_1.ProgressbarConfig, },
    ]; };
    ProgressbarComponent.propDecorators = {
        'animate': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
    };
    return ProgressbarComponent;
}());
exports.ProgressbarComponent = ProgressbarComponent;
