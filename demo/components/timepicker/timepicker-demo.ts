/// <reference path="../../../tsd.d.ts" />
import {
  Component, View,
} from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import {Timepicker} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./timepicker-demo.html');

@Component({
  selector: 'timepicker-demo'
})
@View({
  template: template,
  directives: [Timepicker, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TimepickerDemo {
  private hstep:number = 1;
  private mstep:number = 15;
  private ismeridian:boolean = true;

  private mytime:Date = new Date();
  private options:any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  private toggleMode():void {
    this.ismeridian = !this.ismeridian;
  };

  private update():void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  };

  private changed():void {
    console.log('Time changed to: ' + this.mytime);
  };

  private clear():void {
    this.mytime = null;
  };
}
