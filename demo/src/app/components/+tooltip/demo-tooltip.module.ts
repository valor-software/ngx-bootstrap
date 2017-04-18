import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '../../shared';
import { TooltipSectionComponent } from './tooltip-section.component';
import { DEMO_COMPONENTS } from './demos/index';
import { routes } from './demo-tooltip.routes';

@NgModule({
  declarations: [
    TooltipSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TooltipSectionComponent]
})
export class DemoTooltipModule {}
