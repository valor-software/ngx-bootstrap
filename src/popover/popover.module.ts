import { NgModule, ModuleWithProviders } from '@angular/core';
import { PopoverConfig } from './popover-config';
import { ComponentLoaderFactory } from '../component-loader';
import { PositioningService } from '../positioning';
import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';

export { PopoverConfig } from './popover-config';

@NgModule({
  declarations: [PopoverDirective, PopoverContainerComponent],
  exports: [PopoverDirective],
  entryComponents: [PopoverContainerComponent]
})
export class PopoverModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PopoverModule,
      providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
    };
  }
}
