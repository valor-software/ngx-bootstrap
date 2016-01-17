import {Component} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

// switch bs3\bs4 templates
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../../../ng2-bootstrap';

import {PROGRESSBAR_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let templates:any = {
  // fix: in beta.1 progress bar is broken https://github.com/angular/angular/issues/6382
  // check and try
  // [Ng2BootstrapTheme.BS3]: require('./progressbar-demo.html'),
  [Ng2BootstrapTheme.BS3]: `
  <h3>In Angular2 beta.1 progressbar will not work because of known <a href="https://github.com/angular/angular/issues/6382">issue #6382</a></h3>
  <h4>please check version for <a href="http://valor-software.github.io/ng2-bootstrap/index-bs4.html#progressbar">bootstrap 4</a>, it is still working</h4>
  `,
  [Ng2BootstrapTheme.BS4]: require('./progressbar-demo-bs4.html')
};

@Component({
  selector: 'progressbar-demo',
  directives: [PROGRESSBAR_DIRECTIVES, CORE_DIRECTIVES],
  template: templates[Ng2BootstrapConfig.theme]
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
