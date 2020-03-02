import { Component } from '@angular/core';
import { DatepickerDateTooltipText } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-tooltip-to-selected-dates',
  templateUrl: './tooltip-to-selected-dates.html'
})
export class DemoDatePickerTooltipToSelectedDates {
  selectedDates : DatepickerDateTooltipText[] = [{ date: new Date('2020-03-03'), tooltipText: '3rd of March'},
    { date: new Date('2020-03-04'), tooltipText: '4th of March'},
    { date: new Date('2020-03-05'), tooltipText: '5th of March'}
  ]
}
