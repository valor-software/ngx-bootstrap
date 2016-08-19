import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TooltipContainerComponent} from './tooltip-container.component';
import {TooltipDirective} from './tooltip.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective, TooltipContainerComponent]
})
export class TooltipModule {}
