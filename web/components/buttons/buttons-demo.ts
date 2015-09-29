/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
  CORE_DIRECTIVES, FORM_DIRECTIVES
} from 'angular2/angular2';

import {ButtonCheckbox, ButtonRadio} from '../../../lib/index';

// webpack html imports
let template = require('./buttons-demo.html');

@Component({
  selector: 'buttons-demo'
})
@View({
  template:template,
  directives: [
    ButtonCheckbox, ButtonRadio,
    CORE_DIRECTIVES, FORM_DIRECTIVES
  ]
})
export class ButtonsDemo {
  private singleModel:string = '1';
  private radioModel:string = 'Middle';
  private checkModel:Object = {left: false, middle: true, right: false};
}
