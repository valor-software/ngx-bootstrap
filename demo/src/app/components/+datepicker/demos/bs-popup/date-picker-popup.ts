import { Component } from '@angular/core';

@Component({
  selector: 'demo-date-picker-popup',
  templateUrl: './date-picker-popup.html'
})
export class DemoDatePickerPopupComponent {
  public bsValue: any ;
  public bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
