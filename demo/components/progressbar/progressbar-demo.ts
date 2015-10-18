/// <reference path="../../../tsd.d.ts" />
import {Component, View, CORE_DIRECTIVES, NgStyle} from 'angular2/angular2';
// switch bs3\bs4 templates
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../../../components/ng2-bootstrap-config';

import {progressbar} from '../../../ng2-bootstrap';

// webpack html imports
let templates:any = {
  [Ng2BootstrapTheme.BS3]: require('./progressbar-demo.html'),
  [Ng2BootstrapTheme.BS4]: require('./progressbar-demo-bs4.html')
};

@Component({
  selector: 'progressbar-demo'
})
@View({
  template: templates[Ng2BootstrapConfig.theme],
  directives: [progressbar, CORE_DIRECTIVES, NgStyle]
})
export class ProgressbarDemo {
  public max:number = 200;
  public showWarning:boolean;
  public dynamic:number;
  public type:string;
  public stacked:any[] = [];

  constructor() {
    this.random();
    this.randomStacked();
  }

  private random() {
    let value = Math.floor((Math.random() * 100) + 1);
    let type:string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = (type === 'danger' || type === 'warning');
    this.dynamic = value;
    this.type = type;
  };

  private randomStacked() {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let total = 0;
    for (let i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
      let index = Math.floor((Math.random() * 4));
      let value = Math.floor((Math.random() * 30) + 1);
      total += value;
      this.stacked.push({
        value: value,
        max: value, // i !== (n - 1) ? value : 100,
        type: types[index]
      });
    }
  };
}
