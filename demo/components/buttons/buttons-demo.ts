/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
} from 'angular2/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/common';

import {ButtonCheckbox, ButtonRadio} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./buttons-demo.html');

@Component({
  selector: 'buttons-demo'
})
@View({
  template: template,
  directives: [
    ButtonCheckbox, ButtonRadio,
    CORE_DIRECTIVES, FORM_DIRECTIVES
  ]
})
export class ButtonsDemo {
  private singleModel:string = '1';
  private radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};
}
