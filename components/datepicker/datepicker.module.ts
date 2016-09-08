import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsHelper } from '../utils/components-helper.service';

import { DatePickerComponent } from './datepicker.component';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatePickerPopupDirective, PopupContainerComponent } from './datepicker-popup.component';
import { DayPickerComponent } from './daypicker.component';
import { MonthPickerComponent } from './monthpicker.component';
import { YearPickerComponent } from './yearpicker.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatePickerComponent, DatePickerInnerComponent, DatePickerPopupDirective, DayPickerComponent,
                 MonthPickerComponent, PopupContainerComponent, YearPickerComponent],
  exports: [DatePickerComponent, DatePickerPopupDirective, DayPickerComponent, FormsModule, MonthPickerComponent,
            YearPickerComponent],
  providers: [ComponentsHelper]
})
export class DatepickerModule {
}
