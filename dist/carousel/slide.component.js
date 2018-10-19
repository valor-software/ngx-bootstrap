import { Component, HostBinding, Input } from '@angular/core';
import { CarouselComponent } from './carousel.component';
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
        { type: Component, args: [{
                    selector: 'slide',
                    template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    host: {
                        '[attr.aria-hidden]': '!active'
                    }
                },] },
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: CarouselComponent, },
    ]; };
    SlideComponent.propDecorators = {
        'active': [{ type: HostBinding, args: ['class.active',] }, { type: Input },],
        'addClass': [{ type: HostBinding, args: ['class.item',] }, { type: HostBinding, args: ['class.carousel-item',] },],
    };
    return SlideComponent;
}());
export { SlideComponent };
//# sourceMappingURL=slide.component.js.map