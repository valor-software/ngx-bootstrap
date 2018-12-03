import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-min-mode',
  templateUrl: './min-mode.component.html'
})
export class DemoDatepickerMinModeComponent {
  bsValue:Date = new Date(2017, 7);

  bsConfig:any;//Partial<BsDatepickerConfig>;

  constructor () {
    this.bsConfig = Object.assign({}, {
      minMode : 'month'
    });
  }
}
