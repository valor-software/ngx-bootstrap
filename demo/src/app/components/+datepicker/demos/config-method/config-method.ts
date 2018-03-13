import { Component, ViewChild } from '@angular/core';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-config-method',
  templateUrl: './config-method.html'
})
export class DemoDatepickerConfigMethodComponent {
  @ViewChild('dp') datepicker: BsDaterangepickerDirective;
  bsConfig: object;
  minDate = new Date(2018, 5, 13);
  setOptions(): void {
    this.bsConfig = Object.assign({}, {minDate: this.minDate});
    this.datepicker.setConfig();
    setTimeout(() => {
      this.datepicker.toggle();
    });
  }
}


