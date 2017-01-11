import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { TimepickerModule } from 'ng2-bootstrap';
import { TimepickerSectionComponent } from './timepicker-section.component';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    TimepickerSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TimepickerModule.forRoot()
  ],
  exports: [TimepickerSectionComponent]
})
export class DemoTimepickerModule {
}
