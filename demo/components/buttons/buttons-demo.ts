import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {BUTTON_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./buttons-demo.html');

@Component({
  selector: 'buttons-demo',
  template: template,
  directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ButtonsDemoComponent {
  public singleModel:string = '1';
  public radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};
}
