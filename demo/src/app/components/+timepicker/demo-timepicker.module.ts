import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { SharedModule } from '../../shared';
import { TimepickerSectionComponent } from './timepicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-timepicker.routes';

@NgModule({
  declarations: [TimepickerSectionComponent, ...DEMO_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TimepickerModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [TimepickerSectionComponent]
})
export class DemoTimepickerModule {}
