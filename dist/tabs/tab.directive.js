"use strict";
var core_1 = require('@angular/core');
var tabset_component_1 = require('./tabset.component');
var TabDirective = (function () {
    function TabDirective(tabset) {
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new core_1.EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new core_1.EventEmitter();
        /** fired before tab will be removed */
        this.removed = new core_1.EventEmitter();
        this.addClass = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        /** tab active state toggle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                this.deselect.emit(this);
                return;
            }
            this._active = active;
            this.select.emit(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
    };
    TabDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'tab, [tab]' },] },
    ];
    /** @nocollapse */
    TabDirective.ctorParameters = function () { return [
        { type: tabset_component_1.TabsetComponent, },
    ]; };
    TabDirective.propDecorators = {
        'heading': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'removable': [{ type: core_1.Input },],
        'customClass': [{ type: core_1.Input },],
        'active': [{ type: core_1.HostBinding, args: ['class.active',] }, { type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'deselect': [{ type: core_1.Output },],
        'removed': [{ type: core_1.Output },],
        'addClass': [{ type: core_1.HostBinding, args: ['class.tab-pane',] },],
    };
    return TabDirective;
}());
exports.TabDirective = TabDirective;
