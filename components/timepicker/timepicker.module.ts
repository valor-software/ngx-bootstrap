import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import  {TimepickerComponent} from './timepicker.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TimepickerComponent],
    exports: [TimepickerComponent]
})
export class TimepickerModule {}
