import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-inline',
  templateUrl: './inline-datepicker.component.html'
})
export class DemoDatepickerInlineComponent {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 4);
    this.bsInlineRangeValue = [this.bsInlineValue, new Date(new Date().setDate(new Date().getDate() +7))];
    console.log(this.bsInlineRangeValue);
  }
}
