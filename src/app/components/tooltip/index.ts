import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TooltipDemoComponent } from './demos/tooltip-demo.component';
import { TooltipSectionComponent } from './tooltip-section.component';
import { TooltipModule } from '../../../../dist/components/tooltip/tooltip.module';

@NgModule({
  declarations: [
    TooltipDemoComponent,
    TooltipSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TooltipModule
  ],
  exports: [TooltipSectionComponent]
})
export class DemoTooltipModule {}
