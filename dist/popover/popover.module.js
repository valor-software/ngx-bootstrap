import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderFactory } from '../component-loader/index';
import { PositioningService } from '../positioning/index';
import { PopoverConfig } from './popover.config';
import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';
var PopoverModule = (function () {
    function PopoverModule() {
    }
    PopoverModule.forRoot = function () {
        return {
            ngModule: PopoverModule,
            providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
        };
    };
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [PopoverDirective, PopoverContainerComponent],
                    exports: [PopoverDirective],
                    entryComponents: [PopoverContainerComponent]
                },] },
    ];
    /** @nocollapse */
    PopoverModule.ctorParameters = function () { return []; };
    return PopoverModule;
}());
export { PopoverModule };
//# sourceMappingURL=popover.module.js.map