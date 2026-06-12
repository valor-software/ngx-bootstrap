import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective]
})
export class TooltipModule {}
