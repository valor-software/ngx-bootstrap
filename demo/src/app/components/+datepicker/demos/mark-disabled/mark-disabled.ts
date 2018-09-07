import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-mark-disabled',
  templateUrl: './mark-disabled.html'
})
export class DemoDatePickerMarkDisabledComponent {

  markDisabled(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

}
