import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapseModule } from '../collapse/collapse.module';
import { AccordionPanelComponent } from './accordion-group.component';
import { AccordionComponent } from './accordion.component';
import { AccordionConfig } from './accordion.config';
export var AccordionModule = (function () {
    function AccordionModule() {
    }
    AccordionModule.forRoot = function () { return { ngModule: AccordionModule, providers: [AccordionConfig] }; };
    AccordionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CollapseModule],
                    declarations: [AccordionComponent, AccordionPanelComponent],
                    exports: [AccordionComponent, AccordionPanelComponent]
                },] },
    ];
    /** @nocollapse */
    AccordionModule.ctorParameters = function () { return []; };
    return AccordionModule;
}());
//# sourceMappingURL=accordion.module.js.map