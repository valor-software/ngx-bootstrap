/// <reference path="../../tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var common_1 = require('../common');
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
var Tabset = (function () {
    function Tabset() {
        this.tabs = [];
    }
    Object.defineProperty(Tabset.prototype, "classMap", {
        get: function () {
            var map = {
                'nav-stacked': this.vertical,
                'nav-justified': this.justified
            };
            map['nav-' + (this.type || 'tabs')] = true;
            return map;
        },
        enumerable: true,
        configurable: true
    });
    Tabset.prototype.onInit = function () {
        this.type = this.type !== 'undefined' ? this.type : 'tabs';
    };
    Tabset.prototype.addTab = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    Tabset.prototype.removeTab = function (tab) {
        var index = this.tabs.indexOf(tab);
        if (index === -1) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && this.tabs.length > 1) {
            // If this is the last tab, select the previous tab. else, the next tab.
            var newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
            this.tabs[newActiveIndex].active = true;
        }
        this.tabs.slice(index, 1);
    };
    Tabset = __decorate([
        angular2_1.Component({
            selector: 'tabset',
            properties: ['vertical', 'justified', 'type'],
            lifecycle: [angular2_1.LifecycleEvent.onInit]
        }),
        angular2_1.View({
            template: "\n    <div>\n      <ul class=\"nav\" [ng-class]=\"classMap\">\n          <li *ng-for=\"#tabz of tabs\" [ng-class]=\"{active: tabz.active, disabled: tabz.disabled}\">\n            <a href (^click)=\"tabz.active = true\">\n              <span  [ng-transclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            </a>\n          </li>\n      </ul>\n      <div class=\"tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.NgClass, common_1.NgTransclude]
        })
    ], Tabset);
    return Tabset;
})();
exports.Tabset = Tabset;
// TODO: templateUrl?
var Tab = (function () {
    function Tab(tabset) {
        this.tabset = tabset;
        this.select = new angular2_1.EventEmitter();
        this.deselect = new angular2_1.EventEmitter();
        this.tabset.addTab(this);
    }
    Object.defineProperty(Tab.prototype, "disable", {
        /** DEPRECATE disable */
        get: function () {
            return this.disabled;
        },
        set: function (v) {
            console.warn('DEPRECATED use `disabled` property (not `disable`)');
            this.disabled = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "active", {
        /** tab active state toogle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                this.deselect.next(this);
                return;
            }
            this._active = active;
            this.select.next(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Tab.prototype.onCheck = function () {
    };
    Tab.prototype.onInit = function () {
    };
    Tab.prototype.onDestroy = function () {
        this.tabset.removeTab(this);
    };
    Tab = __decorate([
        angular2_1.Directive({
            selector: 'tab, [tab]',
            properties: ['active', 'disable', 'disabled', 'heading'],
            events: ['select', 'deselect'],
            host: {
                '[class.tab-pane]': 'true',
                '[class.active]': 'active'
            },
            lifecycle: [angular2_1.LifecycleEvent.onInit, angular2_1.LifecycleEvent.onDestroy,
                angular2_1.LifecycleEvent.onCheck]
        })
    ], Tab);
    return Tab;
})();
exports.Tab = Tab;
var TabHeading = (function () {
    function TabHeading(templateRef, tab) {
        this.templateRef = templateRef;
        tab.headingRef = templateRef;
    }
    TabHeading = __decorate([
        angular2_1.Directive({ selector: '[tab-heading]' })
    ], TabHeading);
    return TabHeading;
})();
exports.TabHeading = TabHeading;
exports.tabs = [Tab, TabHeading, Tabset];
