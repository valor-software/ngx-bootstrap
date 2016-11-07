import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { DatepickerDemoComponent } from './demos/datepicker-demo.component';
import { DatepickerSectionComponent } from './datepicker-section.component';
import { DatepickerModule } from '../../../../dist/components/datepicker/datepicker.module';

@NgModule({
  declarations:[
    DatepickerDemoComponent,
    DatepickerSectionComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    SharedModule,
    DatepickerModule
  ],
  exports: [DatepickerSectionComponent]
})
export class DatepickerDocModule {

}
