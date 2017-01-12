"use strict";
var core_1 = require('@angular/core');
var alert_config_1 = require('./alert.config');
var ALERT_TEMPLATE = "\n<template [ngIf]=\"!isClosed\">\n  <div class=\"alert\" role=\"alert\" [ngClass]=\"classes\">\n    <template [ngIf]=\"dismissible\">\n      <button type=\"button\" class=\"close\" (click)=\"close()\" (touch)=\"close()\">\n        <span aria-hidden=\"true\">&times;</span>\n        <span class=\"sr-only\">Close</span>\n      </button>\n    </template>\n    <ng-content></ng-content>\n  </div>\n</template>\n  ";
var AlertComponent = (function () {
    function AlertComponent(_config) {
        /** Alert type. Provides one of four bootstrap supported contextual classes: `success`, `info`, `warning` and `danger` */
        this.type = 'warning';
        /** If set, displays an inline "Close" button */
        this.dismissible = false;
        this.isClosed = false;
        /** This event fires immediately after close instance method is called, $event is an instance of Alert component. */
        this.onClose = new core_1.EventEmitter(false);
        /** This event fires when alert closed, $event is an instance of Alert component */
        this.onClosed = new core_1.EventEmitter(false);
        this.classes = [];
        Object.assign(this, _config);
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classes[0] = "alert-" + this.type;
        if (this.dismissible) {
            this.classes[1] = 'alert-dismissible';
        }
        else {
            this.classes.length = 1;
        }
        if (this.dismissOnTimeout) {
            // if dismissOnTimeout used as attr without binding, it will be a string
            setTimeout(function () { return _this.close(); }, parseInt(this.dismissOnTimeout, 10));
        }
    };
    // todo: mouse event + touch + pointer
    // todo: animation ` If the .fade and .in classes are present on the element,
    // the alert will fade out before it is removed`
    /**
     * Closes an alert by removing it from the DOM.
     */
    AlertComponent.prototype.close = function () {
        this.onClose.emit(this);
        this.isClosed = true;
        this.onClosed.emit(this);
    };
    AlertComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'alert,ngx-alert',
                    template: ALERT_TEMPLATE
                },] },
    ];
    /** @nocollapse */
    AlertComponent.ctorParameters = function () { return [
        { type: alert_config_1.AlertConfig, },
    ]; };
    AlertComponent.propDecorators = {
        'type': [{ type: core_1.Input },],
        'dismissible': [{ type: core_1.Input },],
        'dismissOnTimeout': [{ type: core_1.Input },],
        'onClose': [{ type: core_1.Output },],
        'onClosed': [{ type: core_1.Output },],
    };
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
