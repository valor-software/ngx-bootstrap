import { Directive, EventEmitter, HostBinding, Input, Output, ElementRef, Renderer2 } from '@angular/core';
import { TabsetComponent } from './tabset.component';
var TabDirective = (function () {
    function TabDirective(tabset, elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
        this.removed = new EventEmitter();
        this.addClass = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "customClass", {
        /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
        get: function () {
            return this._customClass;
        },
        set: function (customClass) {
            var _this = this;
            if (this.customClass) {
                this.customClass.split(' ').forEach(function (cssClass) {
                    _this.renderer.removeClass(_this.elementRef.nativeElement, cssClass);
                });
            }
            this._customClass = customClass ? customClass.trim() : null;
            if (this.customClass) {
                this.customClass.split(' ').forEach(function (cssClass) {
                    _this.renderer.addClass(_this.elementRef.nativeElement, cssClass);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabDirective.prototype, "active", {
        /** tab active state toggle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this._active === active) {
                return;
            }
            if ((this.disabled && active) || !active) {
                if (this._active && !active) {
                    this.deselect.emit(this);
                    this._active = active;
                }
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
    TabDirective.prototype.ngOnDestroy = function () {
        this.tabset.removeTab(this, { reselect: false, emit: false });
    };
    TabDirective.decorators = [
        { type: Directive, args: [{ selector: 'tab, [tab]' },] },
    ];
    /** @nocollapse */
    TabDirective.ctorParameters = function () { return [
        { type: TabsetComponent, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    TabDirective.propDecorators = {
        'heading': [{ type: Input },],
        'id': [{ type: HostBinding, args: ['attr.id',] }, { type: Input },],
        'disabled': [{ type: Input },],
        'removable': [{ type: Input },],
        'customClass': [{ type: Input },],
        'active': [{ type: HostBinding, args: ['class.active',] }, { type: Input },],
        'select': [{ type: Output },],
        'deselect': [{ type: Output },],
        'removed': [{ type: Output },],
        'addClass': [{ type: HostBinding, args: ['class.tab-pane',] },],
    };
    return TabDirective;
}());
export { TabDirective };
//# sourceMappingURL=tab.directive.js.map