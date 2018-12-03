import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-min-mode',
  templateUrl: './min-mode.component.html'
})
export class DemoDatepickerMinModeComponent {
  bsValue: Date = new Date(2017, 7);

  /* tslint:disable-next-line: no-any*/
  bsConfig: any;

  constructor () {
    this.bsConfig = Object.assign({}, {
      minMode : 'month'
    });
  }
}
