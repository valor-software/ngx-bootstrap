/// <reference path="../../../tsd.d.ts" />

import {Component, View} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {Alert} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./alert-demo.html');

@Component({
  selector: 'alert-demo'
})
@View({
  template: template,
  directives: [Alert, CORE_DIRECTIVES]
})
export class AlertDemo {
  alerts:Array<Object> = [
    {
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    },
    {
      type: 'success',
      msg: 'Well done! You successfully read this important alert message.',
      closable: true
    }
  ];

  closeAlert(i:number) {
    this.alerts.splice(i, 1);
  }

  addAlert() {
    this.alerts.push({msg: 'Another alert!', closable: true});
  }
}
