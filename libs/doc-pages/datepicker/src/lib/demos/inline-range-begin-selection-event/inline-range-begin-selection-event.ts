import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-inline',
  templateUrl: './inline-range-begin-selection-event.html'
})
export class InlineRangeBeginSelectionEventComponent {
  startDate?: Date;
  endDate?: Date;

  public valueBeginChange(event: Date[]) {
    this.startDate = event[0];
    this.endDate = undefined;
  }

  public valueChange(event: Date[]) {
    this.endDate = event[1];
  }
}
