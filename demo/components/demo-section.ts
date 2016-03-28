import {Component, Input} from 'angular2/core';

let template = require('./demo-section.template.html');

@Component({
  selector: 'demo-section',
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
