import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';
import { ComponentsHelper } from '../utils/components-helper.service';
import { TooltipConfig } from './tooltip.config';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective, TooltipContainerComponent],
  exports: [TooltipDirective, TooltipContainerComponent],
  providers: [ComponentsHelper, TooltipConfig],
  entryComponents: [TooltipContainerComponent]
})
export class TooltipModule {
}
