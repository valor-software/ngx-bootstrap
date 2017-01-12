"use strict";
var core_1 = require('@angular/core');
var carousel_component_1 = require('./carousel.component');
var SlideComponent = (function () {
    function SlideComponent(carousel) {
        /** Wraps element by appropriate CSS classes */
        this.addClass = true;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    SlideComponent.prototype.ngOnInit = function () {
        this.carousel.addSlide(this);
    };
    /** Fires changes in container collection after removing of this slide instance */
    SlideComponent.prototype.ngOnDestroy = function () {
        this.carousel.removeSlide(this);
    };
    SlideComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'slide',
                    template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: carousel_component_1.CarouselComponent, },
    ]; };
    SlideComponent.propDecorators = {
        'active': [{ type: core_1.HostBinding, args: ['class.active',] }, { type: core_1.Input },],
        'addClass': [{ type: core_1.HostBinding, args: ['class.item',] }, { type: core_1.HostBinding, args: ['class.carousel-item',] },],
    };
    return SlideComponent;
}());
exports.SlideComponent = SlideComponent;
