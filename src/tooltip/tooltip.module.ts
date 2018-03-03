import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderModule } from 'ngx-bootstrap/component-loader';

@NgModule({
  imports: [CommonModule, ComponentLoaderModule],
  declarations: [TooltipDirective, TooltipContainerComponent],
  exports: [TooltipDirective],
  entryComponents: [TooltipContainerComponent]
})
export class TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TooltipModule,
      providers: [TooltipConfig]
    };
  }
}
