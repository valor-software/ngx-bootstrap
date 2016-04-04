import { Component } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

import { ACCORDION_DIRECTIVES } from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./accordion-demo.html');

@Component({
  selector: 'accordion-demo',
  template: template,
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AccordionDemo {
  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];

  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  public addItem():void {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}
