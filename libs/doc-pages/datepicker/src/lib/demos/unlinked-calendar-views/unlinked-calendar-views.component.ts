import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'datepicker-unlinked-calendar-views',
  templateUrl: './unlinked-calendar-views.component.html',
  standalone: false
})
export class UnlinkedCalendarsComponent {
  dateRangePickerValue?: (Date | undefined)[];
  range1: Date = new Date(1979, 9, 27);
  range2: Date = new Date(1985, 3, 2);
  ngOnInit(): void {
    this.dateRangePickerValue = [this.range1, this.range2];
  }
}
