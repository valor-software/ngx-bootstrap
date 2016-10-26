import { Component } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../../../ng2-bootstrap';

// switch bs3\bs4 templates
// webpack html imports
let templates: any = {
  [Ng2BootstrapTheme.BS3]: require('./slider-demo.html'),
  [Ng2BootstrapTheme.BS4]: require('./slider-demo.html')
};

@Component({
  selector: 'slider-demo',
  template: templates[Ng2BootstrapConfig.theme]
})
export class SliderDemoComponent {
  public max:number = 200;
  public min:number = 0;
  public step:number = 1;
  public dynamic:number;

  public constructor() {
    this.random();
  }

  public random():void {
    this.dynamic = Math.floor((Math.random() * 150) + 1);
  }

  public changeMax():void {
    this.max = this.max === 200 ? 500 : 200;
  }

  public changeMin():void {
    this.min = this.min === 0 ? -100 : 0;
  }

  public toggleStep(): void {
    this.step = this.step === 1 ? 20 : 1;
  }

}
