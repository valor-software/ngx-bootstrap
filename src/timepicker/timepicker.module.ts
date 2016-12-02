import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import  { TimepickerComponent } from './timepicker.component';
import { TimepickerConfig } from './timepicker.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimepickerComponent],
  exports: [FormsModule, TimepickerComponent],
  providers: [TimepickerConfig]
})
export class TimepickerModule {
}
