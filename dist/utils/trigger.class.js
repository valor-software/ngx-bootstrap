/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
"use strict";
var Trigger = (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
    return Trigger;
}());
exports.Trigger = Trigger;
