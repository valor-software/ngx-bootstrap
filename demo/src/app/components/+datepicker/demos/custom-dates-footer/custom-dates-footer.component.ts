import { Component } from '@angular/core';
import { BsCustomDates } from '../../../../../../../src/datepicker';

@Component({
  selector: 'custom-dates-footer',
  templateUrl: './custom-dates-footer.component.html'
})
export class DemoCustomDatesFooterComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();
  afterMonth: Date = new Date();
  afterYear: Date = new Date();
  customDatesForDatePicker: BsCustomDates[] = [];
  customDatesForDateRangePicker: BsCustomDates[] = [];

  constructor() {
    this.maxDate = new Date(2020, 0, 1);
    this.afterYear.setDate(this.minDate.getDate() + 365);
    this.afterMonth.setDate(this.minDate.getDate() + 30);
    this.setCustomDatesForDatePicker();
    this.setCustomDatesForRangeDatePicker();
  }
  private setCustomDatesForDatePicker() {
   this.customDatesForDatePicker.push({label: 'Today', value : this.minDate});
   this.customDatesForDatePicker.push({label: 'Max', value : this.maxDate});
  }

  private setCustomDatesForRangeDatePicker() {
    this.customDatesForDateRangePicker.push({label: 'Today', value : this.minDate});
    this.customDatesForDateRangePicker.push({label: 'After Month', value : this.afterMonth});
    this.customDatesForDateRangePicker.push({label: 'After Year', value : this.afterYear});
    this.customDatesForDateRangePicker.push({label: 'Max', value : this.maxDate});
  }

}
