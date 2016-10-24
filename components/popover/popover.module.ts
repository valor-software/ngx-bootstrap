import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PopoverContainerComponent } from './popover-container.component';
import { PopoverDirective } from './popover.directive';
import { ComponentsHelper } from '../utils/components-helper.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PopoverDirective, PopoverContainerComponent],
  exports: [PopoverDirective, PopoverContainerComponent],
  providers: [ComponentsHelper],
  entryComponents: [PopoverContainerComponent]
})
export class PopoverModule {
}
