import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';

@NgModule({
    imports: [CommonModule, PopoverDirective, PopoverContainerComponent],
    exports: [PopoverDirective]
})
export class PopoverModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return PopoverModule;
  }
}
