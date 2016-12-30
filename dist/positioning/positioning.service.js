"use strict";
var core_1 = require('@angular/core');
var ng_positioning_1 = require('./ng-positioning');
var PositioningService = (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        ng_positioning_1.positionElements(this._getHtmlElement(target), this._getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.prototype._getHtmlElement = function (element) {
        // it means that we got a selector
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
        if (element instanceof core_1.ElementRef) {
            return element.nativeElement;
        }
        return element;
    };
    PositioningService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return []; };
    return PositioningService;
}());
exports.PositioningService = PositioningService;
