import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-date-picker-startingday',
  templateUrl: './date-picker-startingday.html'
})
export class DemoDatePickerStartingdayComponent {
    public startingDay: number;
    public bsConfig: Partial<BsDatepickerConfig>;

    constructor() {
        this.startingDay = 1;
        this.bsConfig = Object.assign({}, {startingDay: this.startingDay});
    }

  _bsValue: Date;
  get bsValue(): Date {
    return this._bsValue;
  }

  set bsValue(v: Date) {
    console.log(v);
    this._bsValue = v;
  }



  log(v: any) {console.log(v);}
}