import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatePickerComponent } from './datepicker.component';
import { DayPickerComponent } from './daypicker.component';
import { MonthPickerComponent } from './monthpicker.component';
import { YearPickerComponent } from './yearpicker.component';
import { DatepickerConfig } from './datepicker.config';
export var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    DatepickerModule.forRoot = function () {
        return { ngModule: DatepickerModule, providers: [DatepickerConfig] };
    };
    DatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent,
                        MonthPickerComponent, YearPickerComponent],
                    exports: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent,
                        MonthPickerComponent, YearPickerComponent],
                    entryComponents: [DatePickerComponent]
                },] },
    ];
    /** @nocollapse */
    DatepickerModule.ctorParameters = function () { return []; };
    return DatepickerModule;
}());
//# sourceMappingURL=datepicker.module.js.map