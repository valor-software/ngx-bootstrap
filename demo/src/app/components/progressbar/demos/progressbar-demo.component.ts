import { Component } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from 'ng2-bootstrap';

// switch bs3\bs4 templates
// webpack html imports
let templates:any = {
  [Ng2BootstrapTheme.BS3]: require('./progressbar-demo.component.html'),
  [Ng2BootstrapTheme.BS4]: require('./progressbar-demo-bs4.component.html')
};

@Component({
  selector: 'progressbar-demo',
  template: templates[Ng2BootstrapConfig.theme]
})
export class ProgressbarDemoComponent {
  public max:number = 200;
  public showWarning:boolean;
  public dynamic:number;
  public type:string;
  public stacked:any[] = [];

  public constructor() {
    this.random();
    this.randomStacked();
  }

  public random():void {
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

  public randomStacked():void {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let total = 0;
    let n = Math.floor((Math.random() * 4) + 1);
    for (let i = 0; i < n; i++) {
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
