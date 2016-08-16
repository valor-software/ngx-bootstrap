import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { TimepickerComponent } from './timepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimepickerComponent],
  exports: [TimepickerComponent]
})
export class TimepickerModule {
}
