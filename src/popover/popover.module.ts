import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentLoaderFactory } from '../component-loader/index';
import { PositioningService } from '../positioning/index';
import { PopoverConfig } from './popover.config';
import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PopoverDirective, PopoverContainerComponent],
  exports: [PopoverDirective],
  entryComponents: [PopoverContainerComponent]
})
export class PopoverModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PopoverModule,
      providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
    };
  }
}
