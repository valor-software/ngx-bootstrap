import { Component } from '@angular/core';

@Component({
  selector: 'demo-date-picker-popup',
  templateUrl: './date-picker-popup.html'
})
export class DemoDatePickerPopupComponent {
  public bsValue:any;
  public bsValueArr:any[];
  public config: any = {
    mode: 'date',
    format: {
      currentDate: 'LL'
    }
  };
}
