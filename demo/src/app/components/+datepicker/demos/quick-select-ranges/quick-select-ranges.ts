import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-quick-select-ranges',
  templateUrl: './quick-select-ranges.html'
})
export class DemoDatePickerQuickSelectRangesComponent {
  ranges: any = [{
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Last 7 Days'
  }, {
    value: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
    label: 'Next 7 Days'
  }];

}
