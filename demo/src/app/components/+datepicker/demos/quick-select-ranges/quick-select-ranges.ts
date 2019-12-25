import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-quick-select-ranges',
  templateUrl: './quick-select-ranges.html'
})
export class DemoDatePickerQuickSelectRangesComponent {

  ranges: any = [{
    value: [new Date('12-18-2019'), new Date('12-25-2019')],
    label: 'Last 7 Days'
  }, {
    value: [new Date('12-25-2019'), new Date('01-01-2020')],
    label: 'Next 7 Days'
  }];

}
