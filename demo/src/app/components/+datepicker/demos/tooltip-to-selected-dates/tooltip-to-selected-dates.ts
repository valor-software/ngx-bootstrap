import { Component } from '@angular/core';
import { DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-tooltip-to-selected-dates',
  templateUrl: './tooltip-to-selected-dates.html'
})
export class DemoDatePickerTooltipToSelectedDates {
  selectedDates : DatepickerDateTooltipText[] = [{ date: new Date('2020-08-08'), tooltipText: '8th of August'},
    { date: new Date('2020-08-09'), tooltipText: '9th of August'},
    { date: new Date('2020-08-07'), tooltipText: '7th of August'}
  ]
}
