"use strict";
// todo: add animations when https://github.com/angular/angular/issues/9947 solved
var core_1 = require('@angular/core');
var CollapseDirective = (function () {
    function CollapseDirective(_el, _renderer) {
        /** This event fires as soon as content collapses */
        this.collapsed = new core_1.EventEmitter();
        /** This event fires as soon as content becomes visible */
        this.expanded = new core_1.EventEmitter();
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
        get: function () {
            return this.isExpanded;
        },
        /** A flag indicating visibility of content (shown or hidden) */
        set: function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /** allows to manually toggle content visibility */
    CollapseDirective.prototype.toggle = function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /** allows to manually hide content */
    CollapseDirective.prototype.hide = function () {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapse = true;
        this.isCollapsing = false;
        this.display = 'none';
        this.collapsed.emit(this);
    };
    /** allows to manually show collapsed content */
    CollapseDirective.prototype.show = function () {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.display = 'block';
        // this.height = 'auto';
        this.isCollapse = true;
        this.isCollapsing = false;
        this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
        this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
        this.expanded.emit(this);
    };
    CollapseDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[collapse]' /*,
                    animations: [
                      trigger('active', [
                        state('void', style({height: 0})),
                        state('closed', style({height: 0})),
                        state('open', style({height: '*'})),
                        transition('void => closed', [animate(0)]),
                        transition('closed => open', [animate('350ms ease-out')]),
                        transition('open => closed', [animate('350ms ease-out')])
                      ])
                    ]*/
                },] },
    ];
    /** @nocollapse */
    CollapseDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    CollapseDirective.propDecorators = {
        'collapsed': [{ type: core_1.Output },],
        'expanded': [{ type: core_1.Output },],
        'display': [{ type: core_1.HostBinding, args: ['style.display',] },],
        'isExpanded': [{ type: core_1.HostBinding, args: ['class.in',] }, { type: core_1.HostBinding, args: ['attr.aria-expanded',] },],
        'isCollapsed': [{ type: core_1.HostBinding, args: ['attr.aria-hidden',] },],
        'isCollapse': [{ type: core_1.HostBinding, args: ['class.collapse',] },],
        'isCollapsing': [{ type: core_1.HostBinding, args: ['class.collapsing',] },],
        'collapse': [{ type: core_1.Input },],
    };
    return CollapseDirective;
}());
exports.CollapseDirective = CollapseDirective;
