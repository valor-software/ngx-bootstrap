import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatePickerPopupDirective} from './datepicker-popup.component';
import {DatePickerComponent} from './datepicker.component';
import {DatePickerInnerComponent} from './datepicker-inner.component';
import {DayPickerComponent} from './daypicker.component';
import {MonthPickerComponent} from './monthpicker.component';
import {YearPickerComponent} from './yearpicker.component';
// import {DatePickerPopup} from './datepicker-popup';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DatePickerPopupDirective, DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent],
    exports: [DatePickerPopupDirective, DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent]
})
export class DatepickerModule {}
