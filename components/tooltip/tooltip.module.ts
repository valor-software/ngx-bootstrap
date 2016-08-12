import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDirective} from './tooltip.directive';
import {TooltipContainerComponent} from './tooltip-container.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective, TooltipContainerComponent]
})
export class TooltipModule {}
