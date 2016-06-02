import {Component, Input} from '@angular/core';
import {TAB_DIRECTIVES} from '../../ng2-bootstrap';

let template = require('./demo-section.template.html');

@Component({
  selector: 'demo-section',
  directives: [TAB_DIRECTIVES],
  template: template
})
export class DemoSectionComponent {
  @Input() public name:string;
  @Input() public titleDoc:string;
  @Input() public src:string;
  @Input() public html:string;
  @Input() public ts:string;
  @Input() public doc:string;
}
