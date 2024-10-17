import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [CommonModule, TooltipDirective, TooltipContainerComponent],
    exports: [TooltipDirective]
})
export class TooltipModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<TooltipModule> {
    return {
      ngModule: TooltipModule,
      providers: []
    };
  }
}
