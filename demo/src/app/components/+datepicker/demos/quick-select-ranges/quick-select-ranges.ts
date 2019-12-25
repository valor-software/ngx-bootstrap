import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'demo-datepicker-quick-select-ranges',
  templateUrl: './quick-select-ranges.html'
})
export class DemoDatePickerQuickSelectRangesComponent {

  ranges: any = [{
    value: [new Date(moment().subtract(7, 'days').format('MM-DD-YYYY')), new Date(moment().format('MM-DD-YYYY'))],
    label: 'Last 7 Days'
  }, {
    value: [new Date(moment().format('MM-DD-YYYY')), new Date(moment().add(7, 'days').format('MM-DD-YYYY'))],
    label: 'Next 7 Days'
  }];

}
