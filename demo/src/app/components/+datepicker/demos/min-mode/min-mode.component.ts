import { Component, OnInit } from '@angular/core';

import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-min-mode',
  templateUrl: './min-mode.component.html'
})
export class DemoDatepickerMinModeComponent implements OnInit {
  bsValue: Date = new Date(2017, 7);
  minMode: BsDatepickerViewMode = 'month';

  bsConfig: Partial<BsDatepickerConfig>;

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode
    });
  }
}
