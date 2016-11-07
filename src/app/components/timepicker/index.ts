import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TimepickerModule } from '../../../../dist/components/timepicker';
import { TimepickerSectionComponent } from './timepicker-section.component';
import { TimepickerDemoComponent } from './demos/timepicker-demo.component';

@NgModule({
  declarations: [
    TimepickerDemoComponent,
    TimepickerSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TimepickerModule
  ],
  exports: [TimepickerSectionComponent]
})
export class DemoTimepickerModule {
}
