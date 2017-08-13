import { Component, HostBinding, Input } from '@angular/core';
import { TabsetConfig } from './tabset.config';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
export var TabsetComponent = (function () {
    function TabsetComponent(config) {
        this.clazz = true;
        this.tabs = [];
        this.classMap = {};
        Object.assign(this, config);
    }
    Object.defineProperty(TabsetComponent.prototype, "vertical", {
        /** if true tabs will be placed vertically */
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "justified", {
        /** if true tabs fill the container and have a consistent width */
        get: function () {
            return this._justified;
        },
        set: function (value) {
            this._justified = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "type", {
        /** navigation context class: 'tabs' or 'pills' */
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    TabsetComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    TabsetComponent.prototype.addTab = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabsetComponent.prototype.removeTab = function (tab, options) {
        if (options === void 0) { options = { reselect: true, emit: true }; }
        var index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
            var newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        if (options.emit) {
            tab.removed.emit(tab);
        }
        this.tabs.splice(index, 1);
        if (tab.elementRef.nativeElement.parentNode) {
            tab.elementRef.nativeElement.parentNode.removeChild(tab.elementRef.nativeElement);
        }
    };
    TabsetComponent.prototype.getClosestTabIndex = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (var step = 1; step <= tabsLength; step += 1) {
            var prevIndex = index - step;
            var nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    };
    TabsetComponent.prototype.hasAvailableTabs = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (var i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    };
    TabsetComponent.prototype.setClassMap = function () {
        this.classMap = (_a = {
                'nav-stacked': this.vertical,
                'nav-justified': this.justified
            },
            _a["nav-" + this.type] = true,
            _a
        );
        var _a;
    };
    TabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tabset',
                    template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" [ngClass]=\"['nav-item', tabz.customClass || '']\"\n          [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\">\n          <a href=\"javascript:void(0);\" class=\"nav-link\"\n            [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"glyphicon glyphicon-remove-circle\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return [
        { type: TabsetConfig, },
    ]; };
    TabsetComponent.propDecorators = {
        'vertical': [{ type: Input },],
        'justified': [{ type: Input },],
        'type': [{ type: Input },],
        'clazz': [{ type: HostBinding, args: ['class.tab-container',] },],
    };
    return TabsetComponent;
}());
//# sourceMappingURL=tabset.component.js.map