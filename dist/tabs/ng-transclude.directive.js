"use strict";
var core_1 = require('@angular/core');
var NgTranscludeDirective = (function () {
    function NgTranscludeDirective(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(NgTranscludeDirective.prototype, "ngTransclude", {
        get: function () {
            return this._ngTransclude;
        },
        set: function (templateRef) {
            this._ngTransclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgTranscludeDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngTransclude]'
                },] },
    ];
    /** @nocollapse */
    NgTranscludeDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    NgTranscludeDirective.propDecorators = {
        'ngTransclude': [{ type: core_1.Input },],
    };
    return NgTranscludeDirective;
}());
exports.NgTranscludeDirective = NgTranscludeDirective;
