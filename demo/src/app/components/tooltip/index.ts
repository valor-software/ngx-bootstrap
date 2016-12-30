import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TooltipSectionComponent } from './tooltip-section.component';
import { TooltipModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos/index';

@NgModule({
  declarations: [
    TooltipSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TooltipModule.forRoot()
  ],
  exports: [TooltipSectionComponent]
})
export class DemoTooltipModule {}
