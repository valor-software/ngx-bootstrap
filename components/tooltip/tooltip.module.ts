import {NgModule} from '@angular/core';
import {TooltipDirective} from './tooltip.directive';
import {TooltipContainerComponent} from './tooltip-container.component';

@NgModule({
    declarations: [TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective, TooltipContainerComponent]
})
export class TooltipModule {}
