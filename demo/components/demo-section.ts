import {Component, Input} from 'angular2/core';
import {TAB_DIRECTIVES} from '../../ng2-bootstrap';

let template = require('./demo-section.template.html');

@Component({
  selector: 'demo-section',
  directives: [TAB_DIRECTIVES],
  template: template
})

export class DemoSection {
  @Input()
  private name:string;
  @Input()
  private titleDoc:string;
  @Input()
  private src:string;
  @Input()
  private html:string;
  @Input()
  private ts:string;
  @Input()
  private doc:string;
}
