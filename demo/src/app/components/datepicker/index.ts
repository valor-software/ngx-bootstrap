import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DatepickerModule } from 'ng2-bootstrap';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations:[
    DatepickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports:[
    DatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [DatepickerSectionComponent]
})
export class DemoDatepickerModule {
}
