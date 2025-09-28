import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'unlinked-calendar-views',
  templateUrl: './unlinked-calendar-views.component.html',
  standalone: false
})
export class UnlinkedCalendarsComponent {
  dateRangePickerValue?: (Date | undefined)[];
  range1: Date = new Date(2020, 5, 10);
  range2: Date = new Date(2022, 8, 10);
  ngOnInit(): void {
    this.dateRangePickerValue = [this.range1, this.range2];
  }
}
