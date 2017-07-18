import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatePickerComponent } from './datepicker.component';
import { DayPickerComponent } from './daypicker.component';
import { MonthPickerComponent } from './monthpicker.component';
import { YearPickerComponent } from './yearpicker.component';
import { DatepickerConfig } from './datepicker.config';
import { DatepickerService } from './datepicker.service';
import { DatePickerMenuLeftComponent } from './datepicker-menu-left.component';
import { DatePickerMenuRightComponent } from './datepicker-menu-right.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent,
                 MonthPickerComponent, YearPickerComponent, DatePickerMenuLeftComponent,
                 DatePickerMenuRightComponent],
  exports: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent,
            MonthPickerComponent, YearPickerComponent],
  entryComponents: [DatePickerComponent],
  providers: [DatepickerService]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: DatepickerModule, providers: [DatepickerConfig]};
  }
}
