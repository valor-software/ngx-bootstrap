import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-basic',
  templateUrl: './basic.html'
})
export class DemoDatepickerBasicComponent {
  value = new Date();
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 10));

  onDateChange(val) {
    console.log(val);
    console.log(this.value);
  }

  changeMaxDate() {
    this.maxDate = new Date(this.maxDate.setDate(this.maxDate.getDate() + 2));
  }
}
