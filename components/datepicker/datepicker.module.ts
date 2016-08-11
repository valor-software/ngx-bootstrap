import {NgModule} from '@angular/core';
import {DatePickerPopupDirective} from './datepicker-popup.component';
import {DatePickerComponent} from './datepicker.component';

@NgModule({
    declarations: [DatePickerPopupDirective, DatePickerComponent],
    exports: [DatePickerPopupDirective, DatePickerComponent]
})
export class DatepickerModule {}
