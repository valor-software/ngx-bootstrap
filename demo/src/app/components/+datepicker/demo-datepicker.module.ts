import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../shared';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-datepicker.routes';

@NgModule({
  declarations:[
    DatepickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports:[
    DatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [DatepickerSectionComponent]
})
export class DemoDatepickerModule {
}
