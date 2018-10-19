import { Component, HostBinding, Inject, Input, Output, EventEmitter } from '@angular/core';
import { isBs3 } from '../utils/theme-provider';
import { AccordionComponent } from './accordion.component';
/**
 * ### Accordion heading
 * Instead of using `heading` attribute on the `accordion-group`, you can use
 * an `accordion-heading` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
var AccordionPanelComponent = (function () {
    function AccordionPanelComponent(accordion) {
        /** Emits when the opened state changes */
        this.isOpenChange = new EventEmitter();
        this._isOpen = false;
        this.accordion = accordion;
    }
    Object.defineProperty(AccordionPanelComponent.prototype, "isOpen", {
        // Questionable, maybe .panel-open should be on child div.panel element?
        /** Is accordion group open or closed. This property supports two-way binding */
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            var _this = this;
            if (value !== this.isOpen) {
                if (value) {
                    this.accordion.closeOtherPanels(this);
                }
                this._isOpen = value;
                Promise.resolve(null).then(function () {
                    _this.isOpenChange.emit(value);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionPanelComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    AccordionPanelComponent.prototype.ngOnInit = function () {
        this.panelClass = this.panelClass || 'panel-default';
        this.accordion.addGroup(this);
    };
    AccordionPanelComponent.prototype.ngOnDestroy = function () {
        this.accordion.removeGroup(this);
    };
    AccordionPanelComponent.prototype.toggleOpen = function (event) {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    };
    AccordionPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'accordion-group, accordion-panel',
                    template: "<div class=\"panel card\" [ngClass]=\"panelClass\"> <div class=\"panel-heading card-header\" role=\"tab\" (click)=\"toggleOpen($event)\"> <div class=\"panel-title\"> <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\"> <div *ngIf=\"heading\" [ngClass]=\"{'text-muted': isDisabled}\"> {{ heading }} </div> <ng-content select=\"[accordion-heading]\"></ng-content> </div> </div> </div> <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\"> <div class=\"panel-body card-block card-body\"> <ng-content></ng-content> </div> </div> </div> ",
                    host: {
                        class: 'panel',
                        style: 'display: block'
                    }
                },] },
    ];
    /** @nocollapse */
    AccordionPanelComponent.ctorParameters = function () { return [
        { type: AccordionComponent, decorators: [{ type: Inject, args: [AccordionComponent,] },] },
    ]; };
    AccordionPanelComponent.propDecorators = {
        'heading': [{ type: Input },],
        'panelClass': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'isOpenChange': [{ type: Output },],
        'isOpen': [{ type: HostBinding, args: ['class.panel-open',] }, { type: Input },],
    };
    return AccordionPanelComponent;
}());
export { AccordionPanelComponent };
//# sourceMappingURL=accordion-group.component.js.map