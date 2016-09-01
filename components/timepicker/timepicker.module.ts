import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import  { TimepickerComponent } from './timepicker.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimepickerComponent],
  exports: [TimepickerComponent]
})
export class TimepickerModule {
}
