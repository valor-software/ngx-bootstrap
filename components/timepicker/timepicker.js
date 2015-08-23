/// <reference path="../../tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
// todo: implement global configuration via DI
// todo: refactor directive has to many functions! (extract to stateless helper)
// todo: use moment js?
// todo: implement `time` validator
// todo: replace increment/decrement blockers with getters, or extract
// todo: unify work with selected
exports.timepickerConfig = {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: true,
    meridians: null,
    readonlyInput: false,
    mousewheel: true,
    arrowkeys: true,
    showSpinners: true,
    min: undefined,
    max: undefined
};
function isDefined(value) {
    return typeof value !== 'undefined';
}
function def(value, fn, defaultValue) {
    return fn(value) ? value : defaultValue;
}
function addMinutes(date, minutes) {
    var dt = new Date(date.getTime() + minutes * 60000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes());
    return newDate;
}
// TODO: templateUrl
var Timepicker = (function (_super) {
    __extends(Timepicker, _super);
    function Timepicker(cd, renderer, elementRef) {
        _super.call(this, cd, renderer, elementRef);
        // result value
        this._selected = new Date();
        this.meridians = ['AM', 'PM']; // ??
    }
    Object.defineProperty(Timepicker.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (v) {
            if (v) {
                this._selected = v;
                this.updateTemplate();
                this.cd.viewToModelUpdate(this.selected);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timepicker.prototype, "showMeridian", {
        get: function () {
            return this._showMeridian;
        },
        set: function (value) {
            this._showMeridian = value;
            // || !this.$error.time
            if (true) {
                this.updateTemplate();
                return;
            }
            // Evaluate from template
            var hours = this.getHoursFromTemplate();
            var minutes = this.getMinutesFromTemplate();
            if (isDefined(hours) && isDefined(minutes)) {
                this.selected.setHours(hours);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    // todo: add formatter value to Date object
    Timepicker.prototype.onInit = function () {
        // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
        this.meridians = def(this.meridians, isDefined, exports.timepickerConfig.meridians) || ['AM', 'PM'];
        this.mousewheel = def(this.mousewheel, isDefined, exports.timepickerConfig.mousewheel);
        if (this.mousewheel) {
            this.setupMousewheelEvents();
        }
        this.arrowkeys = def(this.arrowkeys, isDefined, exports.timepickerConfig.arrowkeys);
        if (this.arrowkeys) {
            this.setupArrowkeyEvents();
        }
        this.readonlyInput = def(this.readonlyInput, isDefined, exports.timepickerConfig.readonlyInput);
        this.setupInputEvents();
        this.hourStep = def(this.hourStep, isDefined, exports.timepickerConfig.hourStep);
        this.minuteStep = def(this.minuteStep, isDefined, exports.timepickerConfig.minuteStep);
        this.min = def(this.min, isDefined, exports.timepickerConfig.min);
        this.max = def(this.max, isDefined, exports.timepickerConfig.max);
        // 12H / 24H mode
        this.showMeridian = def(this.showMeridian, isDefined, exports.timepickerConfig.showMeridian);
        this.showSpinners = def(this.showSpinners, isDefined, exports.timepickerConfig.showSpinners);
    };
    Timepicker.prototype.writeValue = function (v) {
        this.selected = v ? new Date(v) : null;
        // todo: implement logic from render
    };
    Timepicker.prototype.refresh = function (type) {
        // this.makeValid();
        this.updateTemplate();
        this.cd.viewToModelUpdate(this.selected);
    };
    Timepicker.prototype.updateTemplate = function (keyboardChange) {
        var hours = this.selected.getHours();
        var minutes = this.selected.getMinutes();
        if (this.showMeridian) {
            // Convert 24 to 12 hour system
            hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
        }
        // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);
        // if (keyboardChange !== 'm') {
        //  this.minutes = this.pad(minutes);
        // }
        this.hours = this.pad(hours);
        this.minutes = this.pad(minutes);
        this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    };
    Timepicker.prototype.getHoursFromTemplate = function () {
        var hours = parseInt(this.hours, 10);
        var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
        if (!valid) {
            return undefined;
        }
        if (this.showMeridian) {
            if (hours === 12) {
                hours = 0;
            }
            if (this.meridian === this.meridians[1]) {
                hours = hours + 12;
            }
        }
        return hours;
    };
    Timepicker.prototype.getMinutesFromTemplate = function () {
        var minutes = parseInt(this.minutes, 10);
        return (minutes >= 0 && minutes < 60) ? minutes : undefined;
    };
    Timepicker.prototype.pad = function (value) {
        return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
    };
    Timepicker.prototype.setupMousewheelEvents = function () {
    };
    Timepicker.prototype.setupArrowkeyEvents = function () {
    };
    Timepicker.prototype.setupInputEvents = function () {
    };
    Timepicker.prototype.updateHours = function () {
        if (this.readonlyInput) {
            return;
        }
        var hours = this.getHoursFromTemplate();
        var minutes = this.getMinutesFromTemplate();
        if (!isDefined(hours) || !isDefined(minutes)) {
        }
        this.selected.setHours(hours);
        if (this.selected < this.min || this.selected > this.max) {
        }
        else {
            this.refresh('h');
        }
    };
    Timepicker.prototype.hoursOnBlur = function (event) {
        if (this.readonlyInput) {
            return;
        }
        // todo: binded with validation
        if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
            this.hours = this.pad(this.hours);
        }
    };
    Timepicker.prototype.updateMinutes = function () {
        if (this.readonlyInput) {
            return;
        }
        var minutes = this.getMinutesFromTemplate();
        var hours = this.getHoursFromTemplate();
        if (!isDefined(minutes) || !isDefined(hours)) {
        }
        this.selected.setMinutes(minutes);
        if (this.selected < this.min || this.selected > this.max) {
        }
        else {
            this.refresh('m');
        }
    };
    Timepicker.prototype.minutesOnBlur = function (event) {
        if (this.readonlyInput) {
            return;
        }
        if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
            this.minutes = this.pad(this.minutes);
        }
    };
    Timepicker.prototype.noIncrementHours = function () {
        var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
        return incrementedSelected > this.max ||
            (incrementedSelected < this.selected && incrementedSelected < this.min);
    };
    Timepicker.prototype.noDecrementHours = function () {
        var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
        return decrementedSelected < this.min ||
            (decrementedSelected > this.selected && decrementedSelected > this.max);
    };
    Timepicker.prototype.noIncrementMinutes = function () {
        var incrementedSelected = addMinutes(this.selected, this.minuteStep);
        return incrementedSelected > this.max ||
            (incrementedSelected < this.selected && incrementedSelected < this.min);
    };
    Timepicker.prototype.noDecrementMinutes = function () {
        var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
        return decrementedSelected < this.min ||
            (decrementedSelected > this.selected && decrementedSelected > this.max);
    };
    Timepicker.prototype.addMinutesToSelected = function (minutes) {
        this.selected = addMinutes(this.selected, minutes);
        this.refresh();
    };
    Timepicker.prototype.noToggleMeridian = function () {
        if (this.selected.getHours() < 13) {
            return addMinutes(this.selected, 12 * 60) > this.max;
        }
        else {
            return addMinutes(this.selected, -12 * 60) < this.min;
        }
    };
    Timepicker.prototype.incrementHours = function () {
        if (!this.noIncrementHours()) {
            this.addMinutesToSelected(this.hourStep * 60);
        }
    };
    Timepicker.prototype.decrementHours = function () {
        if (!this.noDecrementHours()) {
            this.addMinutesToSelected(-this.hourStep * 60);
        }
    };
    Timepicker.prototype.incrementMinutes = function () {
        if (!this.noIncrementMinutes()) {
            this.addMinutesToSelected(this.minuteStep);
        }
    };
    Timepicker.prototype.decrementMinutes = function () {
        if (!this.noDecrementMinutes()) {
            this.addMinutesToSelected(-this.minuteStep);
        }
    };
    Timepicker.prototype.toggleMeridian = function () {
        if (!this.noToggleMeridian()) {
            var sign = this.selected.getHours() < 12 ? 1 : -1;
            this.addMinutesToSelected(12 * 60 * sign);
        }
    };
    Timepicker = __decorate([
        angular2_1.Component({
            selector: 'timepicker',
            properties: [
                'hourStep',
                'minuteStep',
                'showMeridian',
                'meridians',
                'readonlyInput',
                'mousewheel',
                'arrowkeys',
                'showSpinners',
                'min',
                'max'
            ],
            lifecycle: [angular2_1.LifecycleEvent.onInit]
        }),
        angular2_1.View({
            template: "\n    <table>\n      <tbody>\n        <tr class=\"text-center\" [ng-class]=\"{hidden: !showSpinners}\">\n          <td><a (^click)=\"incrementHours()\" [ng-class]=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (^click)=\"incrementMinutes()\" [ng-class]=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td [ng-class]=\"{hidden: !showMeridian}\"></td>\n        </tr>\n        <tr>\n          <td class=\"form-group\" [ng-class]=\"{'has-error': invalidHours}\">\n            <input style=\"width:50px;\" type=\"text\" [(ng-model)]=\"hours\" (change)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"hoursOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td>:</td>\n          <td class=\"form-group\" [ng-class]=\"{'has-error': invalidMinutes}\">\n            <input style=\"width:50px;\" type=\"text\" [(ng-model)]=\"minutes\" (change)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"minutesOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td [ng-class]=\"{hidden: !showMeridian}\"><button type=\"button\" [ng-class]=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n        </tr>\n        <tr class=\"text-center\" [ng-class]=\"{hidden: !showSpinners}\">\n          <td><a (^click)=\"decrementHours()\" [ng-class]=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (^click)=\"decrementMinutes()\" [ng-class]=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td [ng-class]=\"{hidden: !showMeridian}\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.NgClass]
        }),
        __param(0, angular2_1.Self())
    ], Timepicker);
    return Timepicker;
})(angular2_1.DefaultValueAccessor);
exports.Timepicker = Timepicker;
